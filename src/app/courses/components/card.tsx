import React from 'react'
import { School } from 'lucide-react'
export const Card = ({ semester, onClick }: any) => {
    return (
        <div onClick={() => { onClick(semester) }} className=" w-[220px] flex items-center justify-center rounded-lg border border-stone-200 pb-10 shadow-md transition-all hover:shadow-xl dark:border-stone-700 dark:hover:border-white">
            <div

                className="flex flex-col overflow-hidden rounded-lg"
            >
                <div className="relative h-44 overflow-hidden">


                    <School className="h-full object-cover ml-5" width={100}
                        height={200} />

                </div>
                <div className="border-t border-stone-200 p-4 dark:border-stone-700">
                    <h3 className="my-0 truncate font-cal text-xl font-bold tracking-wide dark:text-white">
                    
                        {semester.subject}
                    </h3>
                    <p className="mt-2 line-clamp-1 text-sm font-normal leading-snug text-stone-500 dark:text-stone-400">
                    {semester.name}
                    </p>
                </div>
            </div>
        </div>
    )
}
