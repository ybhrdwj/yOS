import Link from 'next/link'
import { Clock } from './Clock'
import { Weather } from './Weather'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-50/75 backdrop-blur dark:border-gray-800 dark:bg-gray-900/75">
      <div className="mx-auto grid h-[42px] w-[1084px] grid-cols-12 gap-5">
        {/* One column gap at start */}
        <div className="col-span-1" />
        
        {/* Content spanning 10 columns */}
        <div className="col-span-10 flex items-center justify-between">
          {/* Name */}
          <Link href="/" className="text-sm text-gray-900 dark:text-gray-100">
            Yash Bhardwaj
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <div className="hidden items-center gap-6 md:flex">
              <Link href="/writing" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                writing
              </Link>
              <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                projects
              </Link>
              <Link href="/api" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                api
              </Link>
            </div>

            {/* Divider */}
            <span className="text-gray-300 dark:text-gray-700">|</span>

            {/* Time and Weather */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-500">
              <Clock />
              <Weather />
            </div>
          </nav>
        </div>

        {/* One column gap at end */}
        <div className="col-span-1" />
      </div>
    </header>
  )
} 