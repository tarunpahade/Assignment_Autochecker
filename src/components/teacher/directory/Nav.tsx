'use client'
import Image from "next/image";
import React, { useState } from "react";

 const SideNav = () => {
  const [value,setValue] =useState('')
  return (
    <div className="hidden md:order-first h-screen md:flex md:flex-col">
      <aside className="flex-shrink-0 w-full bg-black sm:w-96 h-full overflow-scroll border-r border-gray-800">
        <div className="px-6 pt-6 pb-0 sticky top-0 bg-black z-20">
          <a href="/">
            <a>
              <div className="bg-dark-accent-1 hover:bg-dark-accent-2 transition-all rounded-2xl h-12 w-12 flex justify-center items-center">
                <div className="relative flex items-center group">
                  <svg
                    className="text-white"
                    data-testid="geist-icon"
                    fill="none"
                    height="24"
                    shape-rendering="geometricPrecision"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.5"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path d="M4 19.5A2.5 2.5 0 016.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"></path>
                  </svg>
                </div>
              </div>
            </a>
          </a>
          <p className="mt-8 text-2xl text-white font-bold">Directory</p>
          <p className="mt-2 text-sm text-dark-accent-5">
            Search directory of 2,154 developers
          </p>
          <form className="py-8 flex space-x-4" action="#">
            <div className="flex-1 min-w-0">
              <label className="sr-only">Search</label>
              <div className="relative shadow-sm border-0 border-b-dark-accent-2 rounded-none border-b-[1px] ">
                <div className="absolute bg-black inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-4 w-4 text-dark-accent-3 text-white"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    fill="none"
                    shape-rendering="geometricPrecision"
                  >
                    <path d="M11 17.25a6.25 6.25 0 110-12.5 6.25 6.25 0 010 12.5z"></path>
                    <path d="M16 16l4.5 4.5"></path>
                  </svg>
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="text-white placeholder:text-dark-accent-3 focus:ring-transparent border-none bg-black focus:border-transparent block w-full pl-10 sm:text-sm rounded-md"
                  placeholder="Search"
                  value={value}
                  onChange={(e)=>setValue(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
        <nav
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden"
          aria-label="Directory"
        >
          <div className="relative">
            <div className="bg-dark-accent-1 px-6 py-1 text-sm font-bold text-white uppercase">
              <h3>0</h3>
            </div>
            <ul role="list" className="relative z-0 directory-divide-y">
              <li>
                <a href="/0xflotus">
                  <a>
                    <div className="relative px-6 py-4 flex items-center space-x-3 focus-within:ring-0">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          alt="0xflotus"
                          src="/_next/image?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F26602940%3Fv%3D4&amp;w=640&amp;q=75"
                          width="300"
                          height="300"
                          decoding="async"
                          data-nimg="1"
                          className="undefined transition-all grayscale-0 blur-0 scale-100"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span
                          className="absolute inset-0"
                          aria-hidden="true"
                        ></span>
                        <div className="flex items-center space-x-1">
                          <p className="text-sm font-medium text-white truncate">
                            0xflotus
                          </p>
                          <svg
                            className="w-4 h-4 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor "
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <p className="text-sm text-dark-accent-5 truncate">
                          @0xflotus
                        </p>
                      </div>
                    </div>
                  </a>
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </aside>
    </div>
  );
};
export default SideNav