"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import {Tooltip,TooltipContent,TooltipTrigger} from "@/components/ui/tooltip"
import FileCardActionMenu from "./fileCardActionMenu";
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";
import { Star } from "lucide-react";

 
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
      // let simplifyiedType : string
      let helperIcon : JSX.Element
      switch (FileType) {
        case "image/png":
          // simplifyiedType = "png"
          helperIcon = <Image alt="type" src={'png.svg'} width={33} height={33} />
          break;
        case "image/jpeg":
          // simplifyiedType = "jpg"
          helperIcon = <Image alt="type" src={'jpeg.svg'} width={33} height={33} />
          break;
        case "image/svg+xml":
          // simplifyiedType = "svg";
          helperIcon = <Image alt="type" src={'svg.svg'} width={33} height={33} />
          break;
        case "application/pdf":
          // simplifyiedType = 'pdf';
          helperIcon = <Image alt="type" src={'pdf.svg'}width={33} height={33} />
          break;
        case "image/gif":
          // simplifyiedType = "gif"
          helperIcon = <Image alt="type" src={'gif.svg'}width={33} height={33} />
          break
      }

      return <div className="flex items-center gap-2">{helperIcon} </div>

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
