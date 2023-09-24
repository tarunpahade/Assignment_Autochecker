'use client'
import Image from "next/image";
import React, { useState } from 'react'
import { Fragment } from 'react'
import { Disclosure, Menu } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useTheme } from "next-themes";
import { Sun, Moon, Search, User } from "react-feather";
import { signOut, useSession } from "next-auth/react";
import { redirect,useRouter } from "next/navigation";
import axios from "axios";



const Navbar = () => {
    const { theme, setTheme } = useTheme();
    const [currentNavItem, setCurrentNavItem] = useState('Dashboard');
    const { data: session } = useSession()
const router=useRouter()
    const user = {
        name: session?.user.name,
        email: session?.user.email,
        imageUrl: session?.user.image

    }
    const userNavigation = [
        { name: 'Your Profile', href: '/profile', onClick: () => { redirect('/profile') } },
        { name: 'Settings', href: '#' },
        {
            name: 'Sign out', href: '#', onClick:  async () => {
                    try {
                     console.log('Starting to logout');
                     await axios.get('/api/users/logout')
                  
     signOut(); 
                router.push('/login')
                        
                      // Handle the response as needed, e.g., redirect to the login page.
                    } catch (error) {
                      console.error('Logout failed:', error);
                    }
                  }}
            
        
    ]
    const navigation = [
        { name: 'Dashboard', href: '#', current: currentNavItem === 'Dashboard' },
        // { name: 'Team', href: '#', current: currentNavItem === 'Team' },
        // { name: 'Projects', href: '#', current: currentNavItem === 'Projects' },
        // { name: 'Jobs', href: '#', current: currentNavItem === 'Jobs' },
        // { name: 'Reports', href: '#', current: currentNavItem === 'Reports' },
    ];
    
    const Logout = () => {
        
    };
    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };
    const handleNavigationClick = (itemName: string) => {
        console.log(itemName);

        setCurrentNavItem(itemName);
    };

    return (
        <>
            <Disclosure as="nav" className={`${theme === 'dark' ? 'dark:bg-slate-900' : 'bg-white'
                }`}>
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        {/* <Image
                height={8}
                width={8}
                  className="h-8 w-8"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"

                  alt="Your Company"
                /> */}
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        handleNavigationClick(item.name)
                                                    }}
                                                    key={item.name}
                                                    // href={item.href}
                                                    className={`${item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : theme === 'dark'
                                                            ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                                            : 'text-gray-700 hover:bg-gray-200 hover:text-black'
                                                        } rounded-md px-3 py-2 text-sm font-medium`}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">


                                        <button
                                            onClick={toggleTheme}
                                            className="hover:text-gray-300 bg focus:outline-none  px-5 py-2 dark:border-gray-700  rounded-lg hover:bg-gray-700 duration-300 transition-colors border"
                                        >
                                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                                        </button>


                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                  {user.imageUrl ? (
                                                    <Image
                                                        height={8}
                                                        width={8} className="h-8 w-8 rounded-full" src={user.imageUrl!} alt="" />
                                                  ) :(
                                                  <User height={28} width={28} color="#fff" />

                                                  )

                                                  }
                                                  
                                                  
                                                    
                                                </Menu.Button>
                                            </div>

                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                onClick={item.onClick}
                                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"

                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>

                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">


                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleNavigationClick(item.name)
                                        }}
                                        className={`${item.current
                                            ? 'bg-gray-900 text-white'
                                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                            } block rounded-md px-3 py-2 text-base font-medium`}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">

                                        <button
                                            onClick={toggleTheme}
                                            className="text-white hover:text-gray-300 bg focus:outline-none bg-white px-5 py-2 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border"
                                        >
                                            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
                                        </button>
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                    </div>
                                    <button
                                        type="button"
                                        className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>

                                </div>
                                <div className="mt-3 space-y-1 px-2">
                                    {userNavigation.map((item) => (
                                        <Disclosure.Button
                                            key={item.name}
                                            as="a"
                                            href={item.href}
                                            className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                        >
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <header className={`bg-${theme === 'dark' ? 'slate-900' : 'white'} shadow`}>
                <div className="mx-auto max-w-7xl px-4 pl-10 py-6 sm:px-6 lg:px-8">
                    <h1 className={`text-3xl font-bold tracking-tight pl-8 text-${theme === 'dark' ? 'white' : 'gray-900'}`}>
                        {/* {currentNavItem ? currentNavItem.name : 'Default Header'} */}
                        {/* {navigation.find((item) => item.current)?.name || 'Header'} */}
                        {currentNavItem}
                    </h1>
                </div>
            </header>
        </>
    )
}
export default Navbar