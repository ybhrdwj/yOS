import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { getPostBySlug } from '@/lib/mdx'
import { formatDate } from '@/lib/formatDate'
import { Metadata } from 'next'

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    return {
      title: 'Post Not Found | Yash Bhardwaj',
      description: 'The requested post could not be found.',
    }
  }

  const ogUrl = `/api/og?slug=${params.slug}&title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}&date=${encodeURIComponent(post.date)}`

  return {
    title: `${post.title} | Yash Bhardwaj`,
    description: post.description || post.title,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description || post.title,
      url: `https://yashbhardwaj.com/writing/${params.slug}`,
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
      siteName: 'Yash Bhardwaj',
      publishedTime: post.date,
      authors: ['Yash Bhardwaj'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description || post.title,
      creator: '@ybhrdwj',
      images: [
        {
          url: ogUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ],
    },
  }
}

export default async function Post({ params }: Props) {
  const post = await getPostBySlug(params.slug)
  
  if (!post) {
    notFound()
  }

  return (
    <div className="relative w-full max-w-full overflow-x-hidden">
      <div className="mx-auto w-full max-w-[1084px] px-4 sm:px-6 pt-6 sm:pt-[54px]">
        {/* Navigation and Date */}
        <div className="w-full pb-8 sm:pb-[96px]">
          <div className="flex justify-between items-center max-w-2xl mx-auto">
            <Link 
              href="/" 
              className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
            >
              <ChevronLeft className="h-4 w-4" />
              Writing
            </Link>
            <time className="text-sm text-gray-400">
              {formatDate(post.date)}
            </time>
          </div>
        </div>

        {/* Article Content */}
        <article className="mx-auto w-full max-w-2xl pb-16 sm:pb-32">
          {/* Category */}
          <div className="mb-1 text-sm text-gray-400">
            {post.category}
          </div>

          {/* Title */}
          <h1 className="mb-3 text-[28px] font-semibold tracking-[-0.02em] text-gray-900">
            {post.title}
          </h1>

          {/* Author and Share */}
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/logos/yb.jpg"
                alt="Yash Bhardwaj"
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-gray-600">by Yash Bhardwaj</span>
            </div>
            <a 
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `Just finished reading — ${post.title} by @ybhrdwj\n\nhttps://yashbhardwaj.com/writing/${params.slug}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-1 text-sm text-gray-400 hover:border-gray-400 hover:text-gray-600"
            >
              <Image 
                src="/x.svg" 
                alt="Share on X (Twitter)" 
                width={14} 
                height={14}
                className="opacity-60 group-hover:opacity-100"
              />
              Share
            </a>
          </div>

          {/* Divider */}
          <div className="mb-8 h-px w-full bg-gray-200" />

          {/* Content */}
          <div className="prose prose-gray w-full overflow-x-auto space-y-6 text-gray-600
            prose-p:text-[16px] prose-p:leading-[28px]
            prose-headings:text-gray-900
            prose-ol:pl-0 prose-ol:my-6 prose-ol:list-decimal
            prose-ol:text-[16px] prose-ol:leading-[28px]
            [&_ol]:list-decimal 
            [&_ol>li]:pl-2 [&_ol>li]:ml-4 [&_ol>li]:mb-2
            [&_ol>li::marker]:text-gray-600
            prose-strong:font-medium prose-strong:text-gray-900
            prose-pre:overflow-x-auto prose-pre:max-w-full
            prose-img:max-w-full
            prose-table:overflow-x-auto prose-table:max-w-full
            prose-code:break-words"
          >
            {post.content}
          </div>
        </article>
      </div>
    </div>
  )
} 