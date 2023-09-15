'use client'
import { useState, useEffect } from 'react';

const Page2 = () => {

  const fakeApiResponse = localStorage.getItem('result')!;

  return (
    <div className="flex h-full flex-col w-[80%] m-[10%] mt-5  py-6 shadow-xl">
    <div className="px-4 sm:px-6">
    <div className="p-4 space-y-4">
      <div className="flex items-center space-x-2">
        <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
        <p className=" font-medium">ChatGPT:</p>
      </div>

      {/* Apply blur effect while loading */}
      <div
        className={`transition-all duration-500 ease-in-out`}
      >
        <div className="space-y-2 ">
          {fakeApiResponse}
        This is the response
        </div>
      </div>
    </div>
    
    </div>
    </div>
  );
};

export default Page2;
