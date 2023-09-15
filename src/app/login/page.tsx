'use client';
import Image from "next/image";
import { useState } from "react";
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect, useRouter } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import Google from "next-auth/providers/google";
import Users from "@/dbconfig/dbconfig";
import { SignUp } from "@/types/interface";

export default function Login() {

    const [user, setUser] = useState({
        email: "",
        password: "",
    })
    const router = useRouter()
    const [forgetPassword, setForgetPassword] = useState(false);
    const [buttonDisabled, setDisabled] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isSuccess, setisSuccess] = useState(false)
    const [error, seterror] = useState(false)
    const [responseText, setresponseText] = useState('')
    const [selectedOption2, setSelectedOption2] = useState('Student');


    const onLogin = async (e: any) => {


        e.preventDefault();

        try {
            setLoading(true);
            seterror(false)
            const signInResponse = await signIn('credentials', {
                email: user.email,
                password: user.password,
                userType: selectedOption2,
                redirect: false
            })
            console.log(signInResponse);
            console.log(selectedOption2);

            if (signInResponse && !signInResponse.error) {
                console.log(selectedOption2);

                if (selectedOption2 === 'Student') {
                    router.push('/student')

                } else if (selectedOption2 === 'teacher') {
                    router.push('/teacher')

                }

            } else {
                seterror(true)
            }




        } catch (error) {
            console.log("Login Failed", error);

            console.log('Invalid Password');
            seterror(true)


        } finally {
            setLoading(false);
        }
    };

    const handleSelectChange2 = (e: any) => {
        const selectedValue = e.target.value;
        setSelectedOption2(selectedValue);
    };

    const sendEmail = async (e: any) => {
        e.preventDefault();
        try {
            console.log('Send email');
            const res = await axios.post('/api/users/forgotpassword', { email: user.email })
            console.log(res, 'this is response');

            if (res.data.message === 'Mail sent to Your email') {
                setisSuccess(true)
            } else if (res.statusText) {
                seterror(true)
                setresponseText('No user Found')
                alert('No user Found')
            }
        } catch (error: any) {
            console.log(error.response.data);
        }
    }




    return (
        <>
            {forgetPassword ? (
                //class to flex-direction:column

                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                            Forget Password
                        </h2>
                    </div>
                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form action="" className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    onClick={sendEmail}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Send Mail
                                </button>
                            </div>
                        </form>
                        {isSuccess === true ? <label className="block text-sm font-medium leading-6 mt-5">Mail sent to your email</label> :
                            null}
                        {error === true ? <label className="block text-sm font-medium leading-6 mt-5 ">{responseText} Please  <a href="/signup" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Signup
                        </a></label> : null}
                    </div>
                </div>


            ) : (
                <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
                            Sign in to your account
                        </h2>
                        <h1 className="text-center">{loading ? "Loading..." : "Login"}</h1>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6" onSubmit={onLogin}>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                                        className="block p-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a onClick={() => setForgetPassword(true)} className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        onChange={(e) => setUser({ ...user, password: e.target.value })}
                                        className="block p-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="dueDate" className="block text-sm font-medium leading-6 text-gray-900">
                                    Login As
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
                                    Sign in
                                </button>
                                {error && <p className="border border-red-500 p-2 mt-4">Invalid password try again</p>}
                            </div>
                        </form>

                        <button onClick={(e) => {
                            e.preventDefault()
                            try {
                                signIn('github')
                            } catch (error) {
                                console.log(error);

                            } finally {

                                if (selectedOption2 === 'Student') {
                                    router.push('/student')

                                } else if (selectedOption2 === 'teacher') {
                                    router.push('/teacher')

                                }
                            }

                        }} className=" mt-10 w-full flex items-center  hover:dark:text-gray-100 justify-center gap-x-3 text-sm sm:text-base  bg-white-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
                            <div className='bg-white p-0 border rounded-full'>
                                {/* Here you can add your GitHub SVG */}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    fill="#000"
                                    className="bi bi-github"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38C13.71 14.53 16 11.54 16 8c0-4.42-3.58-8-8-8z" />
                                </svg>
                            </div>

                            <span>Continue with Github</span>
                        </button>

                        <button onClick={(e) => {
                            e.preventDefault()
                            try {
                                signIn('google')
                            } catch (error) {
                                console.log(error);

                            } finally {
                                if (selectedOption2 === 'Student') {
                                    router.push('/student')

                                } else if (selectedOption2 === 'teacher') {
                                    router.push('/teacher')

                                }

                            }

                        }} className=" mt-10 w-full flex items-center  hover:dark:text-gray-100 justify-center gap-x-3 text-sm sm:text-base  bg-white-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
                            <svg className="w-5 h-5 sm:h-6 sm:w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_3033_94454)">
                                    <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4" />
                                    <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853" />
                                    <path d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC04" />
                                    <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_3033_94454">
                                        <rect width="24" height="24" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span>Continue with Google</span>
                        </button>
                        <a href="/signup" className="flex w-full justify-center mt-4 font-semibold text-indigo-600 hover:text-indigo-500">
                            Or Sign Up
                        </a>

                    </div>
                </div>
            )}
        </>
    )
}
