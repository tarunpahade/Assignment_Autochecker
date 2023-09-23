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

