'use client'
import { BookAIcon, Code, LogOutIcon, MoreVertical, User, UserCircle } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Badge } from '../ui/badge'

const getCookie = (name: string): string | null => {
   const cookieArray = document.cookie.split(';');
   for (let cookiePair of cookieArray) {
     let [key, value] = cookiePair.trim().split('=');
     if (key === name) {
       return decodeURIComponent(value);
     }
   }
   return null;
 };
 
 
export default function Sidebar({ currentPath }: any) {
   const {data: session}=useSession()
   const [userType,setUserType] =useState('Student')

   useEffect(() => {
      const cookieValue = getCookie('userType');
      if (cookieValue) {
         setUserType(cookieValue);
      }
    }, []);
  

   const student:any=[
     {
       name: 'Courses',
       svg: () => {
          return (
             <BookAIcon height={14} width={14} />
          )
       },
       href: 'courses',
    },
    {
       name: 'Programming',
       svg: () => {
          return (
             <Code height={14} width={14} />
          )
       },
       href: 'programming',
    },
    {
       name: 'Profile',
       svg: () => {
          return (
             <User height={14} width={14} />
          )
       },
       href: 'profile'
    }
   ]
   const teacher:any=[
    {
       name: 'Attendance',
       svg: () => {
          return (
             <User height={14} width={14} />
          )
       },
       href: 'attendance'
    },
    {
      name: 'Assignments',
      svg: () => {
         return (
            <Code height={14} width={14} />
         )
      },
      href: 'assignments',
   }, {
      name: 'Analytics',
      svg: () => {
         return (
            <BookAIcon height={14} width={14} />
         )
      },
      href: 'reports',
   }
]
   const admin:any=[
     {
       name: 'Classes',
       svg: () => {
          return (
             <BookAIcon height={14} width={14} />
          )
       },
       href: 'classes',
    },
    {
       name: 'Attendance',
       svg: () => {
          return (
             <User height={14} width={14} />
          )
       },
       href: 'attendance'
    },
    {
       name: 'Analytics',
       svg: () => {
          return (
             <Code height={14} width={14} />
          )
       },
       href: 'analytics',  
    }
   ]
 
   let navbar;
   if (userType === 'Student') {
     navbar = student;
   } else if (userType === 'Teacher') {
     navbar = teacher;
   } else if (userType === 'Admin') {
     navbar = admin;
   }
  
   const handleLogout = () => {
      document.cookie = "user-details=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      signOut({ callbackUrl: '/login' });
   }

   return (
      <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
         
         <div className="h-full pt-5 px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800  border-gray-300 border-r ">
         <Badge className='my-5' variant={'outline'}>{userType}</Badge>
            <ul className="space-y-2 font-medium">

               {navbar.map((item: any, index: React.Key | null | undefined) => (
                  <li key={index}>
                     <a
                        href={item.href}
                        className={`flex items-center  p-2 rounded-sm text-sm dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${currentPath === `${item.href.toLowerCase()}` ? 'bg-black text-white hover:bg-slate-600' : ''
                           }`}
                     >
                        {item.svg()}
                        <span className="ml-3">{item.name}</span>
                     </a>
                  </li>
               ))}
               <li className="py-3 sm:py-4 absolute bottom-0  w-[90%] border-t-2 border-opacity-5 border-black">
                  <div className="flex items-center space-x-4">
                     <div className="flex-shrink-0">
                        <UserCircle className="w-8 h-8 rounded-full" height={32} width={32} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-[12px] font-medium  text-md text-gray-900 truncate dark:text-white">
                           {session?.user.name}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate dark:text-gray-400">
                           {/* {session?.user.userType} */}

                        </p>
                     </div>
                     <div className="ml-16 flex ">
                        <Popover>

                           <PopoverTrigger>
                              <MoreVertical width={18} />

                           </PopoverTrigger>
                           <PopoverContent className='w-full  hover:bg-red-400'>
                              <div className=' flex h-[90%] ' onClick={handleLogout}>
                                 <p className='pr-5'>
                                    Logout
                                 </p>

                                 <LogOutIcon width={13} opacity={0.5} />
                              </div>
                           </PopoverContent>
                        </Popover>

                     </div>
                  </div>
               </li>
            </ul>
         </div>

      </aside>
      

   )
}
