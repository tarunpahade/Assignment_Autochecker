'use client'
import { assignments } from '@/types/interface';
import { ExternalLink } from 'react-feather';
import { useSession } from 'next-auth/react';
import { redirect,useRouter } from 'next/navigation';
import Link from 'next/link';



export const AssignmentsList: React.FC<any> = ({ data, userType }) => {
    
    const { data: session } = useSession()
    

    return (
        <ul className='myComponent' role="list" >


            {data.map((person: assignments) => (
                <li key={Math.random()}>
                    <div className="block hover:bg-gray-50 ">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">

                                {userType === 'Student' ? (<> <div className='justify-between flex'>
                                    <a
                                        href='#'
                                        className="truncate text-sm font-medium text-indigo-600 mr-3">{person.name}</a>
                                    <ExternalLink className='mt-0.5' height={'14'} color='blue' onClick={() => { window.location.href = `${person.repoLink}` }} href={person.repoLink} />
                                </div>
                                    
                                        <div>
                                            <Link
                                             href={{ 
                                                pathname: `/assignmentDetails/${person._id}`, 
                                                query: {
                                                    data:JSON.stringify(person)
                                                } 
                                                }}                                                  
                                                className={`mr-5 lg:text-[12px] text-[12px] text-white bg-black px-3 py-2 rounded-md mt-2 ml-4 `}
                                                style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                View Details
                                            </Link>
                                        </div>

                                </>

                                ) : (
                                    <a
                                        href={userType === 'teacher' ? (`assignment/${person._id}`) : '#'}
                                        className="truncate text-sm font-medium text-indigo-600">{person.name}  </a>


                                )

                                }


                            </div>

                            <div className="mt-2 flex justify-between">
                                <div className="sm:flex">
                                    <div className="mr-6 w-96  truncate flex items-center text-sm text-gray-500">

                                        {person.description}
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                {person.uploadType ? (
                                <span className="inline-flex ml-5 items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{person.uploadType}</span>
                                ) : null

                                }
                                    Submission Date {person.submissionDate}
                                </div>
                            </div>
                        </div>
                    </div>
                </li>


            ))}


        </ul>

    )
}
