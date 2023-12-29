'use client'
import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import Loading from "@/components/miniComponents/mini";
import axios from "axios";
import React, { useEffect, useState } from "react";
type ProblemPageProps = {
	params: {
	  pid: string;
	};
  }; 
  
const ProblemPage = ({ params }:ProblemPageProps) => {
    const [problem, setProblems] = useState(false);

	const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
  	
	const id=params.pid
	console.log(id)

    useEffect(() => {
        const fetchData = async () => {
            try {


                // const response =await fetchProblemData(params.pid)
                const response = await axios.post('/api/problems/getProblem', { id: id }); // Replace with your API endpoint


                console.log(response.data,'this is client');
				setProblems(response.data)
               //   console.log(response.data.count, response);
			   

                setLoading(false);
            } catch (error: any) {
                console.log(error.message);

                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); 

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <p>Some Error While Featching Assignments</p>;
    }


	console.log(problem,'this is fetchdata');


	return (
		<div >
			<Topbar problemPage />
			
			<Workspace problem={problem} />
		</div>
	);
};
export default ProblemPage;
