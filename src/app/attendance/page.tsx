"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { CalendarForm } from './components/Calander'
import Tesseract from 'tesseract.js';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Input } from '@/components/ui/input';
import { Edit, Save, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import axios from 'axios';
import { attendance } from '@/types/interface';
import { getCookies } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { toast } from "@/components/ui/use-toast"


const Page = () => {
  const [editName, setEditName] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingAttendance, setIsLoadingAttendance] = useState(false);
  const [showTable, setshowTable] = useState(true);

  const [text2, setText] = useState('');
  const [classDetails, setClassDetails] = useState<any>()

  const [semester, setSemester] = useState<any>(2);
  const [userDetails, setUserDetails]: any = useState({
    college: 'Dummy College',
    department: 'CSE',
    university: 'Dummy University',
  })

  useEffect(() => {
    setUserDetails(getCookies('user-details'));
  }, []);



  const handleImageUpload = (event: { target: { files: any[]; }; }) => {
    setIsLoading(true);
    setshowTable(true);

    const imageFile = event.target.files[0];

    Tesseract.recognize(
      imageFile,
      'eng',
      {
        logger: m => console.log(m),
      }
    ).then(({ data: { text } }) => {
      setText(text)
      const namesArray = text.trim().split(/\s+/);
      const users = [];

      for (let i = 0; i < namesArray.length; i += 3) {
        const name = namesArray.slice(i, i + 3).join(' ');
        users.push({
          "name": name,
          // "rollno": "1"
        });
      }

      setClassDetails(users);
      setIsLoading(false);
    })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  };

  const handleEditClick = (index: SetStateAction<null>, name: SetStateAction<string>) => {
    setEditIndex(index);
    setEditName(name);
  };

  const handleSaveClick = (index: any) => {
    if (editIndex !== null && editName) {
      const updatedDetails = [...classDetails];
      updatedDetails[index] = { ...updatedDetails[index], name: editName };
      setClassDetails(updatedDetails);
      setEditIndex(null); // Reset edit index
    }
  };

  const handleDeleteClick = (index: any) => {
    const updatedDetails = classDetails.filter((_: any, i: any) => i !== index);
    setClassDetails(updatedDetails);
  };
  const uploadAttendance = async (date: any) => {
  console.log(date,'This is date');
  
    try {
      if (classDetails == null) {
        alert('Please Upload Files First')
        return;
      }
      setIsLoadingAttendance(true)
      let data: attendance = {
        date: date,
        userDetails: classDetails,
        semester: userDetails.semester,
        college: userDetails.college,
        university: userDetails.university,
        userType: 'Teacher'
      }
      if (userDetails.userType === 'Teacher') {
        data.userType = 'Student'
      }
      const response = await axios.post('/api/admin/uploadAttendance', data);
      console.log(response.data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{date}</code>
          </pre>
        ),
      })
      setIsLoadingAttendance(false)
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };



  return (
    <div className='w-full h-[100%] p-5 pl-0.5 '>
      <p className='p-5  text1'>Attendance</p>
      <div className='w-full pl-5 pt-5 '>
        <CalendarForm isLoadingAttendance={isLoadingAttendance} userType={userDetails.userType} showTable={showTable} handleImageUpload={handleImageUpload} uploadAttendance={uploadAttendance} semester={semester!} setSemester={setSemester} />
        <div className='flex justify-start pt-3 p-10'>
          {isLoading ? 'Processing...' : null}
        </div>
        {showTable ? (
          <ScrollArea className="h-96 w-[100%]  rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead >Sr. No</TableHead>
                  <TableHead className="w-[350px]">Name</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classDetails && classDetails.map((detail: any, index: any) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>
                      {editIndex === index ? (
                        <Input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                        />
                      ) : (
                        detail.name
                      )}
                    </TableCell>
                    <TableCell>{detail.rollno}</TableCell>

                    <TableCell className='grid-cols-2 gap-2'>
                      {editIndex === index ? (
                        <Button onClick={() => handleSaveClick(index)} variant={'secondary'}>
                          <Save size={16} />
                        </Button>
                      ) : (
                        <Button onClick={() => handleEditClick(index, detail.name)} variant={'secondary'}>
                          <Edit size={16} />
                        </Button>
                      )}
                      <Button onClick={() => handleDeleteClick(index)} variant={'secondary'}>
                        <Trash size={16} />

                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

          </ScrollArea>
        ) : null
        }
        <Toaster />

      </div>
    </div>

  )
}
export default Page