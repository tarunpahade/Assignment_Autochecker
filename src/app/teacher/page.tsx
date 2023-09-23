'use client'
import { Popup } from "@/components/popup"
import { AssignmentsList } from "@/components/teacher/assignments"
import { assignments } from "@/types/interface"

import axios from "axios"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"


export default function Example() {
  const [showPopupState, setshowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState('all');
  const [assignments, setAssignments] = useState<assignments[]>([]);
  const [dataNull, setdataNull] = useState(false)
  const { status } = useSession()
  const { data: session } = useSession()

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const email = session?.user.email
console.log(session?.user,'this is the email');

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
    return <p>Loading...</p>;
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

        <div className="mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <h1 className={`text-2xl font-bold tracking-tight   `}>
              Assignments
            </h1>
            <div>




              <select required
                id="currency"
                name="currency"
                className="h-full rounded-md border border-black bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                onChange={handleSelectChange}
                value={selectedOption} // Set the selected value to the state value
              >
                <option value="all"> Filter By Year</option>

                <option value="1"> 1</option>
                <option value="2"> 2</option>
                <option value="3"> 3</option>
                <option value="4"> 4</option>
              </select>




              <button onClick={onAssignmentPress} className={`text-sm font-bold tracking-tight border border-black py-2 px-5 dark:text-gray-900 `}>
                Add Assignment
              </button>
            </div>
          </div>




          <ul role="list" className="divide-y mt-10 divide-gray-100">

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
