import Link from 'next/link'
import blogData from '@/data/blog.json'

export function Blog() {
  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium uppercase text-gray-400">{blogData.title}</h2>
      
      <div className="space-y-4">
        {blogData.posts.map((post, index) => (
          <div key={index} className="group">
            <Link 
              href={`/writing/${post.slug}`}
              className="grid grid-cols-[80px_1fr] items-baseline"
            >
              <span className="text-sm text-gray-400">{post.date}</span>
              <div>
                <span className="inline border-b border-gray-200 text-base text-gray-600 group-hover:text-gray-900">
                  {post.title}
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
} 