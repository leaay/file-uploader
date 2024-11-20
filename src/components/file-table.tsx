"use client"
 
import {ColumnDef,flexRender,getCoreRowModel,Row,useReactTable,} from "@tanstack/react-table"
 
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table"
 
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

 
export function DataTable<TData, TValue>({columns,data}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


  

  function test(item:Row<TData>){

    console.log(item.original)

  }

 
  return (
    <div className="rounded-md border w-11/12 mb-4 ">
      <Table>
        <TableHeader className="bg-purple-100 text-base font-extrabold">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="fo" key={headerGroup.id}>
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
              
              <TableRow className="hover:bg-purple-200" key={row.id} data-state={row.getIsSelected() && "selected"} onClick={()=>test(table.getRow(row.id))}>
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}