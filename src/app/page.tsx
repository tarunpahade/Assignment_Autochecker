"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function Home() {
  const { status } = useSession();
  const { data: session } = useSession();
  console.log(session);
  if (status === "unauthenticated") {
    redirect("/login");
  } else if (status === "authenticated"){
    redirect("/login");
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
      <div className="flex max-w-screen-xl flex-col space-y-12 p-8 ">
        <div className="flex flex-col space-y-6 ">
          <h1 className="font-cal text-3xl font-bold dark:text-white">
            Settings
          </h1>
          <form
           
            className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
          >
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
              <h2 className="font-cal text-xl dark:text-white">Name</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Your name on this app.
              </p>
              <input
                placeholder="Brendon Urie"
                className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                type="text"
                value={session?.user.name!}
                name="name"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Please use 32 characters maximum.
              </p>
              <button className="flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10 border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
                <p>Save Changes</p>
              </button>
            </div>
          </form>
          <form
            action="javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
            className="rounded-lg border border-stone-200 bg-white dark:border-stone-700 dark:bg-black"
          >
            <div className="relative flex flex-col space-y-4 p-5 sm:p-10">
              <h2 className="font-cal text-xl dark:text-white">Email</h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Your email on this app.
              </p>
              <input
                placeholder="panic@thedis.co"
                className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
                type="email"
                name="email"
              />
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 rounded-b-lg border-t border-stone-200 bg-stone-50 p-3 dark:border-stone-700 dark:bg-stone-800 sm:flex-row sm:justify-between sm:space-y-0 sm:px-10">
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Please enter a valid email.
              </p>
              <button className="flex h-8 w-32 items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none sm:h-10 border-black bg-black text-white hover:bg-white hover:text-black dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800">
                <p>Save Changes</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
