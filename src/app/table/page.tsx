"use client";

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios"; // Import axios for API requests
import Loading from "@/components/miniComponents/mini";

// Your styles can be imported here
const sampleHeaderData = ['Student Name']
const sampleTableData: any[] = []


export default function TablePage() {
  const [assignmentDetails, setAssignmentDetails]: any[] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sampleTable: any[] = useMemo(() => sampleTableData, []);

  const sampleHeader: any[] = useMemo(() => sampleHeaderData, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const users = [
    "ATKARE PRASHANT RAJENDRA",
    "ADHAV KULDIP JALINDAR",
    "ANKUSH VEDANT ABHAY",
    "BAJAD KRUSHNA VINOD",
    "BANDE ATHARV VIJAYKUMAR",
    "BARDE VISHAL LAXMAN",
    "BARGE SHUBHAM MUNJAJI",
    "BOBADE AKANSHA VASANT",
    "BORSE DHANASHRI DNYANESHWAR",
    "CHANGHATE KRUSHNA RAKHAMAJI",
    "CHAVHAN PRACHI PURUSHOTTAM",
    "CHINCHOLI SAGAR GURUSHANTAPPA",
    "DAMALE SOMNATH SUNIL",
    "DATAR NANDINI SATISH",
    "DEVKATE DIVYA RAJU",
    "DIPAKE SUYASH SUDHAKAR",
    "GAIKWAD KARTIK SANJAY",
    "GAVHANE ABHISHEK SHRIKANT",
    "GAVHANE YOGESH EKNATH",
    "GHADGE DEEPAK KAILAS",
    "GHANDAGE AISHWARYA BAPURAO",
    "GHUME RAJESH DATTATRAY",
    "GUPTA SUJAL SHRIKANT",
    "INGLE SHRIKANT GANESH",
    "JADHAV AKASH BABASAHEB",
    "JADHAV DISHA ASHOK",
    "JADHAV SHIVPRASAD DATTU",
    "JAISWAL DIYA SOMESH",
    "JAVARE SANKET SHIVAJI",
    "JAWALE ANJALI PUNJAJI",
    "JUNGHARE SANIKA SANJAY",
    "JUNGHARE MANISHA GAJANAN",
    "KALAMB ASHISH VINOD",
    "KALE AJINKYA ARJUN",
    "KALE NAMRATA DILIP",
    "KAMBLE AKSHAYA DNYANESHWAR",
    "KATKAR PRANJAL NARAYAN",
    "KHULE SHREYASI SHRIYAS",
    "KHARE SAYALI RAJU",
    "KOKATE SONAL SHRIPATI",
    "LAHANE RUPESH BHARAT",
    "MARGUDE AARTI BALASAHEB",
    "MATE KARTIK DIPAKRAO",
    "MHASKE NILESH DNYANESHWAR",
    "MOGAL NEHA RADHAKISAN",
    "MORE AKANKSHA JANARDHAN",
    "MUDHOLKAR SHRUSHTI DNYANESHWAR",
    "MURHEKAR MAITREY CHANDRASHEKHAR",
    "NARWADE AAKANKSHA PRABHAKAR",
    "NIKAM VAISHALI KRISHNA",
    "PADALKAR MAYURESH RAMESH",
    "PAHADE TARUN NITIN",
    "PANKHADE SHRAVNI SAMBHAJIRAO",
    "PARDESHI AISHWARYA RAJU",
    "PUJARI GAYATRI ANIL",
    "RAJPUT ANIKETSING GYANSING",
    "RODE DHANSHRI KIRAN",
    "SALUNKE ROHIT BAPU",
    "SARDAR VISHVABHUSHAN DIPAKKUMAR",
    "SATPUTE ABHIJEET SACHIN",
    "SHELKE RAMESHWAR KALYAN",
    "SHINDE AARTI DINESH",
    "SHINDE NARHARI GANESH",
    "SHRIMANGLE ONKAR GANGADHAR",
    "SURASE PAYAL RAJENDRA",
    "SURASHE APARNA VILAS",
    "TAMBARE VAIBHAV KALYAN",
    "TAMBE VARSHA KAILAS",
    "TETWAR MINAL GHANSHAM",
    "UGHADE SHREYA YOGESH",
    "WAGHMARE MONIKA ANAND",
    "WARKHADE ROHINI BAPPASAHEB",
    "TEST USER"
  ];
  useEffect(() => {
    // Fetch assignment details and all users
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("api/assignment/getAssignmentReport"); // Replace with your API endpoint

        console.log(response);
        console.log(response.data.userData);

        setAssignmentDetails(response.data.userData);
        setAllUsers(response.data.allUsers);

        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Create a table with assignment names in rows and user names at the top of columns
    const createTableData = () => {
      const table = [];

      // Create the header row with user names
      const headerRow = ["Student Name"];
      const tbody: { name: string; markedAs: string[] }[] = [];
      table.push(headerRow);


      for (const assignment of assignmentDetails) {
        console.log(assignment);
        sampleHeader.push(assignment.name)
        headerRow.push(assignment.name);
      }
      users.forEach((x) => {
        const markedAs: string[] = [];
        assignmentDetails.map((y: any) => {
          if (y.completedBy !== null) {
            if (y.completedBy.includes(x)) {

              markedAs.push("complete");
            } else {
              console.log(`${y} does not exist in completedBy array.`);

              markedAs.push("Incomplete");
            }
          } else {
            markedAs.push("Incomplete");
          }
        });
        tbody.push({
          name: x,
          markedAs: markedAs,
        });


        return {
          name: x,
          markedAs: markedAs,
        };
      });
      table.push(tbody)
      sampleTable.push(tbody)
      console.log(tbody, 'whole table', table, 'alala');

    };
    if (assignmentDetails.length > 0) {
      createTableData();

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentDetails]);
  console.log(sampleTable, 'sample table');

  return (
    <div className="relative overflow-x-auto">
      {loading ? (
         <Loading />
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tr className="text-xs w-[100%] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* <tr> */}

              {sampleHeader.map((item, index) => (
                <th className="px-6 py-3" key={index}>{item}</th>
              ))}
            </tr>
            
            <tbody>
              {loading ? null : (

                sampleTable.map((item: any, rowIndex: any) => (

                  item.map((item2: any, rowIndex2: any) => (
                    <tr className={
                      rowIndex % 2 === 0
                        ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        : "bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
                    } key={rowIndex}>
                      <td key={rowIndex2}
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item2.name}
                      </td>
                      {item2.markedAs && item2.markedAs.map((item3: any, rowIndex3: any) => (

                        <td key={rowIndex3}
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {item3}
                        </td>


                      ))}


                    </tr>

                  ))


                ))
              )}



            </tbody>


          </table>  </div>
      )}
    </div>
  );
}
