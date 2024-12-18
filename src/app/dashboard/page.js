"use client";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { useState } from "react";

export default function Dashboard() {
  const [dateRange, setDateRange] = useState();
  console.log(dateRange);
  let formattedFrom, formattedFrom2
  if (dateRange) {
    const try2 = dateRange.from;
    formattedFrom = format(new Date(try2), "MM/dd/yyyy");
    const try3 = dateRange.to;
    formattedFrom2 = format(new Date(try3), "MM/dd/yyyy");
  }
  console.log({from: formattedFrom, to: formattedFrom2});
  return (
    <div className="flex flex-col h-full px-2 py-4">
      <div className="flex items-center justify-end mb-2">
        <DateRangePicker date={dateRange} setDate={setDateRange} />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-2 text-amber-400">
        <div className=" h-[100px] rounded-lg bg-gray-700 p-2">
          <p className="text-lg font-bold">Ink</p>
          <p className="w-full text-3xl font-bold text-center">12,402</p>
        </div>
        <div className=" h-[100px] rounded-lg bg-gray-700 p-2">
          <p className="text-lg font-bold">Exp</p>
          <p className="w-full text-3xl font-bold text-center">12,402</p>
        </div>
      </div>
      <div className="flex-grow w-full p-2 bg-gray-700 rounded-lg">
        <Table>
          <TableHeader>
            <TableRow className="text-lg text-black bg-amber-400">
              <TableHead className="rounded-tl-lg ">Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="rounded-tr-lg ">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="text-lg">
              <TableCell>12</TableCell>
              <TableCell>12312</TableCell>
              <TableCell>INC</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
