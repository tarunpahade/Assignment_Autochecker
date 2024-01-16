"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
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
          {userType === 'Teacher' ? (
            <div className='flex pl-3 pt-5'>
              <Input placeholder='Semester' className="mx-3" value={semester} onChange={(e) => { setSemester(e.target.value) }} />

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
          ) : null}

          <input
            type="file"
            placeholder='Uplaoad Image'
            accept="image/*"
            onChange={handleImageUpload}
            id="fileInput"
            className="ml-5 mt-7"
          />
        </div>
        <Button variant={'default'} onClick={uploadAttendance} className="bg-black text-white ml-5">
          {isLoadingAttendance ? (
            <>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </>
          ) : (
            <>
              Upload
            </>
          )}

        </Button>

      </form>
    </Form>
  )
}
