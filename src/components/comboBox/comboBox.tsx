"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { problems } from "@/utils/javascript"
interface DataArray {
  value: string;
  label: string;
}

interface ComboboxDemoProps {
  frameworks: DataArray[];
  value: string
  setValue: any;
  placeholder: string;
  handleChange: any;
  bg: string
}

export function ComboboxDemo({ frameworks, value, setValue, placeholder, handleChange,bg }: ComboboxDemoProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover  open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`text-xs  text-label-2 ${bg}`}
          role="combobox"
          aria-expanded={open}
        //   className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          {/* <CommandInput placeholder="Search framework..." /> */}
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                className={bg}
                value={framework.value}
                onSelect={(currentValue) => {


                  setValue(currentValue === value ? "" : currentValue)
                  console.log(value, 'this is vbalue', currentValue);
                  handleChange(currentValue)
                  setOpen(false)

                }}

              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
