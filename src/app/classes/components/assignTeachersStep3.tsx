import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {  Plus } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { DialogDemo } from './dialog';

interface AssignTeacherProps {
  college: any;
  university: any;
  department: any;
  teachersAssignedToClass: any;
  setTeachersAssignedToClass: any;
  semester: number
}
export interface TeacherProps {
  _id?: any,
  name: string,
  rollno?: number,
  semester: number,
  college: string,
  university: string,
  userType: string,
  password: string,
  department: string,
  subject: string
}
export const AssignTeachersStep3 = ({ college, university,semester, department,teachersAssignedToClass, setTeachersAssignedToClass }: AssignTeacherProps) => {
  const [teacherList, setTeacherList] = useState<TeacherProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingNewTeacher, setloadingNewTeacher] = useState(false);

  const [open, setOpen] = useState(false);
  const close = () => {
    setOpen(false)
  }
  useEffect(() => {
    const findTeachers = async () => {

      try {
        const response = await axios.post('/api/admin/getUsersByUserType', {
          college: college,
          userType: 'Teacher'
        });
        setLoading(false)
        setTeacherList(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    findTeachers();
  }, [college, university]);

  const handleAddTeacher = (teacher: any) => {
    setTeachersAssignedToClass((prev: any) => [...prev, teacher]);
  };

  const handleRemoveTeacher = (index: number) => {
    setTeachersAssignedToClass((prev: any[]) => prev.filter((_, i) => i !== index));
  };
  const handleNewTeacher = async ({ name, subject }:any) => {
    try {
      setloadingNewTeacher(true)
      const userDetails:TeacherProps = {
        name,
        password: '54321',
        subject,
        semester,
        department,
        college,
        university,
        userType: 'Teacher'
      }
      const response = await axios.post('/api/users/signup', userDetails);
      console.log(response.data);
      if (response.data.success) {
        handleAddTeacher(userDetails)
        setOpen(false)
        console.log('Successfully added teacher');

      }
    } catch (error: any) {
      console.error('Error during user signup:', error.response?.data || error.message);
      throw error;
    }
  }

  return (
    <div className='justify-start pt-3 p-10'>
      <div className="flex justify-between w-full">
        <h1>Teachers assigned to this class</h1>
        <Button size={'sm'} variant={'outline'} onClick={() => setOpen(true)}>Add Teacher</Button>
      </div>

      {teachersAssignedToClass.length === 0 ? (
        <p>No Teacher Added Yet</p>
      ) : (
        teachersAssignedToClass.map((teacher: any, index: number) => (
          <div className="px-3 py-2 mt-2 flex items-center justify-between rounded-md bg-white w-full shadow-sm ring-1 ring-slate-700/10 text-black" key={index}>
            {teacher.name}
            <p>{teacher.subject}</p>
            <button className='rounded-lg' onClick={() => handleRemoveTeacher(index)}>
            &times; 
            </button>
          </div>
        ))
      )}
      <Separator className="my-4" />
      <h1>List Of Teachers</h1>
      {teacherList.length === 0 ? (
        loading ? (<p>Loading.......</p>) : (<p>No Teacher found. Add a new teacher.</p>)

      ) : (
        teacherList.map((teacher: any, index: number) => (
          <div className="px-3 py-2 mt-2 flex items-center justify-between rounded-md bg-white w-full shadow-sm ring-1 ring-slate-700/10 text-black" key={index}>
            {teacher.name}
            <p>{teacher.subject}</p>
            <button className='rounded-lg' onClick={() => handleAddTeacher(teacher)}>
              <Plus />
            </button>
          </div>
        ))
      )}
      <DialogDemo loadingNewTeacher={loadingNewTeacher} addTeacher={handleNewTeacher} open={open} close={close} />
    </div>
  );
};
