"use client";

import {ColumnDef,flexRender,getCoreRowModel,Row,useReactTable,} from "@tanstack/react-table";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "@/components/ui/table";
import { Doc } from "../../convex/_generated/dataModel";

type SelectedFile = Pick<Doc<"files">, "_id" | "fileID">;

interface DataTableProps<TData extends SelectedFile, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedItems: SelectedFile[];
  setSelectedItems: React.Dispatch<React.SetStateAction<SelectedFile[]>>;
}

export function DataTable<TData extends SelectedFile, TValue>({
  columns,
  data,
  setSelectedItems,
  selectedItems,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable<TData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });


  const isFileSelected = (id: SelectedFile["_id"]) =>
    selectedItems.some((item) => item._id === id);

  function handleRowClick(row: Row<TData>) {
    const { _id, fileID } = row.original;

    setSelectedItems((prev) =>
      prev.some((item) => item._id === _id)
        ? prev.filter((item) => item._id !== _id)
        : [...prev, { _id, fileID }]
    );
  }

  return (
    <div className="rounded-md border w-11/12 mb-4">
      <Table>
        <TableHeader className="bg-purple-100 text-base font-extrabold">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className={`hover:bg-purple-200 cursor-pointer ${isFileSelected(row.original._id) ? "bg-purple-300 outline-2 outline-purple-400" : "bg-white outline-0 outline-white"}`}
                data-state={row.getIsSelected() && "selected"}
                onClick={selectedItems.length > 0 ? () => handleRowClick(row) : undefined}
                onDoubleClick={selectedItems.length === 0 ? () => handleRowClick(row) : undefined}
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
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}