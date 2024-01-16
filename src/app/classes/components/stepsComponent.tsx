import { Input } from '@/components/ui/input'
import React from 'react'

export const StepsComponent = ({department,semester,setDepartment,setSemester}:any) => {
  return (
    <div className='flex justify-start pt-3 p-10'>
    <Input value={department} onChange={(text) => { setDepartment(text.target.value) }} placeholder='Enter Department Name' className='w-80' />
    <Input value={semester} onChange={(text) => { setSemester(JSON.parse(text.target.value)) }} placeholder='Enter Semester ' className='w-80 ml-5' type='number' />
  </div>
  )
}
