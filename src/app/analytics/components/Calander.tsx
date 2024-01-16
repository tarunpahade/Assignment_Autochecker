"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from "@/components/ui/input"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useState } from "react"


const FormSchema = z.object({
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
})
interface CalanderProps {
  handleImageUpload: any,
  showTable: boolean,
  uploadAttendance: any,
  userType: string,
  semester: number,
  setSemester: any,
  isLoadingAttendance: boolean
}
export function CalendarForm({ isLoadingAttendance, handleImageUpload, uploadAttendance, userType, semester, setSemester }: CalanderProps) {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })
  const [selectedValue, setSelectedValue] = useState();

  // Function to handle the change in selection
  const handleSelectChange = (value: any) => {
    
    
    setSelectedValue(value);

  };



  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(JSON.stringify(data, null, 2), data);

    await uploadAttendance(JSON.stringify(data.dob, null, 2))
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        //uploadAttendance(JSON.stringify(data, null, 2)
        className="space-y-6 flex justify-between ">
        <div className="flex ">
          <div className="flex mt-4 mr-7 ">
            <Button variant="outline" size="icon">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <p className="p-4 pt-2 ">
              Semester 1
            </p>
            <Button variant="outline" size="icon">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {selectedValue === 2 && (
            <FormField
              control={form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="flex flex-col">

                  <FormLabel>Date </FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>

                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")

                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        className="bg-white"
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

          )}
          <div className='flex pl-3 pt-5'>

            <Select value={selectedValue} onValueChange={handleSelectChange} >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Choose One Metric" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>

                  <SelectItem value="1">Assignement</SelectItem>
                  <SelectItem value="2">Attendance</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className='flex pl-3 pt-5'>

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Search Department " />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>

                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

          </div>


        </div>
        <Button variant={'default'} onClick={uploadAttendance} className="bg-black text-white ml-5">
          {isLoadingAttendance ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              Search
            </>
          )}

        </Button>

      </form>
    </Form>
  )
}
