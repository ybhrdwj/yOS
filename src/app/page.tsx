import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Blog } from '@/components/Blog'

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Content Grid */}
      <div className="mx-auto grid w-[1084px] grid-cols-12 gap-5">
        <div className="col-span-1" />
        
        {/* Projects - 7 columns */}
        <div className="col-span-7">
          <Projects />
        </div>

        {/* Blog section - 3 columns but shifted more left */}
        <div className="col-span-3 -ml-28">
          <Blog />
        </div>

        <div className="col-span-1" />
      </div>
    </main>
  )
}
