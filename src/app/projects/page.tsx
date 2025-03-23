import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { LinkText } from '@/components/LinkText'
import projectsData from '@/data/projects.json'

export default function ProjectsPage() {
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
          
          <h1 className="text-3xl font-semibold mb-12">Projects</h1>
          
          <div className="space-y-4">
            <h2 className="text-sm font-medium uppercase text-gray-400">{projectsData.title}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectsData.projects.map((project, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 flex-shrink-0">
                    <Image
                      src={project.logo}
                      alt={project.name}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <LinkText
                      variant="text-link"
                      text={project.name}
                      href={`https://${project.url}`}
                    />
                    <p className="text-base text-gray-600">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="hidden md:block md:col-span-1" />
      </div>
    </div>
  )
} 