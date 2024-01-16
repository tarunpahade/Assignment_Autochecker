import * as React from "react"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer"
import axios from "axios"
import { SignUp, classProps } from "@/types/interface"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect, useState } from "react"

interface DrawerData {
    open: boolean,
    drawerData: classProps,
    college: string
}
export function DrawerDemo({ open, drawerData, college }: DrawerData) {
    const [loading, setLoading] = useState(true)
    const [students, setStudents] = useState<SignUp[]>()

    useEffect(() => {
        const findTeachers = async () => {
            try {
                const response = await axios.post('/api/admin/getUsersByUserType', {
                    college: college,
                    userType: 'Student'
                });

                setLoading(false)
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching teachers:', error);
            }
        };

        findTeachers();
    }, [college]);

    return (
        <Drawer open={open}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Semester {drawerData!.semester}</DrawerTitle>
                        <DrawerDescription>Department {drawerData!.department}</DrawerDescription>
                    </DrawerHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Subject</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {drawerData.teachers.map((x: SignUp, index: number) => (
                                <>
                                    {loading == true ? (
                                        <TableRow>
                                            <TableCell rowSpan={5} >Loading...</TableCell>
                                        </TableRow>
                                    ) : (
                                        <TableRow onClick={() => {

                                        }} key={index}>
                                            <TableCell>
                                                {x.name}
                                            </TableCell>
                                            <TableCell>{x.department}</TableCell>
                                            <TableCell>{x.subject}</TableCell>

                                        </TableRow>
                                    )}
                                </>
                            ))}
                        </TableBody>
                    </Table>
                    <p id="radix-:r2:" className="text-sm text-slate-500 text-center mt-5 dark:text-slate-400">Student List</p>

                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>

                                {/* <TableHead>Subject</TableHead> */}
                            </TableRow>
                        </TableHeader>
                        <ScrollArea className="h-72  rounded-md border">

                            {loading == true ? (

                                <p  >Loading...</p>

                            ) : (
                                students!.map((x: SignUp, index: number) => (

                                    <>
                                        <TableRow key={index}>
                                            <TableCell>
                                                {x.name}
                                            </TableCell>
                                            <TableCell>{x.rollno}</TableCell>
                                            <TableCell>{x.subject}</TableCell>

                                        </TableRow>

                                    </>

                                ))

                            )}
                        </ScrollArea>
                    </Table>

                </div>
            </DrawerContent>
        </Drawer>
    )
}
