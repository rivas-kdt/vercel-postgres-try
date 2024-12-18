import React from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from 'lucide-react'

export function DateRangePicker({ date = {}, setDate }) {
  return (
    <div className="flex items-center space-x-2">
      <DatePicker
        selectsRange={true}
        startDate={date?.from}
        endDate={date?.to}
        onChange={(update) => {
          setDate({ from: update[0], to: update[1] })
        }}
        customInput={
          <Button variant="outline" className="w-[225px] justify-start text-left font-normal bg-amber-400 text-black focus:bg-amber-300 focus:text-black">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {date && date.from ? (
              date.to ? (
                <>
                  {date.from.toLocaleDateString()} - {date.to.toLocaleDateString()}
                </>
              ) : (
                date.from.toLocaleDateString()
              )
            ) : (
              <span>Pick a date range</span>
            )}
          </Button>
        }
      />
    </div>
  )
}

