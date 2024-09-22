"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TUser } from "@/app/api/(types)/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

type User = Omit<TUser, 'password'>
export const usersColumns: ColumnDef<User>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  
]
