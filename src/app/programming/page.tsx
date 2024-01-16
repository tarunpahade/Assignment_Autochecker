'use client'
import Sidebar from "@/components/student/sidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TableDemo } from "./components/SimpleTable";
import Loading from "@/components/miniComponents/mini";
import { getCookies } from "@/lib/utils";
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
      

          <PageContent2 />

        
    </main>

  );
}





const PageContent2 = () => {
    const [studentDetails, setStudentDetails] = useState<cookieInterface | null | string>();
    const [title, setTitle] = useState('Basic Problems');
    const [userProgress, setUserProgress] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  
    // Fetch student details from cookie on component mount
    useEffect(() => {
      const cookieValue = getCookies('user-details');
      if (cookieValue) {
        setStudentDetails(JSON.stringify(cookieValue));
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
    