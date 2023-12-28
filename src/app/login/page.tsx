'use client';
import { useState } from "react";
import {  signIn } from "next-auth/react"
import {  useRouter } from "next/navigation";
export default function Login() {

    const [user, setUser] = useState({
        name: "",
        password: "",
    })
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [error, seterror] = useState(false)


    const onLogin = async (e: any) => {


        e.preventDefault();

        try {
            setLoading(true);
            seterror(false)
            const signInResponse = await signIn('credentials', {
                name: user.name,
                password: user.password,
                redirect: false
            })
            console.log(signInResponse);


            if (signInResponse && !signInResponse.error) {

                if (JSON.parse(user.password) === 12345) {
                    router.push('/courses')

                } else if (JSON.parse(user.password) === 54321) {
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
    return (
        <div className="absolute top-0 w-full h-full bg-white">
           
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
                                <label htmlFor="name" className="block text-sm font-medium leading-6">
                                  Name
                                </label>

                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Lastname Name Midname all capitalized"
                                        required
                                        onChange={(e) => setUser({ ...user, name: e.target.value })}
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
                                     <div className="flex items-center mt-5 ">
                                    <label htmlFor="password" className="block text-gray-400 text-sm font-medium leading-6">
                                        Password is 12345
                                    </label>
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
                    </div>
                </div>
            
        </div>
    )
}
