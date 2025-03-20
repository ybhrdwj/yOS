import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

const postsDirectory = path.join(process.cwd(), 'src/content/posts')

type Post = {
  slug: string
  title: string
  date: string
  category: string
  content: string
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      category: data.category || 'Uncategorized', // Default category if not specified
      content: await MDXRemote({
        source: content,
        components: {},
      })
    }
  } catch {
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace(/\.mdx$/, ''))
  
  const postsPromises = slugs.map(slug => getPostBySlug(slug))
  const postsWithNull = await Promise.all(postsPromises)
  
  // Filter out null values and sort by date (newest first)
  const posts = postsWithNull
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => new Date(post2.date).getTime() - new Date(post1.date).getTime())
  
  return posts
} 