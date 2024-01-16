'use client'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import CreateClass from './components/createClass'
import axios from 'axios'
import { getCookies } from '@/lib/utils'
import { classProps } from '@/types/interface'
import { DrawerDemo } from './components/Drawer'


export default function Page() {

    const [classes, setClasses] = useState<any>([{
        createdBy: 'Admin',
        department: 'CSE',
        college: 'Dummy College',
        university: 'Dummy University',
        semester: 1,
        teacherCount: 5,
        studentCount: 6
        , _id: 12345
    }])
    const [userDetails, setUserDetails]: any = useState({
        college: 'Dummy College',
        department: 'CSE',
        university: 'Dummy University',
    })

    useEffect(() => {
        setUserDetails(getCookies('user-details'));
    }, []);

    const [showCreateClass, setShowCreateClass] = useState(false);
    const [showDrawer, setDrawer] = useState(false);
    const [drawerData, setDrawerData] = useState<classProps>()
    const handleCloseCreateClass = () => setShowCreateClass(false);

    const [loading, setLoading] = useState(true);
    const handleRowClick = (classItem: classProps) => {
        setDrawerData(classItem)
        setDrawer((prev => !prev))

    }
    useEffect(() => {
        const findClass = async () => {

            try {
                const response = await axios.post('/api/admin/findClassByCollege', {
                    college: userDetails.college,
                    department: userDetails.department
                });
                setLoading(false)
                setClasses(response.data)
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        findClass();
    }, [userDetails.college, userDetails.department]);

    const addClass = (newClass: classProps) => {
        setClasses((currentClasses: any) => [...currentClasses, newClass]);
    };


    return (
        <div>
            <div className="flex justify-between w-[90%]">

                <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-5 ml-4 ">Manage Classes</h1>
                <Button variant='default' className='bg-black text-white' onClick={() => setShowCreateClass(true)}>Add Class</Button>

            </div>
            <div className=" max-w-screen-lg px-4  h-[530px] overflow-y-auto justify-center align-middle">
                <div className="flex flex-col">

                    <Table>
                        <TableCaption>Class Information</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Semester</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Total Teachers</TableHead>
                                <TableHead>Total Students</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>

                            {classes.map((classItem: classProps, index: any) => (

                                <>
                                    {loading == true ? (
                                        <TableRow>
                                            <TableCell rowSpan={5} >Loading...</TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow onClick={() => {
                                            handleRowClick(classItem)
                                        }} key={index}>
                                            <TableCell>
                                                {classItem.semester}
                                            </TableCell>
                                            <TableCell>{classItem.department}</TableCell>
                                            <TableCell>{classItem.teacherCount}</TableCell>
                                            <TableCell>{classItem.studentCount}</TableCell>
                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>

                    </Table>
                    {classes.length === 0 && (
                        (<>No Classes found. Create a new Class.</>)
                    )
                    }
                    {showDrawer && <DrawerDemo drawerData={drawerData!} open={showDrawer} college={userDetails.college} />}

                    {showCreateClass && <CreateClass addClass={addClass} onClose={handleCloseCreateClass} />}

                </div>
            </div>
        </div>
    )
}