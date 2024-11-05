"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { FileImage, FileText, Image, ImagePlay, Star } from "lucide-react";
import {Tooltip,TooltipContent,TooltipTrigger} from "@/components/ui/tooltip"
import FileCardActionMenu from "./fileCardActionMenu";
import { Doc } from "../../convex/_generated/dataModel";


 
type FileTypes = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";

interface ExtendedFile extends Doc<'files'> {
  url: string | null;
}


export const columns: ColumnDef<ExtendedFile>[] = [
  {
    accessorKey: "name",
    header: "File Name",
    cell:({row})=>{

      const fileName : string = row.getValue("name")

      return <Tooltip>
                  <TooltipTrigger>
                    <div  className={` max-w-32 md:max-w truncate flex items-center`}>{fileName}</div></TooltipTrigger>
                  <TooltipContent className="max-w-96">{fileName}</TooltipContent>
             </Tooltip>
    },
  },
  {
    accessorKey: "fileType",
    header: "Type",
    cell:({row})=>{

      const FileType = row.getValue("fileType") as FileTypes
      let simplifyiedType : string
      let helperIcon : JSX.Element
      switch (FileType) {
        case "image/png":
        case "image/jpeg":
          simplifyiedType = "Image"
          helperIcon = <Image />
          break;
        case "image/svg+xml":
          simplifyiedType = "SVG";
          helperIcon = <FileImage />
          break;
        case "application/pdf":
          simplifyiedType = 'PDF';
          helperIcon = <FileText />
          break;
        case "image/gif":
          simplifyiedType = "GIF"
          helperIcon = <ImagePlay />
          break
      }

      return <div className="flex items-center gap-2">{helperIcon}{simplifyiedType} </div>

    }
  },
  {
    accessorKey: "isFavourite",
    header: "Favorite",
    cell:({row})=>{
      const isFav = row.getValue('isFavourite')

      return <div>{isFav ? <Star fill="true" /> : <Star />}</div>

    }
  },
  {
    accessorKey: "_creationTime",
    header:"Created",
    cell:({row})=>{

      const added = new Date(row.getValue("_creationTime"))

      return <div>{added.toDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      
      console.log(row.original as ExtendedFile)
 
      return (
        <FileCardActionMenu file={row.original} />
      )
    },
  },
]
