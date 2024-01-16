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
import { assignments } from '@/types/interface'
// First Assignment
const frameworks = [
  {
    value: "First Assignment",
    label: "Assignment 1"
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]
const frameworks2 = [
  {
    value: "NexT",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

const Page = () => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = React.useState("")
  const [open2, setOpen2] = useState(false)
  const [value2, setValue2] = React.useState("")
  const [reportsData, setReportsData]: any = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userDetails, setUserDetails]: any = useState({
    college: 'Dummy College',
    department: 'CSE',
    university: 'Dummy University',
})

useEffect(() => {
    setUserDetails(getCookies('user-details'));
}, []);

  // Function to fetch reports data
  const fetchReportsData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post('/api/teacher/reports',{username: userDetails.name}); // Update with your actual API endpoint
      console.log(response.data);
      setReportsData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('There was an error fetching the reports data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading reports...</div>;
  }

  return (
    <>
      <main>
        <div className="mx-auto max-w-6xl">
          <div >
            <h1 className={`text-2xl mb-5 font-bold tracking-tight`}>
              Reports
            </h1>
            <Popover open={open2} onOpenChange={setOpen2}>
                      <PopoverTrigger asChild className='relative top-[-8px] left-10'>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-[200px] justify-between"
                        >
                          {value
                            ? frameworks.find((framework) => framework.value === value)?.label
                            : "Select Class"}
                          {/* {frameworks.find((framework) => framework.value === value)?.label || frameworks[0].value} */}

                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandGroup>
                            {frameworks.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setValue(currentValue === value ? "" : currentValue)
                                  setOpen(false)
                                }}
                                className='bg-white'
                              >
                                {framework.label}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === framework.value ? "opacity-100" : "opacity-0"
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
                    <Overview />
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
                          
                          {reportsData[0].assignmentName}
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
                                onSelect={(currentValue) => {
                                  setValue2(currentValue === value ? "" : currentValue)
                                  setOpen2(false)
                                }}
                                className='bg-white'
                              >
                                {framework.assignmentName}
                                {/* <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    value === framework. ? "opacity-100" : "opacity-0"
                                  )}
                                /> */}
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
                        {/* {classDetails && classDetails.map((detail: any, index: any) => ( */}
                        <TableRow >
                          <TableCell>1</TableCell>
                          <TableCell>Tarun Pahade</TableCell>
                          <TableCell>12345</TableCell>

                        </TableRow>
                        {/* ))} */}
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