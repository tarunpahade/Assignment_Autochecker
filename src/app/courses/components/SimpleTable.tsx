import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation";


interface Problem {
    order: number;
    id: string;
    title: string; 
    difficulty: number;
    problemStatement: number,
    constraints: string,
    handlerFunction: string,
    starterCode: string
    starterFunctionName: string
    uploadedBy: string,
    completed: boolean
}
interface TableProps {
    data: Problem[]
}
export function TableDemo({ data }: TableProps) {
    console.log(data,'this is data table');
    const router=useRouter()
    return (
        <Table>
            <TableCaption>A list of Sample Problems.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                    <TableHead className="text-right">Completed</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {data && data.map((problem,key) => (
                    <TableRow key={key} onClick={()=>{
                        
                        
                    
                        // Construct the URL and navigate
                        router.push(`/problems/${problem.id}`);
                        
                      }}>
                        <TableCell className="font-medium">{key+1}</TableCell>
                        <TableCell>{problem.id}</TableCell>
                        <TableCell className="text-right">{problem.difficulty}</TableCell>

                        <TableCell className="text-right">{JSON.stringify(problem.completed)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            {/* <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter> */}
        </Table>
    )
}
