'use client'
import React, { useEffect, useState } from 'react'
import { Overview } from "@/app/dashboard/components/overview"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import {
  Command,
  CommandGroup,
  CommandItem
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { cn, getCookies } from '@/lib/utils'
import axios from 'axios'


const Page = () => {
  const [reportsData, setReportsData]: any = useState([]);
  const [classes, setClasses]: any = useState([]);
  const [usersList, setUsersList]: any = useState([]);

  const [listOfUsers, setlistOfUsers]: any = useState([]);
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState('')

  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = React.useState('')
  const [isLoading, setIsLoading] = useState(true);

  const [overviewDetails, setOverviewDetails]: any = useState([]);



  useEffect(() => {
    const userDetailsFromCookie = getCookies('user-details');
    // if (userDetailsFromCookie) {
    //   setUserDetails(userDetailsFromCookie);
    // }
    fetchReportsData(userDetailsFromCookie)
  }, [])
  const fetchReportsData = async (userDetails: any) => {
    try {

      setIsLoading(true);
      const response = await axios.post('/api/teacher/reports', { username: userDetails.name, college: userDetails.college, university: userDetails.university });
      const allUsers = response.data.users

      const filteredUsersBySem = allUsers.filter((x: any) => x.semester === response.data.classList[0].semester)
      const filteredUsersByDepartment = filteredUsersBySem.filter((x: any) => x.department === response.data.classList[0].department)
      const data: any = [];
      // Extracting the month from dateUploaded
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      

      response.data.assignments.forEach((x: any) => {
        const date = new Date(x.dateUploaded);
        const monthName = monthNames[date.getMonth()];
      
        if (!data[monthName]) {
          // If the month is not in the data object, add it with the current completedCount
          data[monthName] = x.completedCount;
        } else {
          // If the month is already in the data object, add the current completedCount to the existing total
          data[monthName] += x.completedCount;
        }
      });
      
      // Convert the data object into an array of the desired format
      const overviewDetails = Object.keys(data).map(month => {
        return {
          name: month,
          total: data[month],
        };
      });
      
      console.log(overviewDetails);
      
      setOverviewDetails(overviewDetails);
      
      
      console.log(data);

      setlistOfUsers(filteredUsersByDepartment)
      setClasses(response.data.classList);

      setReportsData(response.data.assignments);

      setValue2(response.data.classList[0].department + '-' + response.data.classList[0].semester)
      setUsersList(response.data.assignments[0].completedBy)

      setValue(response.data.assignments[0].assignmentName)




      setIsLoading(false);
    } catch (error) {
      console.error('There was an error fetching the reports data:', error);
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl">
          <div>
            <h1 className={`text-2xl mb-5 font-bold tracking-tight`}>
              Reports
            </h1>
            <Popover open={open2} onOpenChange={setOpen2}>
              <PopoverTrigger asChild className='relative top-[-8px] left-10'>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open2}
                  className="w-[200px] justify-between"
                >
                  {value2}
                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandGroup>
                    {classes.map((framework: any, index: number) => (
                      <CommandItem
                        key={index}
                        value={framework.department + '-' + framework.semester}
                        onSelect={(currentValue: any) => {
                          setValue2(currentValue === value2 ? "" : currentValue)
                          setOpen2(false)
                        }}
                        className='bg-white'
                      >
                        {framework.department + '-' + framework.semester}
                        <CheckIcon
                          className={cn(
                            "ml-auto h-4 w-4",
                            value2 === framework.department + '-' + framework.semester ? "opacity-100" : "opacity-0"
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
            <div className="flex w-full">
              <div className="w-[100%] flex   gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="w-[85%] col-span-4">
                  <CardHeader>
                    <CardTitle>Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="pl-2">
                    <Overview data={overviewDetails} />
                  </CardContent>
                </Card>
                <Card className="w-[85%] col-span-4 ">
                  <CardHeader className='flex justify-between flex-row w-[80%]'>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-fit justify-between"
                        >
                          {value}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandGroup>
                            {reportsData.map((framework: any) => (
                              <CommandItem
                                key={framework.assignmentName}
                                value={framework.assignmentName}
                                onSelect={(currentValue: any) => {
                                  setValue(currentValue)
                                  setOpen(false)
                                  console.log(currentValue, reportsData);
                                  setUsersList(framework.completedBy);
                                }}

                                className='bg-white bg:hover'
                              >
                                {framework.assignmentName}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === framework.assignmentName ? "opacity-100" : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </CardHeader>
                  <CardContent className="pl-2 ">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead >Sr. No</TableHead>
                          <TableHead className="w-[350px]">Name</TableHead>
                          <TableHead>Roll No.</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {usersList ? (
                          usersList.map((x: any, index: number) => (
                            <TableRow key={index}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell>{x.name}</TableCell>
                              <TableCell>{x.rollno}</TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={3} style={{ textAlign: 'center' }}>
                              User list does not exist
                            </TableCell>
                          </TableRow>
                        )}

                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
export default Page