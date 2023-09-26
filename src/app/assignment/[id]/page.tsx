'use client'
import React, { useEffect, useState } from 'react'
import { redirect, useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image'
import { assignments as MyAssignments } from '@/types/interface';
import GPTresponse from '@/components/aiResponse';
import { text } from 'stream/consumers';
import Link from 'next/link';
import Loading from '@/components/miniComponents/mini';



const Page = ({ params }: any) => {
    const router = useRouter();
    const _id = params.id
    

    const [assignments, setAssignments] = useState(
        {
            name: "Create a Html Form For a Travel Website",
            description: "A HTML form using html,css In Vscode editor.",
            image: "https://www.formsite.com/wp-content/uploads/2023/05/travel-preference@2x.jpg",
            dueDate: "7 August",
            dateUploaded: "19 August",
            _id: '123456',
            repoLink: 'https://github.com/DITMS/Create-a-html-form-in-DITMS'
        }
    )
    const [students, setstudents]: any[] = useState([])

    const [gpt, setGpt] = useState(false);
    const [response, setResponse] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.post('/api/users/assignmentWithId', { id: _id }); // Replace with your API endpoint


                setAssignments(response.data.assignment);
                console.log(response.data.count, response);
                if (typeof response.data.studentsWhoHaveCompleted === 'object') {


                    setstudents([response.data.studentsWhoHaveCompleted])

                }
               const dataAddedMarkedAs= response.data.studentsWhoHaveCompleted.map((student: any) => ({
                    ...student,
                    markedAs: "complete" ,
                    name:assignments.name,
                    description:assignments.description
                  }));
                setstudents(dataAddedMarkedAs)
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id, assignments.description, assignments.name]); // The empty array as the second argument ensures the effect runs only once after the initial render

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }

    
    const goBack = () => {
        setGpt(false)
    }
    return (
        <div className='px-4  py-6 sm:px-8 lg:px-20  items-center pl-16'>
                <ul role="list" className="w-full  divide-gray-100">

                    <li key={Math.random()}>
                        <div className=" flex">
                            <div className="px-4 py-4 sm:px-6">
                                <h1 className="text-3xl pl-5 font-bold tracking-tight  text-gray-900">{assignments.name}</h1>

                                <div className="px-4 py-4 sm:px-6 mt-2 ">
                                    <p className='w-[90%]'>{assignments.description}</p>
                                    <div className="mr-6 flex items-center text-sm text-gray-500">




                                        Submission Date {assignments.dateUploaded}

                                    </div>

                                </div>


                            </div>

                            {assignments.image ? (
                                <Image alt='Assignment Image' className='w-[30%]  mx-[10%]' src={assignments.image} width={300} height={300} />

                            ) : null

                            }


                        </div>
                    </li >



                    {
                        students ? (
                            <div className='px-4 py-4 sm:px-6'>
                                <h1 className='mt-8 pl-3 text-black-900 font-bold text-xl  '>Subbmitted By</h1>
                                {students.map((students: any) => (



                                    <li key={Math.random()}>

                                        <a href="#" className="block hover:bg-gray-50">
                                            <div className="px-4 py-4 sm:px-6">
                                                <div className="flex items-center justify-between">
                                                    <a href={students.repoLink} className="truncate text-sm font-medium text-indigo-600">{students.email}</a>

                                                </div>
                                                <div className="mt-2 flex justify-between">
                                                    <div className="sm:flex">
                                                        <div className="mr-6 flex items-center text-sm text-gray-500">

                                                            Day Uploaded   {students.date}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center text-sm text-gray-500">

                                                        <Link   href={{
                                                            pathname: `/playground`,
                                                            query: {
                                                                data: JSON.stringify(students)
                                                            }
                                                        }}
                                                            className={`mr-5 lg:text-[12px] text-[12px] text-white bg-black px-3 py-2 rounded-md mt-2 ml-4 `}
                                                            style={{
                                                                backgroundColor: 'black',
                                                                color: 'white',
                                                                cursor: 'pointer',
                                                            }}
                                                        >
                                                            View Result
                                                        </Link>

                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </li>

                                ))

                                }
                            </div>

                        ) : <text>No One Submitted Assignment Yet</text>

                    }
                </ul>

            
        </div>

    )
}

// pages/assignment/[id]/page.tsx
export default Page

