import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <article className="prose mx-auto max-w-2xl py-16">
      <h1>{post.title}</h1>
      <div className="text-sm text-gray-400">{post.date}</div>
      <div>{post.content}</div>
    </article>
  )
} 