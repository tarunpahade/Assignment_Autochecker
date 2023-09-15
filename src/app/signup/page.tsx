'use client';

import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { signIn, useSession, } from "next-auth/react";
import { SignUp } from "@/types/interface";

export default function SignUp() {
    const router = useRouter()
    const [user, setUser] = useState({
        email: "",
        password: "",
        personalAccessToken: ''
    })
    const [selectedOption, setSelectedOption] = useState('1');
    const [selectedOption1, setSelectedOption1] = useState('DITMS');
    const [student, setstudent] = useState(false)
    const [teacher, setteacher] = useState(false)
    const [hideMain, sethideMain] = useState(false)
    const [selectedOption2, setSelectedOption2] = useState('Student');
    const [userAlreadyExists, setuserAlreadyExists] = useState(false)

    const handleSignUp = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        try {
            console.log(user, selectedOption, selectedOption1);
            if (selectedOption2 === 'Student') {
                setstudent(true)
            }
            if (selectedOption2 === 'teacher') {
                setteacher(true)
            }
            sethideMain(true)

        } catch (error: any) {
            console.log(error);
            alert('Error:' + error)
        }

    }
    const signUpStudent = async () => {
        const data: SignUp = {
            ...user,
            userType: selectedOption2,
            year: selectedOption,
            institute: selectedOption1
        }
        try {

            const response = await axios.post("api/users/signup", data);
            console.log(response);

            router.push('/login')

        } catch (error: any) {
            console.log(error, 'This is Err ');
            setuserAlreadyExists(true)
        }
    }


    const handleSelectChange1 = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedOption1(selectedValue);
    };

    const handleSelectChange2 = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedOption2(selectedValue);
    };
    const handleSelectChange = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedOption(selectedValue);
    };
    return (
        <>

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight ">
                        Sign up to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {hideMain ? (
                        <>
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Select Year
                                </label>
                                <div className="mt-2">

                                    <div className="relative mt-2 rounded-md shadow-sm">

                                        <div className="absolute inset-y-0 left-0 flex items-center">

                                            <select required
                                                id="currency"
                                                name="currency"
                                                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                onChange={handleSelectChange}
                                                value={selectedOption} // Set the selected value to the state value
                                            >
                                                <option value="1"> 1st</option>
                                                <option value="2"> 2nd</option>
                                                <option value="3"> 3rd</option>
                                                <option value="4"> 4th</option>
                                            </select>
                                        </div>
                                        <div style={{ borderLeft: '1px' }} className="pointer-events-none  absolute inset-y-0 left-20 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">Year</span>
                                        </div>
                                        <input required
                                            type="text"
                                            name="price"
                                            id="price"
                                            disabled={true}
                                            className="block   w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder=""
                                        />

                                    </div>
                                </div>


                                <div className="mt-4">
                                    <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                        Select Institute
                                    </label>
                                    <div className="mt-2">

                                        <div className="relative mt-2 rounded-md shadow-sm">

                                            <div className="absolute inset-y-0 left-0 flex items-center">

                                                <select required
                                                    id="currency"
                                                    name="currency"
                                                    className="h-full  w-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                    onChange={handleSelectChange1}
                                                    value={selectedOption1} // Set the selected value to the state value
                                                >
                                                    <option value="DITMS"> DITMS</option>
                                                    <option value="COLLEGE"> COLLEGE</option>
                                                </select>
                                            </div>

                                            <input required
                                                type="text"
                                                disabled={true}
                                                className="block   w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder=""
                                            />

                                        </div>
                                    </div>
                                </div>

                            </div>
                            <div>


                                <button
                                    type="submit"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        signUpStudent()
                                    }}
                                    className="mt-10 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create Account
                                </button>


                            </div>
                        </>
                    ) : (

                        <form className="space-y-6" onSubmit={handleSignUp}  >
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input

                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        required
                                        className="block w-full p-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>


                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                        Enter Password
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required
                                        className="block w-full p-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                            </div>
                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 ">
                                        Enter Password
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        required
                                        className="block w-full p-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="token" className="block text-sm font-medium leading-6 ">
                                        Enter Personal Access Token
                                    </label>

                                </div>
                                <div className="mt-2">
                                    <input
                                        id="token"
                                        name="token"
                                        type="text"
                                        autoComplete="current-password"
                                        onChange={(e) => setUser({ ...user, personalAccessToken: e.target.value })}
                                        required
                                        className="block w-full p-2 rounded-md border-0 py-1.5  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>

                            </div>


                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Continue As
                                </label>
                                <div className="mt-2">

                                    <div className="relative mt-2 rounded-md shadow-sm">

                                        <div className="absolute inset-y-0 left-0 flex items-center">

                                            <select required
                                                id="currency"
                                                name="currency"
                                                className="h-full  w-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                onChange={handleSelectChange2}
                                                value={selectedOption2} // Set the selected value to the state value
                                            >
                                                <option value="Student"> Student</option>
                                                <option value="teacher"> teacher</option>
                                            </select>
                                        </div>

                                        <input required
                                            type="text"
                                            name="price"
                                            id="price"
                                            disabled={true}
                                            className="block   w-full rounded-md border-0 py-1.5  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder=""
                                        />

                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Next
                                </button>
                            </div>
                        </form>
                    )}


                    <a href="/login" className="flex w-full justify-center mt-4 font-semibold text-indigo-600 hover:text-indigo-500">
                        Already Have A Account? Login Here
                    </a>
                    {userAlreadyExists === true ? <label className="block text-sm font-medium leading-6 mt-5 "> User Already Exists Login !!!</label> : null}
                </div>
            </div>
        </>
    )
}
