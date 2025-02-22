import { Hero } from '@/components/Hero'
import { Projects } from '@/components/Projects'

export default function Home() {
  return (
    <main>
      <Hero />
      
      {/* Content Grid */}
      <div className="mx-auto grid w-[1084px] grid-cols-12 gap-5">
        {/* One column gap at start */}
        <div className="col-span-1" />
        
        {/* Projects - 7 columns */}
        <div className="col-span-7">
          <Projects />
        </div>

        {/* Blog section - 3 columns */}
        <div className="col-span-3">
          {/* Blog component will go here */}
        </div>

        {/* One column gap at end */}
        <div className="col-span-1" />
      </div>
    </main>
  )
}
