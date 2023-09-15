'use client'
import React, { useState } from 'react'
import { Form } from './form';



export const Popup = ({close,getFormDetailsAndAppendData}: any) => {
    const [forms, setForm] = useState(false)
    
    const closeForm = () => {
      
        setForm(false)
    }

    return (



        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="pointer-events-auto  relative z-10 w-[70%] rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-700 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
               
                    <div className='bg-white '>

                        <Form getFormDetailsAndAppendData={getFormDetailsAndAppendData} closeForm={close} />
                    </div>
              
            </div>
        </div>

    )
}