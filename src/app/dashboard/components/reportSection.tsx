/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import axios from "axios"; // Import axios for API requests
import Loading from "@/components/miniComponents/mini";
import { Tablehead } from "@/components/teacher/Tablehead";
import TableBottomNav from "@/components/teacher/TableBottomNav";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
// Your styles can be imported here
const sampleHeaderData = ["Student Name"];
const sampleTableData: any[] = [];
interface TableItem {
  name: string;
  markedAs?: string[];
}
export  function ReportSection() {
  const [assignmentDetails, setAssignmentDetails]: any[] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [filterState, setFilterState] = useState(false);
  const [filteredUsers, setFilteredUsers]: any[] = useState([]);
  const [userSearches, setUserSearches] = useState("");
  const sampleTable: any[] = useMemo(() => sampleTableData, []);

  const sampleHeader: any[] = useMemo(() => sampleHeaderData, []);
  const [itemsPerPage, setItemsPerPage]: any = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the index of the first and last item to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sampleTable.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (newPage: React.SetStateAction<number>) => {
    setCurrentPage(newPage);
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const searchUser = (e: any) => {
    e.preventDefault();
    const searchValue = e.target.value;
    console.log("Hii", searchValue);

    setUserSearches(searchValue);

    const filteredUsers = sampleTableData.filter((user) =>
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredUsers(filteredUsers);
    console.log("Filtered Users:", filteredUsers);
    if (userSearches.length > 0) {
      setFilterState(true);
    } else if (userSearches.length === 0) {
      setFilterState(false);
    }
  };

  const exportToPDF = () => {
    // Create a new table with all users
    const table = document.createElement("table");
    table.className =
      "w-full mt-20 text-sm text-left text-gray-500 dark:text-gray-400";

    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    // Add table header
    const headerRow = document.createElement("tr");
    sampleHeaderData.forEach((item, index) => {
      const th = document.createElement("th");
      th.className = "px-6 py-3";
      th.textContent = item;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    sampleTableData.forEach(
      (item: { name: string | null; markedAs: any[] }, rowIndex: number) => {
        const tr = document.createElement("tr");

        // Apply the class based on the rowIndex
        tr.className =
          rowIndex % 2 === 0
            ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            : "bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700";

        // Create a table cell for the 'name' property
        const nameTd = document.createElement("td");
        nameTd.className =
          "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-mono";
        nameTd.textContent = item.name;
        tr.appendChild(nameTd);

        // Check if 'markedAs' exists and map through it to create additional table cells
        if (item.markedAs) {
          item.markedAs.forEach((item3, rowIndex3) => {
            const markedAsTd = document.createElement("td");
            markedAsTd.className =
              "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
            markedAsTd.textContent = item3;
            tr.appendChild(markedAsTd);
          });
        }

        // Append the table row to the table body
        tbody.append(tr);
      }
    );

    // Append the table body to your table element
    table.append(tbody);

    table.appendChild(tbody);

    table.id = "t1234";
    // Append the new table to the document

    document.body.appendChild(table);
    const item: any = document.getElementById("t1234");
    // // Export the table to PDF
    html2canvas(table).then((canvas) => {
      // Convert the canvas to a Blob
      canvas.toBlob((blob:any) => {
        // Create a URL for the Blob
        const blobUrl = URL.createObjectURL(blob);
    
        // Create a download link element
        const downloadLink = document.createElement('a');
        downloadLink.href = blobUrl;
    
        // Set the download attribute with the desired filename (e.g., "table.png" or "table.jpg")
        downloadLink.download = 'table.png'; // Change the filename as needed
    
        // Trigger a click event on the download link to initiate the download
        downloadLink.click();
    
        // Clean up by revoking the Blob URL and removing the canvas
        URL.revokeObjectURL(blobUrl);
      }, 'image/png'); // Change 'image/png' to 'image/jpeg' if needed
    });
    
    document.body.removeChild(item);
  };

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
    "TEST USER",
  ];
  useEffect(() => {
    // Fetch assignment details and all users
    async function fetchData() {
      setLoading(true);
      try {
        const response = await axios.get("api/assignment/getAssignmentReport"); // Replace with your API endpoint

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
        if (sampleHeader.length === assignmentDetails.length + 1) {
          return;
        }
        sampleHeader.push(assignment.name);
        headerRow.push(assignment.name);
      }
      users.forEach((x) => {
        const markedAs: string[] = [];
        assignmentDetails.map((y: any) => {
          if (y.completedBy !== null) {
            if (y.completedBy.includes(x)) {
              markedAs.push("complete");
            } else {
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
        sampleTable.push({
          name: x,
          markedAs: markedAs,
        });
        return {
          name: x,
          markedAs: markedAs,
        };
      });
      table.push(tbody);
    };
    if (assignmentDetails.length > 0) {
      createTableData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignmentDetails]);

  function renderTableRow(item: TableItem, rowIndex: number) {
    return (
      <tr
        className={
          rowIndex % 2 === 0
            ? "bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            : "bg-gray-100 border-b dark:bg-gray-800 dark:border-gray-700"
        }
        key={rowIndex}
      >
        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white font-mono">
          {item.name}
        </td>
        {item.markedAs &&
          item.markedAs.map((item3: string, rowIndex3: number) => (
            <td
              key={rowIndex3}
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {item3}
            </td>
          ))}
      </tr>
    );
  }

  return (
    <div className="relative w-[100%]">
      {loading ? (
        <Loading />
      ) : error ? (
        <p>Error loading data</p>
      ) : (
        <div className="relative overflow-x-auto">
          <div className="mx-auto max-w-screen-xl px-4 lg:px-12 h-[601px] overflow-y-auto">
            <Tablehead
              userSearches={userSearches}
              searchUser={searchUser}
              exportToPDF={exportToPDF}
            />
            <table
              id="table1"
              className="w-full mt-20 text-sm text-left text-gray-500 dark:text-gray-400 "
            >
              <thead>
                <tr className="text-xs w-[100%] text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                  {/* <tr> */}

                  {sampleHeader.map((item, index) => (
                    <th className="px-6 py-3" key={index}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading
                  ? null
                  : filterState
                  ? filteredUsers.map((item: any, rowIndex: any) =>
                      renderTableRow(item, rowIndex)
                    )
                  : currentItems.map((item, rowIndex: number) =>
                      renderTableRow(item, rowIndex)
                    )}
              </tbody>
            </table>
          </div>
          <TableBottomNav
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={sampleTable.length}
            onPageChange={handlePageChange}
            indexOfFirstItem={indexOfFirstItem} // Pass indexOfFirstItem
            indexOfLastItem={indexOfLastItem} // Pass indexOfLastItem
          />
        </div>
      )}
    </div>
  );
}
