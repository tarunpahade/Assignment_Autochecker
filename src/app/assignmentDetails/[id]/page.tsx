'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image'
import { useParams, usePathname, useSearchParams } from 'next/navigation';
import { ObjectId } from 'mongodb';
import Link from 'next/link';
import Loading from '@/components/miniComponents/mini';
import { NavForInstructor } from '@/components/teacher/nav/NavForInstructor';

interface AssignmentData {
    _id: string;
    name: string;
    description: string;
    dateUploaded: string;
    submissionDate: string;
    uploadedBy: string;
    forYear: string;
    uploadType: string;
    repoLink: string;
    markedAs: string;
    result: string;
  }
  


const Page = ({ params }: any) => {
    const _id = params.id
    const searchParams = useSearchParams()
 
    const search = searchParams!.get('data')
    const [userData] = useState(JSON.parse(search!))
    const [assignments, setAssignments] = useState({
        name: '',
        description: '',
        dateUploaded: '',
        image: ''
    })
    console.log(userData,'THIS OIS USER DATA');
    

    const [fileContent, setFileContent] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.post('/api/users/assignmentWithId', { id: _id }); // Replace with your API endpoint


                setAssignments(response.data.assignment);
                console.log(response.data);
               //   console.log(response.data.count, response);

                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id, userData]); // The empty array as the second argument ensures the effect runs only once after the initial render

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }

    return (
        <div className='flex-1'>
        
        <div className='px-16'>

            <ul role="list" className="w-full  divide-gray-100 ">

                <li key={Math.random()}>
                    <div className="block hover:bg-gray-50">
                        <div className="px-0 py-4 sm:px-0">
                            <div className="flex items-center justify-between">
                                <a className="truncate  font-medium text-2xl">{assignments.name}</a>


                            </div>

                        </div>
                    </div>
                </li >


                <div className=" mt-2 ">
                    <p>{assignments.description}</p>         </div>
                <div className="flex items-center text-sm text-gray-500">

                    Submission Date {assignments.dateUploaded}
                </div>
                <div className=' max-w-6xl py-6 block lg:flex h-[30%] overflow-auto'>

                    {assignments.image ? (
                        <div className='w-[55%] '><Image alt='Assignment Image' className='h-[300px]' src={assignments.image} width={490} height={300} />
                            <a href={assignments.image} target="_blank" className='underline w-full text-slate-600 pt-2 '>Open Image in new tab</a></div>
                    ) : null

                    }
                    {userData.markedAs === 'complete' ? (
                        <div className='w-full  lg:px-5'>

                            <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Feedback</h5>
                                <p className="font-normal text-gray-700 dark:text-gray-400">{userData.result}</p>
                                <Link href={{
                                pathname: `/playground`,
                                query: {
                                    data: JSON.stringify(userData)
                                }
                            }} className=" mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    View Code in Playground
                                    <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                    </svg>
                                </Link>
                            </div>


                        </div>

                    ) : (
                        <div >
                            {userData.uploadType ? (
                                <span className="inline-flex ml-5 mb-5 items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">{userData.uploadType}</span>
                            ) : null
                            }
                            {/* {userData.uploadType === 'Single Document' ? (
                                <div className=" mt-2">
                                    <input
                                        type="file"
                                        accept=".html"
                                        className=" relative w-[90%] cursor-default rounded-md  py-1.5 pl-3 pr-10 text-right text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                        onChange={handleFileChange}
                                    />


                                </div>

                            ) : null

                            } */}



                            <Link href={{
                                pathname: `/playground`,
                                query: {
                                    data: JSON.stringify(userData)
                                }
                            }}
                            >

                                <button className=" pb-8 mt-2 relative w-[70%] h-[10%] top-0 items-center bg-slate-800 text-white right-0  hover:text-black justify-center gap-x-3 text-sm sm:text-base  bg-white-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5" >

                                    <span>Submit Using CodeSpace</span>
                                </button>

                            </Link>           </div>

                    )

                    }


                </div>
            </ul>

        </div>
        </div>

    )
}

export default Page

