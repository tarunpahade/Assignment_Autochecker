'use client'
import Image from "next/image";


interface ListProps {
    data: any;
    onPress: any;

}
export const List: React.FC<ListProps> = ({ data, onPress }) => {
    return (
        <ul role="list" className="w-full  divide-gray-100">

            {data.map((person: any) => (
                <li
                    key={Math.random() * 50000}
                    className="flex pl-4  justify-between pr-5 gap-x-6 py-5  dark:hover:bg-slate-50 hover:bg-slate-100   transition duration-200 ease-in-out"
                    onClick={() => { onPress(person) }}
                >
                    <div className="flex min-w-0 gap-x-4 ">
                        <Image
                            className="h-12 w-12 flex-none rounded-full bg-gray-50"
                            width={12}
                            height={12}
                            src={person.imageUrl}
                            alt=""
                        />
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm cursor-pointer font-semibold leading-6  ">
                                {person.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {person.email}
                            </p>
                        </div>
                    </div>
                    {/* <div className=" flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900"></p>
                        {person.assignmentStatus ? (
                            
                            <div className="mt-1 flex items-center gap-x-1.5 md:hidden">
                                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                </div>
                                <p className="text-xs leading-5 text-gray-500">Complete</p>
                            </div>
                        ) : (
                            
                            <p className="mt-1 text-xs leading-5  text-gray-500">
                                Incomplete
                            </p>
                        )}
                    </div> */}
                     <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm leading-6 text-gray-900"></p>
            {person.assignmentStatus ? (
               <div className="mt-1 flex items-center gap-x-1.5">
               <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                 <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
               </div>
               <p className="text-xs leading-5 text-gray-500">Complete</p>
             </div>
            ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
                </div>
                <p className="text-xs leading-5 text-gray-500">In-Complete</p>
              </div>
            )}
          </div>
                </li>
            ))}
            

        </ul>
    );
};
