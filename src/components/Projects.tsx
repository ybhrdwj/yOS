import Image from 'next/image'
import { LinkText } from './LinkText'
import projectsData from '@/data/projects.json'

interface ProjectsProps {
  showAll?: boolean;
}

export function Projects({ showAll = false }: ProjectsProps) {
  const displayProjects = showAll ? projectsData.projects : projectsData.projects.slice(0, 4);

  return (
    <div className="space-y-4">
      <h2 className="text-sm font-medium uppercase text-gray-400">{projectsData.title}</h2>
      
      <div className="space-y-6">
        {displayProjects.map((project, index) => (
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
  )
} 