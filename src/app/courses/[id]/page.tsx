'use client'
import Loading from "@/components/miniComponents/mini"
import { Popup } from "@/components/popup"
import { AssignmentsList } from "@/components/teacher/assignments"
import { getCookies } from "@/lib/utils"
import { assignments } from "@/types/interface"
import axios from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function Example({params}:any) {
  const _id = params.id
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
    console.log(getCookies('user-details'));
    
    setUserDetails(getCookies('user-details'));
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await axios.post('/api/users/assignmentByName', { name: getCookies('user-details').name }); 
        setAssignments(response.data);
        if (response.data.length === 0) {
          setLoading(false)
          setdataNull(true)
        }
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        
        setError(true);
        setLoading(false);
      }
    }
    fetchData();
  }, [userDetails]);

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
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between">
            <h1 className={`text-2xl font-bold tracking-tight   `}>
              Subject for {_id}
            </h1>
            <div>
            </div>
          </div>
          <ul role="list" className="divide-y mt-5 divide-gray-100">
            <AssignmentsList userType="teacher" data={filteredAssignments} onPress={onAssignmentPress} />
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
