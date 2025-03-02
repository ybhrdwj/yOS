'use client'

import Link from 'next/link'
import { Clock } from './Clock'
import { Weather } from './Weather'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-gray-50/75 backdrop-blur dark:border-gray-800 dark:bg-gray-900/75">
      {/* Main header container */}
      <div className="mx-auto w-full max-w-[1084px]">
        <div className="md:grid md:grid-cols-12 md:gap-5">
          {/* One column gap at start - desktop only */}
          <div className="hidden md:block md:col-span-1" />
          
          {/* Main content area - properly aligned with content below */}
          <div className="col-span-10 flex h-[42px] items-center justify-between px-4 md:px-0">
            {/* Left side: Name */}
            <Link href="/" className="text-sm text-gray-900 dark:text-gray-100">
              Yash Bhardwaj
            </Link>

            {/* Right side: Navigation, Weather, and Menu */}
            <div className="flex items-center">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-6 mr-6">
                <Link href="/writing" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  writing
                </Link>
                <Link href="/projects" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  projects
                </Link>
                <Link href="/api" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                  api
                </Link>
              </nav>

              {/* Divider - Only on desktop */}
              <span className="hidden md:block mr-6 text-gray-300 dark:text-gray-700">|</span>

              {/* Weather and Time - Always visible */}
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-500">
                <Clock />
                <Weather />
              </div>

              {/* Mobile Menu Button - After weather */}
              <button 
                className="ml-4 md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* One column gap at end - desktop only */}
          <div className="hidden md:block md:col-span-1" />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="mx-auto w-full max-w-[1084px]">
            <div className="md:grid md:grid-cols-12 md:gap-5">
              <div className="hidden md:block md:col-span-1" />
              <nav className="col-span-10 px-4 py-4 flex flex-col space-y-4">
                <Link 
                  href="/writing" 
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  writing
                </Link>
                <Link 
                  href="/projects" 
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  projects
                </Link>
                <Link 
                  href="/api" 
                  className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  api
                </Link>
              </nav>
              <div className="hidden md:block md:col-span-1" />
            </div>
          </div>
        </div>
      )}
    </header>
  )
} 