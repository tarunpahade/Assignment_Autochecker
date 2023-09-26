'use client'
import Loading from "@/components/miniComponents/mini"
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
  const [loadingReport, setLoadingReport] = useState(false);

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

  const ReportDetails= async() =>{
    setLoadingReport(true)
    try {
      const response = await axios.get('api/assignment/getAssignmentReport'); // Replace with your API endpoint

      console.log(response.data);
      setLoadingReport(false);
      
    } catch (error: any) {
      setError(true);
      setLoading(false);
    }
  
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

              <button onClick={ReportDetails} className="  ml-6 rounded-md inline-flex items-center px-4 py-3 text-sm font-medium text-center text-blue-700 border-blue-700 border bg-white  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {loadingReport ? (
                <>
                  <svg aria-hidden="true" role="status" className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="#1C64F2" />
                  </svg>
                  <>Loading...</>
                </>

              ) : (
                <> Generate Report </>
              )

              }
             
              </button>
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
