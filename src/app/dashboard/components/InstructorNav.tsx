import Link from 'next/link'
import React from 'react'
import TeamSwitcher from './team-switcher'
import { cn } from '@/lib/utils'
import { Search } from './search'
import { UserNav } from './user-nav'

export function InstructorNav  ()  {
  return (
    <div className="border-b">
    <div className="flex h-16 items-center px-4">
      <TeamSwitcher />
      <nav
        className={cn("flex items-center space-x-4 lg:space-x-6")}

      >
        <Link
          href="/examples/dashboard"
          className="text-sm ml-4 font-medium transition-colors hover:text-primary"
        >
          Overview
        </Link>
        <Link
          href="/assignments"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Assignments
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Courses
        </Link>
        <Link
          href="/examples/dashboard"
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        >
          Settings
        </Link>
      </nav>
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <UserNav />
      </div>
    </div>
  </div>
  )
}
