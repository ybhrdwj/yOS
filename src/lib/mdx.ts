import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { cache } from 'react'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

type Post = {
  slug: string
  title: string
  date: string
  category: string
  content: string
  description?: string
}

function parseDateString(dateStr: string): Date {
  const [day, month, year] = dateStr.split('.')
  // Convert YY to YYYY
  const fullYear = parseInt(year) < 50 ? `20${year}` : `19${year}`
  return new Date(`${fullYear}-${month}-${day}`)
}

// Use React.cache to deduplicate getPostBySlug calls within a single request
// This prevents duplicate reads when both generateMetadata and page component
// call getPostBySlug with the same slug
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      category: data.category || 'Uncategorized',
      description: data.description || data.title,
      content: content // Return raw markdown content for now
    }
  } catch {
    return null
  }
})

// Cache getAllPosts to prevent duplicate directory reads
export const getAllPosts = cache(async (): Promise<Post[]> => {
  const slugs = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))

  const postsPromises = slugs.map(slug => getPostBySlug(slug))
  const postsWithNull = await Promise.all(postsPromises)

  // Filter out null values and sort by date (newest first)
  const posts = postsWithNull
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => {
      const date1 = parseDateString(post1.date)
      const date2 = parseDateString(post2.date)
      return date2.getTime() - date1.getTime()
    })

  return posts
}) 