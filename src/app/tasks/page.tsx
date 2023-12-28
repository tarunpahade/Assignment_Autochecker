'use client'
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import axios from 'axios';
import { assignments } from '@/types/interface';
import Loading from '@/components/miniComponents/mini';
import Sidebar from '@/components/student/sidebar';
import { DataTable } from './components/table';
import { columns } from "./components/columns"

const Student = () => {
    const { data: session } = useSession()
    const [repo, setRepoData]: any[] = useState([]);
    const email = session?.user.name
    const [loading2, setLoading2] = useState(true);
    const [error, setError] = useState(false);
    console.log(email, 'this is email');

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [dataNull, setdataNull] = useState(false)



    const [selectedOption, setSelectedOption] = useState('all');
    let filteredAssignments;

    if (selectedOption === 'all') {
        filteredAssignments = repo;
    } else if (selectedOption === '1') {
        filteredAssignments = repo.filter((item: any) => item.markedAs === 'Incomplete');
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

        return (

            <main>
                <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">

                    <Loading />
                </div>
            </main>
        )
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
    const updateDatabase = async ({ e, submittedCode }: { e: assignments, submittedCode: String }) => {
        console.log(e);

        try {


            const response = await axios.post('api/users/completeAssignment', { submittedCode, currecntAssignment: e, email })
            console.log(response);

        } catch (error: any) {
            console.log(error);

        }



    }
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

    return (

        <main>

            <div>

                <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                    <span className="sr-only">Open sidebar</span>
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                    </svg>
                </button>

                <Sidebar currentPath={'Tasks'} />

                <div className=" sm:ml-52">

                    <PageContent selectedOption={selectedOption} handleSelectChange={handleSelectChange} filteredAssignments={filteredAssignments} />

                </div>


            </div>


        </main>

    )
}
const PageContent = ({ selectedOption, handleSelectChange, filteredAssignments }: any) => {
  

    return (
        <div className="mx-auto max-w-6xl mt-4 sm:px-6 lg:px-8">

            {/* <div className="flex justify-between"> */}
                <h1 className={`scroll-m-20 text-4xl font-bold tracking-tight  ml-3 mt-2 `}>
                  Study material
                </h1>
            


                    {/* <div className="pointer-events-auto flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10">
                        <div className={`px-4 py-2   ${selectedOption === '0' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('0')}>Complete</div>
                        <div className={`px-4 py-2   ${selectedOption === '1' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('1')}>InComplete</div>
                        <div className={`px-4 py-2   ${selectedOption === 'all' ? 'bg-blue-700 text-white' : ''}`} onClick={() => handleSelectChange('all')}>all</div>

                    </div> */}

                
            {/* </div> */}




            <ul role="list" className="divide-y mt-10 divide-gray-100">

                {/* <AssignmentsList userType='Student' data={filteredAssignments} /> */}
            </ul>
            <div className=" max-w-screen-lg px-4  h-[530px] overflow-y-auto justify-center align-middle">
    

        <DataTable data={filteredAssignments} columns={columns}  />
      </div>

        </div>
    )
}
export default Student