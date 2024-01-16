'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useState } from 'react';
import { Button } from 'react-day-picker';

export const AssignmentsList: React.FC<any> = ({ data, userType, handleSubmit }) => {
    const [imageData, setImageData] = useState('')
    const uploadImage = async (e: any) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = async (event: any) => {
                console.log(event.target.result, 'this is the result');
                setImageData(event.target.result)
                // const awsS3link:any = await uploadBase64Image(event.target.result);
                // setImageUrl(awsS3link)
            };
            reader.readAsDataURL(file);
        }


    }
    return (
        <ul className='myComponent' role="list" >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Sr. No</TableHead>
                        <TableHead >Name</TableHead>
                        <TableHead>Submission Date</TableHead>

                        


                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((person: any, index: number) => (
                        <TableRow key={index}>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {person.name}
                            </TableCell>
                            <TableCell>
                                {person.submissionDate}
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ul>

    )
}
