"use client"
import React, { useState } from 'react'

const Setup = () => {
    const [state, setstate] = useState('')
    return (
        <main>

            <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 mt-16">
               
                    <form action="" className='px-14 space-y-12  w-full h-full items-center justify-center columns-1'>
                        
                    <h1 className={`text-2xl font-bold tracking-tight   `}>
                        Assignments
                    </h1>
                    <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900 ">
                               Go to this link to get personal access token <a href="https://github.com/settings/tokens" className='text-blue-600 underline'>here</a>
                            </label>
                        <div className="col-span-full">
                            <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                Enter Personal access Token
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm sm:max-w-md">
                                    <input required
                                        value={state}
                                        onChange={(e) => setstate(e.target.value)}
                                        type="text"
                                        name="Personal access Token"
                                        placeholder='Personal access Token'
                                        className="block flex-1 bg-transparent py-1.5 pl-1 text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>


                        <button type='submit' className="pointer-events-auto w-[250px] rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500">Add Assignment
                        </button>
                    </form>
                </div>
            
        </main>
    )
}
export default Setup