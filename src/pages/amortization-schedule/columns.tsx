"use client"

import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"

import { ArrowUpDown } from "lucide-react"


export type Payment = {
  id: string
  dueDate: string
  amount: string
  interest: string
  principal: string
  remainingBalance: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "Payment Number",
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Due Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "interest",
    header: "Interest",
  },
  {
    accessorKey: "principal",
    header: "Principal",
  },
  {
    accessorKey: "remainingBalance",
    header: "Remaining Balance",
  },
]
