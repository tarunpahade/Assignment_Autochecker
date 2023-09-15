'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { assignments } from '@/types/interface';
import { AssignmentsList } from '@/components/teacher/assignments';
import { useRouter } from 'next/navigation';

const Student = () => {
    const router = useRouter();
    const { data: session } = useSession()
    const [repo, setRepoData]: any[] = useState([]);
    const email = session?.user.email
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [dataNull, setdataNull] = useState(false)

    const [selectedOption, setSelectedOption] = useState('all');
    let filteredAssignments;

    if (selectedOption === 'all') {
        filteredAssignments = repo;
    } else if (selectedOption === '1') {
        filteredAssignments = repo.filter((item: any) => item.markedAs === 'incomplete');
    } else if (selectedOption === '0') {
        filteredAssignments = repo.filter((item: any) => item.markedAs === 'complete');
    } else {
        // Default value if none of the conditions match
        filteredAssignments = repo;
    }


    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.post('api/users/assignmentByYear', { email });
                const data = response.data;
                console.log(data);

                if (data.length === 0) {

                    setLoading2(false)
                    setdataNull(true)

                }

                setRepoData(data);



                setLoading2(false)

            } catch (error: any) {
                console.error('API request failed with error:', error.message);
                setError(true)
            }
        };


        if (email) {
            console.log('Start fetching');
            fetchData();
        }
    }, [email]);

    if (loading2) {

        return <p>Loading...</p>;
    }
    if (dataNull) {


        return (
            <main>

                <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
                    <h1 className={`text-2xl font-bold tracking-tight  dark:text-gray-900 `}>
                        No assignments Uploaded By Your Teacher
                    </h1>
                </div>
            </main>
        )
    }
    if (error) {
        setLoading(false)
        return <p>Some Error While Featching Assignments</p>;
    }

    const handleSelectChange = (e: string) => {

        setSelectedOption(e);
    };

    //merge this while subbmiting repo
    const handleButtonClick = async (person: assignments) => {
        setLoading(true);

        try {

            const response = await axios.post('/api/result', { repolink: person.repoLink, name: person.name });
            const responseData = response.data;
            //  const responseData = "This code is overall well written and demonstrates a good understanding of anchor tags. The code is correct and efficient, and follows best practices. The only issue is that the last anchor tag should be an 'a' tag instead of an 'anchor' tag. Additionally, the 'target' attribute should be added to the first anchor tag to open the link in a new window.I would suggest changing the last anchor tag to the following:<a href=https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80>View Image</a>And adding the 'target' attribute to the first anchor tag:<a href=https://www.amazon.com target=blank />Open in New taht redirects to Amazon</a>I would rate this code 4/"
            // Simulate a delay for demonstration purposes
            await new Promise((resolve) => setTimeout(resolve, 2000));

            setLoading(false)
            setResult(responseData);

        } catch (error) {
            console.error('Error fetching result:', error);
        }
    };
    const viewResult = (result2: string) => {
        localStorage.setItem('result', result2!);
        router.push('/result')
    }
    return (

        <main>
            <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">

                <div className="flex justify-between">
                    <h1 className={`text-2xl font-bold tracking-tight   `}>
                        Assignments Uploaded By Class Teacher
                    </h1>
                    <div>


                        <div className="pointer-events-auto flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
                            <div className={`px-4 py-2   ${selectedOption === '0' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('0')}>Complete</div>
                            <div className={`px-4 py-2   ${selectedOption === '1' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('1')}>InComplete</div>
                            <div className={`px-4 py-2   ${selectedOption === 'all' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('all')}>all</div>

                        </div>

                    </div>
                </div>




                <ul role="list" className="divide-y mt-10 divide-gray-100">

                    <AssignmentsList viewResult={viewResult} loading={loading} result={result} handleButtonClick={handleButtonClick} userType='Student' data={filteredAssignments} />
                </ul>

            </div>

        </main>

    )
}
export default Student