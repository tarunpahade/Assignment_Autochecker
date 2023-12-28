import SideNav from '@/components/teacher/directory/Nav'
import MainDashboard from '@/components/teacher/directory/profile'
import React from 'react'

const Directory = () => {
    return (
        <div className='w-full mx-auto h-screen flex overflow-hidden bg-black absolute top-0'>
            <SideNav />
            <MainDashboard  />
        </div>
    )
}
export default Directory