'use client'
import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react"

import Image from "next/image";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const { status } = useSession()
const router=useRouter()
  const { data: session } = useSession();
  console.log(session);
 if(status === 'unauthenticated'){

redirect('/login')

 }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {status === 'authenticated' ? (
          <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              UserNAME: {session?.user?.name}

              <Image src={session?.user?.image!} alt="User Image" height={9} width={9} />
            </h2>
            <button
              type="button"
              className="flex w-full justify-center rounded-md mt-6 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
             onClick={async () => {
                try {
                  await axios.get('/api/users/logout');
                  signOut(); 
                router.push('/login')
     
                  // Handle the response as needed, e.g., redirect to the login page.
                } catch (error) {
                  console.error('Logout failed:', error);
                }
              }}
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