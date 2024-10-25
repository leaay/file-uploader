"use client"
 
import { ColumnDef } from "@tanstack/react-table"
 
type FileTypes = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";

export type File = {
    name: string;
    ownerID: string;
    fileID: string; 
    fileType: FileTypes;
    isFavourite: boolean;
    
}


export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "File Name",
  },
  {
    accessorKey: "fileType",
    header: "Type",
  },
  {
    accessorKey: "isFavourite",
    header: "Favorite",
  },
]