'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Image from 'next/image'
import Loading from '@/components/miniComponents/mini';
import { Input } from '@/components/ui/input';
import { getCookies } from '@/lib/utils';
import { Button } from '@/components/ui/button';


export default function Page({ params }: any) {
    const _id = params.id
    const [assignments, setAssignments]: any = useState(
        {
            dateUploaded: "2024-01-12",
            department: "CSE",
            description: "this is the description of the assignment",
            name: "Hii This is My First Assignment",
            submissionDate: "2024-01-20",
            uploadType: "Pdf",
            uploadedBy: "TEST TEACHER",
            _id: "65a0d76eb77791c929e94f52",
            image: ''
        }
    )
    const [imageData, setImageData] = useState('')
    const [students, setstudents] = useState(false)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [userDetails, setUserDetails]: any = useState({
        college: 'Dummy College',
        department: 'CSE',
        university: 'Dummy University',
    })

    useEffect(() => {
        const userDetailsFromCookie = getCookies('user-details');
        if (userDetailsFromCookie) {
            setUserDetails(userDetailsFromCookie);
        }

    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('/api/users/assignmentWithId', { id: _id });
                setAssignments(response.data.assignment);
                console.log(response.data.studentsWhoHaveCompleted, 'This Is Tarun Pahade');
                if(response.data.studentsWhoHaveCompleted){

                
                response.data.studentsWhoHaveCompleted.map((x: any) => {
                    if (x.name === userDetails.name) {                        
                        setstudents(true)
                    }
                })
            }
                if (response.data.studentsWhoHaveCompleted === null) {
                    console.log(response.data.studentsWhoHaveCompleted, 'This is Tarun Pahade');


                }
                else {

                    const dataAddedMarkedAs = response.data.studentsWhoHaveCompleted.map((student: any) => ({
                        ...student,
                        markedAs: "complete",
                        name: student.name,
                        description: assignments.description
                    }));
                    
                }
                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [_id, assignments.description, assignments.name, userDetails.name]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }

    const handleSubmit = async () => {
        console.log('Uploading To Database');
        
        const response = await axios.post("/api/users/completeAssignment", {
            currecntAssignment: assignments,
            name: userDetails.name,
            subbmissionType: assignments.uploadType,
            imageData: imageData
        });
        console.log(response.data);
    }


    const uploadImage = async (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (event: any) => {
                console.log(event.target.result, 'this is the result');
                setImageData(event.target.result)
            };
            reader.readAsDataURL(file);
        }
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
            <ul role='list' className='divide-y divide-gray-200'>
                {students === true ? (
                    <p className='text-sm text-gray-500 p-6'>You Have Submitted The Assignment Already.</p>
                ) : (
                    <>
                        {assignments.image && (
                            <div className='flex justify-center p-4'>
                                <Image alt='Assignment Image' className='rounded-md' src={assignments.image} height={300} width={450} />
                            </div>
                        )}
                        {assignments.uploadType === 'Pdf' ? (
                            <div className="grid w-full max-w-sm items-center gap-1.5">
                                <Input id="picture" onChange={uploadImage} type="file" accept=".pdf" />
                            </div>
                        ) : (
                            <div className="grid w-full max-w-sm items-center gap-1.5">                
                                <Input id="picture" type="file" />
                            </div>
                        )}
                        <Button variant={'default'}  className='bg-black text-white mt-5' onClick={handleSubmit}>Upload Button </Button>
                    </>
                )}
            </ul>
        </div>
    );
}

