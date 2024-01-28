'use client'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useRouter } from 'next/navigation';

export const AssignmentsList: React.FC<any> = ({ data, userType, handleSubmit, onclick }) => {
    const router= useRouter()
    
    return (
        <ul className='myComponent' role="list" >
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead >Sr. No</TableHead>
                        <TableHead >Name</TableHead>
                        <TableHead>Date Submission</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((person: any, index: number) => (
                        <TableRow onClick={()=>{
                            router.push(`/assignments/${person._id}`)
                        }} key={index}>
                            <TableCell>
                                {index + 1}
                            </TableCell>
                            <TableCell>
                                {person.name}
                            </TableCell>
                            <TableCell>
                                {person.submissionDate}
                            </TableCell>
                            <TableCell>
                            {JSON.stringify(person.complete == null ? false : true)}

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </ul>

    )
}
