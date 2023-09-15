'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/router'


export default function VerifyEmail() {

    const [token, settoken] = useState('')
    const [password, setpassword] = useState('')
    const [confirmpassword, setconfirmpassword] = useState('')
    const [success, setsuccess] = useState(false)
    const [error, seterror] = useState(false)


    const changePassword = async (e: any) => {
        console.log(password, confirmpassword);

        e.preventDefault()
        if (password === confirmpassword) {


            try {
                const res = await axios.post('/api/users/resetpassword', { token, password })
                console.log(res);
window.location.href='/login'
                if (res.data.error === 'Token Expired') {
                    seterror(true)
                }
                else if (res.data.message === 'Password changed successfully') {
                   setsuccess(true)

                }
            } catch (error: any) {
                console.log(error.response.data);

            }
        } else {
            seterror(true)
        }
    }

    useEffect(() => {

        const urlToken = window.location.search.split('=')[1];
        console.log('url ', urlToken);
        settoken(urlToken)

    }, [])




    return (

        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
               <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                         Reset Password
                        </h2>
                    </div>
            
            <form  className="space-y-6" onSubmit={changePassword}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                {error && <h2 className='p-2 '>Password Does Not Match</h2>}
             
                  <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                            
                        </div>
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Retype Password
                                </label>

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    onChange={(e) => setconfirmpassword(e.target.value)}
                                    className="block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full mt-5 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign in
                            </button>
                        </div>
                {error ? <p  className="border border-red-500 p-2 mt-4">Session Expired</p>: null}
                {success === true ? <label className="block text-sm font-medium leading-6 mt-5">Mail sent to your email</label> :
                            null}
                            </div>
            </form>

        </div>
    )

}