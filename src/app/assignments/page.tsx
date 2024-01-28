'use client'
import Loading from "@/components/miniComponents/mini"
import { Popup } from "@/components/popup"
import { AssignmentsList } from "@/components/teacher/assignments"
import { getCookies } from "@/lib/utils"
import { assignments } from "@/types/interface"

import axios from "axios"
import { useSession } from "next-auth/react"
import Link from "next/link"

import { redirect } from "next/navigation"
import { useEffect, useState } from "react"


export default function Example() {
  const [showPopupState, setshowPopup] = useState(false);
  const [selectedOption] = useState('all');
  const [assignments, setAssignments] = useState<assignments[]>([]);
  const [dataNull, setdataNull] = useState(false)
  const { status } = useSession()
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userDetails, setUserDetails]: any = useState({
    college: 'Dummy College',
    department: 'CSE',
    university: 'Dummy University',
  })

  useEffect(() => {
    setUserDetails(getCookies('user-details'));
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('api/users/getAssignment'); 
        setAssignments(response.data);
        console.log(response.data);
        if (response.data.length === 0) {
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

  if (status === 'unauthenticated') {
    redirect('/login')
  }
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Some Error While Featching Assignments</p>;
  }

  const filteredAssignments = selectedOption === 'all' ? assignments : assignments.filter(item => item.semester === selectedOption);


  const onAssignmentPress = () => {
    setshowPopup(true)
  }
  const closeForm = () => {
    setshowPopup(false)
  }

  const getFormDetailsAndAppendData = (data: any) => {
    console.log(data);
    const data2 = assignments
    data2.push(data)
    setAssignments(data2)
    setdataNull(false)
  }


  if (dataNull) {
    return (
      <main>
        <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
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
        <div className="mx-auto max-w-6xl ">
          <div className="flex justify-between">
            <h1 className={`text-2xl font-bold tracking-tight   `}>
              Assignments for {userDetails.subject}
            </h1>
            <div>
              <button onClick={onAssignmentPress} className="  ml-6 rounded-md inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Add Assignment
              </button>

              <Link href={'/table'} className="  ml-6 rounded-md inline-flex items-center px-4 py-3 text-sm font-medium text-center text-blue-700 border-blue-700 border bg-white  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 hover:text-white">
                Generate Report
              </Link>
            </div>
          </div>
          <ul role="list" className="divide-y mt-5 divide-gray-100">
            <AssignmentsList userType="Teacher" data={filteredAssignments} onPress={onAssignmentPress} />
          </ul>
        </div>
        {showPopupState ? (
          <Popup userDetails={userDetails} close={closeForm} getFormDetailsAndAppendData={getFormDetailsAndAppendData} />
        ) : null
        }
      </main>
    </>
  )
}
