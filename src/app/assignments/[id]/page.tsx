'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image'
import Link from 'next/link';
import Loading from '@/components/miniComponents/mini';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';



export default function Page({ params }: any) {
    const _id = params.id
    const [assignments, setAssignments]: any = useState(
        {
            dateUploaded: "2024-01-12",
            department: "CSE",
            description: "this is the description of the assignment ",
            name: "Hii This is My First Assignment",
            submissionDate: "2024-01-20",
            uploadType: "Pdf",
            uploadedBy: "TEST TEACHER",
            _id: "65a0d76eb77791c929e94f52",
            image: ''
        }
    )
    const [students, setstudents]: any[] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/users/assignmentWithId', { id: _id });
                setAssignments(response.data.assignment);
                console.log(response.data.count, response);
                if (response.data.studentsWhoHaveCompleted === null) {
                    setstudents(null)
                }
                else {
                    console.log('array of student');

                    const dataAddedMarkedAs = response.data.studentsWhoHaveCompleted.map((student: any) => ({
                        ...student,
                        markedAs: "complete",
                        name: student.name,
                        description: assignments.description
                    }));
                    setstudents(dataAddedMarkedAs)
                }
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id, assignments.description, assignments.name]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }


    return (
        <div className='container mx-auto p-4 bg-white rounded-lg border border-black'>
            <div className='bg-white rounded-t-lg px-6 py-4'>
                <h1 className='text-3xl font-bold text-gray-900'>{assignments.name}</h1>
            </div>
            <div className='px-6 py-4'>
                <p className='text-gray-700'>{assignments.description}</p>
                <span className='text-sm text-gray-500'>Submission Date: {assignments.dateUploaded}</span>
            </div>
            {assignments.image && (
                <div className='flex justify-center p-4'>
                    <Image alt='Assignment Image' className='rounded-md' src={assignments.image} height={300} width={450} />
                </div>
            )}
            {assignments.uploadType === 'Pdf' ? (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Upload Pdf</Label>
                    <Input id="picture" type="file" />
                </div>

            ) : (
                <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="picture">Upload Button</Label>
                    <Input id="picture" type="file" />
                </div>
            )}


            <ul role='list' className='divide-y divide-gray-200'>
                {students ? (
                    students.map((student: { _id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | React.PromiseLikeOfReactNode | null | undefined; }) => (
                        <li key={student._id} className='px-6 py-4 hover:bg-gray-50'>
                            <div className='flex items-center justify-between'>
                                <span className='text-sm font-medium text-indigo-600 truncate'>{student.name}</span>
                                <Link href={{
                                    pathname: `/playground`,
                                    query: { data: JSON.stringify({ ...assignments, ...student }) },
                                }}>
                                    <a className='text-white bg-black px-3 py-2 rounded-md text-sm font-medium hover:bg-opacity-80'>
                                        View Result
                                    </a>
                                </Link>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className='text-sm text-gray-500 p-6'>No one has submitted the assignment yet.</p>
                )}
            </ul>
        </div>
    );
}

// pages/assignment/[id]/page.tsx


