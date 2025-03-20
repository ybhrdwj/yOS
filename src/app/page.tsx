import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'
import { Blog } from '@/components/Blog'

export default async function Home() {
  return (
    <main>
      <Hero />
      
      {/* Content Grid */}
      <div className="mx-auto w-full max-w-[1084px] px-4 md:px-0">
        {/* Mobile layout - stacked */}
        <div className="flex flex-col gap-12 md:hidden">
          <Projects />
          <Blog />
        </div>
        
        {/* Desktop layout - side by side */}
        <div className="hidden md:grid md:grid-cols-12 md:gap-5">
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
      </div>
    </main>
  )
}
