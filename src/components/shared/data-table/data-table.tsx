"use client"
import {
    ColumnDef,
    flexRender,
    ColumnFiltersState,
    getFilteredRowModel,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { Filter } from "lucide-react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [globalFilter, setGlobalFilter] = useState<any>([])
    const [inputText, setInputText] = useState<string>("")
    const table = useReactTable({
        data,
        columns,
        // onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4 w-full justify-between">
                <h1 className="text-md font-medium text-foreground">{data.length} Usuários encontrados.</h1>
                <Input
                    placeholder="Filtrar globalmente..."
                    value={globalFilter}
                    onChange={(event) => {
                        table.setGlobalFilter(String(event.target.value))
                        setInputText(event.target.value)
                    }}
                    className="min-w-[300px] w-full bg-card border-border"
                    icon={Filter}
                    iconStyle="w-5 h-5 text-muted-foreground"
                />
            </div>
            <div className="rounded-md border bg-card/30">
                <Table className="rounded-md">
                    <TableHeader className="bg-card rounded-md">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Nenhum resultado encontrado.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
