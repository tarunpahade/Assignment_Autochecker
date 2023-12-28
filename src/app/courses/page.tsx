'use client'
import Sidebar from "@/components/student/sidebar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "./components/card";
import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { TableDemo } from "./components/SimpleTable";
import Loading from "@/components/miniComponents/mini";
interface cookieInterface {
  name: string,
  rollno: number,
  semester: number,
  course: string,
  college: string

}
export default function Page() {

  return (

    <main>
      <div>
        <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
          <span className="sr-only">Open sidebar</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
          </svg>
        </button>
        <Sidebar currentPath={'Courses'} />
        <div className="p-4 sm:ml-64">

          <PageContent2 />

        </div>


      </div>


    </main>

  );
}
// In This Page User Can Select The Semester For Showing Purpose 
// const PageContent = () => {

  
// const [studentDetails, setStudentDetails] = useState<cookieInterface>({

//   name: 'abcd',
//   rollno: 1,
//   semester: 3,
//   course: 'CSE',
//   college: 'ABCD',

// });
// useEffect(() => {
//   function getCookie(name: string): any | null {
//     let cookieArray = document.cookie.split(';'); // Split the cookie string into individual key-value pairs

//     for(let i = 0; i < cookieArray.length; i++) {
//         let cookiePair = cookieArray[i].trim(); // Trim whitespace from each cookie pair
//         if (cookiePair.startsWith(name + '=')) {
//             return decodeURIComponent(cookiePair.substring(name.length + 1)); // Return the cookie value
//         }
//     }

//     return null; // Return null if the cookie was not found
// }
  
//   setStudentDetails(getCookie('student-details'));
// }, []);

//   const seesters = [
//     {
//       name: 'Semester I',
//       locked: false,
//       programminglanguages: [
//         {
//           id: 1,
//           name: 'html',
//           progress: 70
//         },
//         {
//           id: 2,
//           name: 'Javascript',
//           progress: 0
//         }
//       ]
//     },
//     {
//       name: 'Semester II',
//       locked: false,
//       programminglanguages: [
//         {
//           id: 1,
//           name: 'C',
//           progress: 70
//         },
//         {
//           id: 2,
//           name: 'C++',
//           progress: 0,
//         }
//       ]
//     },
//     {
//       name: 'Semester III',
//       locked: false,
//       programminglanguages: [
//         {
//           id: 1,
//           name: 'Java',
//           progress: 70
//         }
//       ]
//     }
//   ]
//   const [hideSemester, setHideSemester] = useState(false);
//   const [title, settitle] = useState('Course');
//   const [selectedSem, setSeectedSem]: any = useState(1)

//   const onSemesterClick = (name: any) => {
//     if (name.locked) {
//       alert('It is locked')
//     } else {
//       setSeectedSem(name)
//       settitle(name.name)
//       setHideSemester(true)
//     }

//   }

//   const [userProgress, setProgress] = useState();

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);


//   useEffect(() => {
//     // Fetch assignment details and all users
//     async function fetchData() {
//       setLoading(true);
//       try {
//         console.log('Starting To Featch Data')
//          const response = await axios.post("/api/users/getUserDetails", studentDetails);
//          console.log(response.data);
         
//         setProgress(response.data)
//         alert('Done Featching Data')

//         // setFilteredUsers(data);
//         setLoading(false);
//       } catch (error) {
//         console.log(error);
        
//         setError(true);
//         setLoading(false);
//       }
//     }

//      fetchData();
//   }, [studentDetails]);


//   return (
//     <div>
//       <div className="flex justify-between w-[30%]">
//         {hideSemester ? (
//           <a className="h-[22px] flex-1 pt-3" href="/courses"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"></path></svg></a>

//         ) : null

//         }
//         <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-5 ml-8">{title}</h1>

//       </div>
//       <div className=" max-w-screen-lg px-4  h-[530px] overflow-y-auto justify-center align-middle">
//         <div className="flex flex-col">
//           {hideSemester ? (

//             selectedSem.programminglanguages.map((seester: { locked: any; name: string; progress: number }, index: React.Key | null | undefined) => (
//               <div className="border  rounded-md border-[#adfa1d] p-4 dark:border-stone-700 flex  justify-between mt-5" key={index}>
//                 <Link href={`/courses/${seester.name}`} className="flex justify-between w-full bg-red">
//                   <p className="my-0  font-cal text-xl font-bold tracking-wide dark:text-white text-center">
//                     {seester.name}
//                   </p>
//                   <div className="w-[80%] flex flex-col ">
//                     <p className="my-0  font-cal text-xl font-bold tracking-wide dark:text-white text-right">{seester.progress}% complete</p>
//                     <Progress value={seester.progress} className="w-[100%] mt-3" />

//                   </div>

//                 </Link>
//               </div>

//             ))

//           ) : (
//             <div className="grid grid-cols-3 gap-4">
//               {seesters.map((seester, index) => (
//                 <Card semester={seester} onClick={onSemesterClick} key={index} />
//               ))}
//             </div>
//           )}




//         </div>

//       </div>

//     </div>
//   )
// }
const getCookie = (name: string): string | null => {
  const cookieArray = document.cookie.split(';');
  for (let cookiePair of cookieArray) {
    let [key, value] = cookiePair.trim().split('=');
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
};

const PageContent2 = () => {
  const [studentDetails, setStudentDetails] = useState<cookieInterface | null>(null);
  const [title, setTitle] = useState('Basic Problems');
  const [userProgress, setUserProgress] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fetch student details from cookie on component mount
  useEffect(() => {
    const cookieValue = getCookie('student-details');
    if (cookieValue) {
      setStudentDetails(JSON.parse(cookieValue));
    }
  }, []);

  // Fetch user data when student details are set
  useEffect(() => {
    const fetchData = async () => {
      if (!studentDetails) return;

      try {
        const response = await axios.post("/api/users/getUserDetails", studentDetails);
        setUserProgress(response.data.output);
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentDetails]);
  
    return (
      <div>
        <div className="flex justify-between w-[30%]">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-5 ml-8">{title}</h1>
  
        </div>
        <div className=" max-w-screen-lg px-4  h-[530px] overflow-y-auto justify-center align-middle">
          <div className="flex flex-col">
          {loading ? (
    <Loading />
) : error ? (
    <div>Error loading data</div>
) : (
    <TableDemo data={userProgress} />
)}

  
  
          </div>
  
        </div>
  
      </div>
    )
  }
  