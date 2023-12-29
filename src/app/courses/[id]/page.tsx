"use client";
import Sidebar from "@/components/student/sidebar";
import { columns } from "../components/columns";
import React, { useEffect, useState } from "react";
import { DataTable } from "../components/table";
import { problemsArray } from "@/utils/javascript";
import { cLanguage, javaData } from "../data/tasks";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Page({ params }: any) {
  const lang = params.id;
  return (
    <main>
      <div>
        <button
          data-drawer-target="default-sidebar"
          data-drawer-toggle="default-sidebar"
          aria-controls="default-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clip-rule="evenodd"
              fill-rule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        <Sidebar currentPath={"Courses"} />

        <div className="p-4 sm:ml-64">
          <PageContent lang={lang} />
        </div>
      </div>
    </main>
  );
}

const PageContent = ({ lang }: any) => {
  const router = useRouter();

  const [title, settitle] = useState(lang);
  let filteredUsers;
  if (lang === "javascript") {
    filteredUsers = problemsArray;
    //    setLanguageNotAvailable(false);
  } else if (lang === "C") {
    filteredUsers = cLanguage;
    // setLanguageNotAvailable(false);
  } else if (lang === "Java") {
    // setLanguageNotAvailable(false);
    filteredUsers = javaData;
  } else if (lang === "Javascript") {
    filteredUsers = problemsArray;
  }

  // const [fetchedProblems, setFetchedProblems] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  // useEffect(() => {
  //   // Fetch assignment details and all users
  //   async function fetchData() {
  //     setLoading(true);
  //     try {
  //       const response = await axios.post("api/assignment/getAssignmentReport");

  //       setFetchedProblems(response.data);

  //       setLoading(false);
  //     } catch (error) {
  //       setError(true);
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div>
      <div className="flex justify-between w-[20%]">
        <ArrowLeft
          onClick={() => {
            router.back();
          }}
          className="mt-2"
        />

        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-5 ml-3">
          {title}
        </h1>
      </div>
      <div className="  max-w-screen-xl  lg:px-12 w-full items-center "></div>
      <div className=" max-w-screen-lg px-4  h-[530px] overflow-y-auto justify-center align-middle">
        <div className="flex">
          <div className="grid grid-cols-3 gap-4"></div>
        </div>
        {!filteredUsers ? (
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-5 ml-3">
            Language Specified Not Available
          </h1>
        ) : (
          <DataTable data={filteredUsers} columns={columns} />
        )}
      </div>
    </div>
  );
};
