"use client"
 
import { ColumnDef } from "@tanstack/react-table"
import { FileImage, FileText, Image, ImagePlay, Star } from "lucide-react";
import {Tooltip,TooltipContent,TooltipTrigger} from "@/components/ui/tooltip"
import { useEffect, useRef, useState } from "react";

 
type FileTypes = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";

export type File = {
    name: string;
    ownerID: string;
    fileID: string; 
    fileType: FileTypes;
    isFavourite: boolean;
    _creationTime: number;
    
}


export const Columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: "File Name",
    cell:({row})=>{

      const fileName : string = row.getValue("name")
      const textRef = useRef<HTMLDivElement | null>(null);
      const [isTruncated, setIsTruncated] = useState(false);

      useEffect(() => {
        if (textRef.current) {
          setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
        }
      }, [fileName]);

      return <Tooltip>
                {isTruncated ?
                  <>
                  <TooltipTrigger><div ref={textRef} className="max-w-32 md:max-w truncate ">{fileName}</div></TooltipTrigger>
                  <TooltipContent className="max-w-96">{fileName}</TooltipContent>
                  </> :
                  <div ref={textRef} className="max-w-32 md:max-w truncate ">{fileName}</div>
                }
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
  }
]
