'use client'
import React from "react";

const Intro = ({ subjects, onClick }: any) => {
   

    return (

        <div className="rounded-lg border bg-background p-8">
            <h1 className="mb-2 text-lg font-semibold">
                Welcome to Educator.AI Assistant!
            </h1>

            <p className="leading-normal text-muted-foreground">
                Get Started With What Subject You might wanna Learn About
            </p>
            <div className="mt-4 flex flex-col items-start space-y-2">
                {subjects.map((x: string) => (
                    <button
                        key={x}
                        id={x}
                        onClick={onClick}
                        className="inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary underline-offset-4 shadow-none hover:underline h-auto p-0 text-base"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 256 256"
                            fill="currentColor"
                            className="h-4 w-4 mr-2 text-muted-foreground"
                        >
                            <path d="m221.66 133.66-72 72a8 8 0 0 1-11.32-11.32L196.69 136H40a8 8 0 0 1 0-16h156.69l-58.35-58.34a8 8 0 0 1 11.32-11.32l72 72a8 8 0 0 1 0 11.32Z"></path>
                        </svg>
                        {x}
                    </button>
                ))}
                
            </div>
        </div>

    );
};
export default Intro;
