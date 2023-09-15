'use client'
import { assignments } from '@/types/interface';
import axios from 'axios';
import { useEffect, useState } from 'react'
import { ExternalLink } from 'react-feather';
import ListOfRepos from '../student/repoList';
import { useSession } from 'next-auth/react';

export const AssignmentsList: React.FC<any> = ({ loading, result, handleButtonClick,updateDatabase, viewResult, data, userType }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { data: session } = useSession()
    const [repos, setRepos] = useState([]);
    const [selected, setSelected] = useState({ name: 'Select Repo', id: 8, url: 'http://github.com/tarunpahade/repos' })
    const email = session?.user.email

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
    }, []);

    const updateDatabase2 = async (e: assignments) => {
        console.log(e);

        try {
            console.log(selected);
            updateDatabase({e:e,repoLink: selected.url})
            // const response = await axios.post('api/users/completeAssignment', { repoLink: selected.url, currecntAssignment: e, email })
            // console.log(response);

            //setSucessfullySentMail(true)

        } catch (error: any) {
            console.log(error);

        }



    }

    return (
        <ul className='myComponent' role="list" >


            {data.map((person: assignments) => (
                <li key={Math.random()}>
                    <a href="#" className="block hover:bg-gray-50 dark:hover:bg-neutral-900">
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">

                                {userType === 'Student' ? (<> <div className='justify-between flex'>
                                    <a
                                        href='#'
                                        className="truncate text-sm font-medium text-indigo-600 mr-3">{person.name}</a>
                                    <ExternalLink className='mt-0.5' height={'14'} color='blue' onClick={() => { window.location.href = `${person.repoLink}` }} href={person.repoLink} />
                                </div>
                                    {person.markedAs === 'complete' ? (
                                        <div>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    console.log('View Result');
                                                    // Handle the "View Result" action here.
                                                    viewResult('Featch result for Email '+email +' for assignment  '+person.name+' id '+person._id+person.result)
                                                }}
                                                className={`mr-5 lg:text-[12px] text-[12px] text-white bg-black px-3 py-2 rounded-md mt-2 ml-4 `}
                                                style={{
                                                    backgroundColor: 'black',
                                                    color: 'white',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                View Result
                                            </button>
                                        </div>
                                    ) : (
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
                                                        console.log('Generating result');
                                                        updateDatabase2(person);
                                                    }}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                </>

                                ) : (
                                    <a
                                        href={userType === 'teacher' ? (`assignment/${person._id}`) : '#'}
                                        className="truncate text-sm font-medium text-indigo-600">{person.name}  </a>


                                )

                                }


                            </div>

                            <div className="mt-2 flex justify-between">
                                <div className="sm:flex">
                                    <div className="mr-6 flex items-center text-sm text-gray-500">

                                        Day Uploaded   {person.dateUploaded}
                                    </div>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">

                                    Submission Date {person.submissionDate}
                                </div>
                            </div>
                        </div>
                    </a>
                </li>


            ))}


        </ul>

    )
}
