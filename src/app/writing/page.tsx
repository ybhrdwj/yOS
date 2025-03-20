import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { getAllPosts } from '@/lib/mdx'

export default async function WritingPage() {
  const posts = await getAllPosts()
  
  return (
    <div className="mx-auto w-full max-w-[1084px]">
      <div className="md:grid md:grid-cols-12 md:gap-5">
        <div className="hidden md:block md:col-span-1" />
        
        <div className="col-span-10 px-4 md:px-0 py-12">
          <div className="mb-6">
            <Link 
              href="/" 
              className="text-sm text-gray-400 hover:text-gray-600 flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              Home
            </Link>
          </div>
          
          <h1 className="text-3xl font-semibold mb-12">Writing</h1>
          
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.slug} className="group">
                <div className="grid grid-cols-[80px_1fr] sm:grid-cols-[100px_1fr_auto] items-baseline gap-2">
                  <span className="text-sm text-gray-400">{post.date}</span>
                  <div className="min-w-0">
                    <Link 
                      href={`/writing/${post.slug}`}
                      className="inline-block"
                    >
                      <span className="border-b border-gray-200 text-base text-gray-600 group-hover:text-gray-900 group-hover:border-gray-400">
                        {post.title}
                      </span>
                    </Link>
                  </div>
                  {post.category && (
                    <span className="hidden sm:block text-sm text-gray-400 text-right">{post.category}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:block md:col-span-1" />
      </div>
    </div>
  )
} 