import Link from 'next/link'
import React from 'react'
import TeamSwitcher from './team-switcher'
import { cn } from '@/lib/utils'
import { Input } from "@/components/ui/input"

import { UserNav } from './User-nav'

export function NavForInstructor  ()  {
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
    
      </nav>
      <div className="ml-auto flex items-center space-x-4">
      <div>
      <Input
        type="search"
        placeholder="Search..."
        className="md:w-[100px] lg:w-[300px]"
      />
    </div>
        <UserNav />
      </div>
    </div>
  </div>
  )
}
