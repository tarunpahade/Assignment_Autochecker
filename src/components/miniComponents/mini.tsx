/* eslint-disable react-hooks/rules-of-hooks */
///Black Button
import React, { useEffect } from 'react'

export const BlackButton = ({ onClick }: any) => {
    return (

        <button
            className={`mr-5 lg:text-[12px] text-[12px] text-white  bg-black px-3 py-2 rounded-md mt-2 ml-4  `}
            style={{
                backgroundColor: 'black',
                color: 'white',
                cursor: 'pointer',
            }}
            onClick={(e) => {
                e.preventDefault();
                onClick()
            }}
        >
            Submit
        </button>
    )
}
//Select A repo From Github and submit assignment

import ListOfRepos from '../student/repoList';

export const mini = ({ onClick }: any) => {
    const [repos, setRepos] = useState([]);
    
    
    const [selected, setSelected] = useState({ name: 'Select Repo', id: 8, url: 'http://github.com/tarunpahade/repos' })
    
    useEffect(() => {
        async function fetchRepos() {
            try {
                // To Get Repositories from github
                const response = await axios.get(
                    `https://api.github.com/users/tarunpahade/repos`
                );

                const repoData = response.data;

                // Map the repository data to the desired format
                const formattedRepos = repoData.map((repo: any) => ({
                    id: repo.id,
                    name: repo.name,
                    url: repo.html_url
                }));

                // Set the formatted repositories in state
                setRepos(formattedRepos);
            } catch (error) {
                console.error('Error fetching GitHub repositories:', error);
            }
        }

        fetchRepos();
    }, [repos, setRepos]);

    return (

        <div className='justify-between flex'>
            <div>
                <ListOfRepos repos={repos} setRepos={setRepos} selected={selected} setSelected={setSelected} />
            </div>
            <div>
                <button
                    className={`mr-5 lg:text-[12px] text-[12px] text-white  bg-black px-3 py-2 rounded-md mt-2 ml-4  `}
                    style={{
                        backgroundColor: 'black',
                        color: 'white',
                        cursor: 'pointer',
                    }}
                    onClick={(e) => {
                        e.preventDefault();
                        onClick()
                    }}
                >
                    Submit
                </button>
            </div>
        </div>
    )
}

import { useState } from 'react';
import axios from 'axios';

export function RadioOptions({ options, Title,selectedOption,handleRadioChange }: { options: { name: string,disabled:boolean }[], Title: string, handleRadioChange:any,selectedOption:any}) {

    return (
        <>
            <h3 className="mb-4 font-semibold text-gray-900 dark:text-white">{Title}</h3>

            <ul className="w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    {options.map((x) => (
                   <li key={Math.random()*1000} className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                   <div className="flex items-center pl-3">
                             <input
                                id={`horizontal-list-radio-${x.name}`}
                                type="radio"
                                value={x.name}
                                disabled={x.disabled}
                                name="list-radio"
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                                checked={selectedOption === x.name}
                                onChange={handleRadioChange}
                            />
                            <label
                                htmlFor={`horizontal-list-radio-${x.name}`}
                                className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                                {x.name}
                            </label>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}


export const chooseAndSubmit = () => {
    const handleFileChange = (event:any) => {
        const selectedFile = event.target.files[0];
    
        if (selectedFile) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            const content = e.target?.result as string;
            // setFileContent(content);
            // setIsSubmitted(true)
            console.log(content);
            
          };
    
          reader.readAsText(selectedFile);
        }
      };
      
    const updateDatabase2 = async (e: any) => {
        console.log(e);

        // try {
        //     console.log(selected);
        //     updateDatabase({ e: e, submittedCode :fileContent })
        //     const response = await axios.post('api/users/completeAssignment', { repoLink: selected.url, currecntAssignment: e, email })
        //     console.log(response);

        //     setSucessfullySentMail(true)

        // } catch (error: any) {
        //     console.log(error);

        // }



    }

  return (
    <div className='justify-between flex'>

                                            <div className=" mt-2">
                                                <input
                                                    type="file"
                                                    accept=".html"
                                                    className=" relative w-[90%] cursor-default rounded-md  py-1.5 pl-3 pr-10 text-right text-gray-900 shadow-sm sm:text-sm sm:leading-6"
                                                    onChange={handleFileChange} // Add an onChange handler
                                                />

                                                
                                            </div>


                                            <div>
                                                <button
                                                    className={`mr-5 disabled:bg-slate-300 lg:text-[12px] text-[12px] text-white  bg-black px-3 py-2 rounded-md mt-2 ml-4  `}
                                                    style={{
                                                        backgroundColor: 'black',
                                                        color: 'white',
                                                        cursor: 'pointer',
                                                    }}

                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        console.log('Generating result');
//                                                        updateDatabase2(person);
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
  )
}


const Loading = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <svg
          aria-hidden="true"
          role="status"
          className="inline w-8 h-8 mr-3 text-gray-200 animate-spin dark:text-gray-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="#1C64F2"
          />
        </svg>
      </div>
    </div>
  );
};

export default Loading;
