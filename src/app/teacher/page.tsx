'use client'
import Loading from "@/components/miniComponents/mini"
import { Popup } from "@/components/popup"
import { AssignmentsList } from "@/components/teacher/assignments"
import { assignments } from "@/types/interface"

import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"
import { InstructorNav } from "../dashboard/components/InstructorNav"
import { NavForInstructor } from "@/components/teacher/nav/NavForInstructor"


export default function Example() {
  const [showPopupState, setshowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [assignments, setAssignments] = useState<assignments[]>([]);
  const [dataNull, setdataNull] = useState(false)
  const { status } = useSession()
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(false);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/users/getAssignment'); // Replace with your API endpoint

        setAssignments(response.data);
        console.log(response.data);
        if (response.data.length === 0) {
          console.log('hiii');
          
      setLoading(false)
          setdataNull(true)
      }
        setLoading(false);
      } catch (error: any) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if(status === 'unauthenticated'){
  
    redirect('/login')
  
    
    }
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Some Error While Featching Assignments</p>;
  }

  
 
  
  
  const filteredAssignments = selectedOption === 'all' ? assignments : assignments.filter(item => item.forYear === selectedOption);


  const onAssignmentPress = () => {
    setshowPopup(true)
  }
  const closeForm = () => {
    setshowPopup(false)
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
  };
  const getFormDetailsAndAppendData = (data: any) => {
    console.log(data);
    const data2 = assignments
    data2.push(data)
    setAssignments(data2)
    setdataNull(false)
  }
  if(dataNull){

    
    return (
        <main>
        

            <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
            <InstructorNav />
                <h1 className={`text-2xl font-bold tracking-tight  dark:text-gray-900 `}>
                    No assignments Uploaded !!
                </h1>
                
              <button onClick={onAssignmentPress} className={`mt-8  text-sm font-bold tracking-tight border border-black py-2 px-5 dark:text-gray-900 `}>
                Add Assignment
              </button>
              
            </div>
            
        {showPopupState ? (
          <Popup close={closeForm} getFormDetailsAndAppendData={getFormDetailsAndAppendData} />
        ) : null

        }
        </main>
    )
}


  
  return (
    <>

      <main>
      <NavForInstructor />
        <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <h1 className={`text-2xl font-bold tracking-tight   `}>
              Assignments
            </h1>
            <div>




              <select required
                id="currency"
                name="currency"
                className="py-3 rounded-md border border-black bg-transparent  px-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleSelectChange}
                value={selectedOption} // Set the selected value to the state value
              >
                <option value="all"> Filter By Year</option>

                <option value="1"> 1</option>
                <option value="2"> 2</option>
                <option value="3"> 3</option>
                <option value="4"> 4</option>
              </select>




              <button onClick={onAssignmentPress} className="  ml-6 rounded-md inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add Assignment
              </button>

              <Link href={'/table'}  className="  ml-6 rounded-md inline-flex items-center px-4 py-3 text-sm font-medium text-center text-blue-700 border-blue-700 border bg-white  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Generate Report 
              
             
              </Link>
            </div>
          </div>




          <ul role="list" className="divide-y mt-5 divide-gray-100">

            <AssignmentsList userType="teacher" data={filteredAssignments} onPress={onAssignmentPress} />
          </ul>


        </div>
        {showPopupState ? (
          <Popup close={closeForm} getFormDetailsAndAppendData={getFormDetailsAndAppendData} />
        ) : null

        }
      </main>
    </>
  )
}
