'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image'

const Page = ({ params }: any) => {

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
    console.log(students, 'this is stewie');
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('starting to featch');

                const response = await axios.post('/api/users/assignmentWithId', { id: _id }); // Replace with your API endpoint
                console.log(response, 'this is response');

                setAssignments(response.data.assignment);
                console.log(response.data.count, response);
                if (typeof response.data.studentsWhoHaveCompleted === 'object') {
                    console.log('this is a object');

                    setstudents([response.data.studentsWhoHaveCompleted])

                }
                setstudents(response.data.studentsWhoHaveCompleted)
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id]); // The empty array as the second argument ensures the effect runs only once after the initial render

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }

    const viewResult = (result2: string) => {
        localStorage.setItem('result', result2!);
        router.push('/result')
    }

    return (
        <ul role="list" className="w-full  divide-gray-100">


            <li key={Math.random()}>
                <a href="#" className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                            <a href={assignments.repoLink} className="truncate text-sm font-medium text-indigo-600">{assignments.name}</a>


                        </div>
                        <div className="mt-2 flex justify-between">
                            <div className="sm:flex">
                                <div className="mr-6 flex items-center text-sm text-gray-500">

                                    Day Uploaded   {assignments.dueDate}
                                </div>
                            </div>
                            <div className="flex items-center text-sm text-gray-500">

                                Submission Date {assignments.dateUploaded}
                            </div>
                        </div>
                    </div>
                </a>
            </li>


            <div className="px-4 py-4 sm:px-6 mt-2 ">
                <p>{assignments.description}</p> <a className='text-blue-500 underline' href={assignments.repoLink}> Click Here  to visit submitted  Repository</a>

            </div>
            <div className='mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 h-[30%] overflow-auto'>
                <Image alt='Assignment Image' className='w-[30%]  mx-[10%]' src={assignments.image} width={300} height={300} />


            </div>
            {students ? (
                <>
                    <h1 className='mt-8 pl-3 text-black-900 text-2xl'>Subbmitted By</h1>
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

                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log('View Result');
                                                    // Handle the "View Result" action here.
                                                    viewResult('Featch result for Email ' + students.email + ' for assignment  ' + students.email +  students.result)
                                                }}
                                                className={`mr-5 lg:text-[12px] text-[12px] text-white bg-black px-3 py-2 rounded-md mt-2 ml-4 `}
                                                style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                View Result
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>

                    ))

                    }
                </>

            ) : null

            }



        </ul>



    )
}
export default Page