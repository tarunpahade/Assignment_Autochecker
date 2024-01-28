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

export default function Example() {
  const [showPopupState, setshowPopup] = useState(false);
  const [selectedOption] = useState('all');
  const [assignments, setAssignments] = useState<assignments[]>([]);
  const [dataNull, setdataNull] = useState(false)
  const { status } = useSession()
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
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
        const response = await axios.post('/api/student/getAssignmentDetails', { username: getCookies('user-details').name });

        setAssignments(response.data.userData);
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
  const uploadImage = async (e: any) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = async(event: any) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  }
  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-between">
            <h1 className={`text-2xl font-bold tracking-tight`}>
              Assignments Assigned
            </h1>
          </div>
          <ul role="list" className="divide-y mt-5 divide-gray-100">
            <AssignmentsList userType="Student" handleImageUpload={uploadImage} handlePdfUpload={uploadImage} data={filteredAssignments} onPress={onAssignmentPress} />
          </ul>
        </div>
        {showPopupState ? (
          <Popup userDetails={userDetails}  close={closeForm} getFormDetailsAndAppendData={getFormDetailsAndAppendData} />
        ) : null
        }
      </main>
    </>
  )
}
