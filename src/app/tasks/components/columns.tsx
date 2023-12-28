

import { ColumnDef } from "@tanstack/react-table"
import { labels, difficulies, statuses } from "../data/data"
import { Task } from "../data/schema"
import { DataTableColumnHeader } from "./data-table-column-header"


export const columns: ColumnDef<Task>[] = [
  
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {

      return (
        <div className="flex space-x-2 cursor-pointer">
          
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      )
    },
  },
  {
    accessorKey: "markedAs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Marked As" />
    ),
    cell: ({ row }) => {
      
const statuseses :string= row.getValue("markedAs")
if(!statuseses){
  return (
    <div className="flex w-[100px] items-center">
          
          <span>Pending</span>
        </div>
  )
}
      

      return (
        <div className="flex w-[100px] items-center">
          
          <span>Done</span>
        </div>
      )
    },
    // filterFn: (row, id, value) => {
    //   return value.includes(row.getValue(id))
    // },
  },
  // {
  //   accessorKey: "difficulty",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="difficulty" />
  //   ),
  //   cell: ({ row }) => {

  //     const difficulty = difficulies.find(
  //       (d) => d.value === row.getValue("difficulty")
  //     );
  //     if (!difficulty) {
  //       // Return a default value or handle the undefined case
  //       return <span>Unknown</span>;
  //     }
  
  //     return (
  //       <div className="flex items-center">
  //         {difficulty.icon && (
  //           <difficulty.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{difficulty.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // }
  
]