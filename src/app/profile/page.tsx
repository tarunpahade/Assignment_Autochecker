
'use client'
import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image";
import { redirect } from "next/navigation";

export default function Profile() {
  const { status } = useSession()
  const { data: session } = useSession();
  console.log(session?.user);
 if(status === 'unauthenticated'){
redirect('/login')

 }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {status === 'authenticated' ? (
          <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              UserNAME: {session?.user?.email}

              <Image src={session?.user?.image!} alt="User Image" height={9} width={9} />
            </h2>
            <button
              type="button"
              className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            type="button"
            className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >SignIN
          </button>
        )

        }

      </div>
    </div>
  );
}
