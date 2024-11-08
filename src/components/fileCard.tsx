import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";
import FileCardActionMenu from "./fileCardActionMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { useEffect, useState } from "react";


interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

interface ExtendedProp {
    file: ExtendedFile
}

// type FileType = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";


export function FileCard({file}:ExtendedProp) {

    const added = new Date(file._creationTime)
    const [src, setSrc] = useState("");


        useEffect(() => {
            switch (file.fileType) {
            case "image/jpeg":
                setSrc("/jpeg.svg");
                break;
            case "image/png":
                setSrc("/png.svg");
                break;
            case "image/gif":
                setSrc("/gif.svg");
                break;
            case "image/svg+xml":
                setSrc("/svg.svg");
                break;
            case "application/pdf":
                setSrc("/pdf.svg");
                break;
            default:
                setSrc("/default.svg"); 
            }
        }, []);


  return (

    <Card  style={{ zIndex: 0  }} className="group relative z max-h-72 md:max-h-80  gap-2 outline-1 outline outline-gray-400 p-2 overflow-hidden shadow-lg shadow-gray-200 ">
        <CardHeader className=" gap-1 h-full " >
            <Tooltip>
                <TooltipTrigger className="truncate">
                    <CardTitle className="flex px-2  w-10/12 truncate overflow-hidden text-md">{file.name}</CardTitle></TooltipTrigger>
                <TooltipContent side="bottom" className="z-50 max-w-40">{file.name}</TooltipContent>
            </Tooltip>
            <CardDescription className="px-2 text-xs" > uploaded: {added.toLocaleDateString()}</CardDescription>
            <div className="w-full h-full  flex items-center justify-center"><Image className="rounded-lg h-full  px-2 aspect-[1/1.1]  z-[-29] " src={src} width={100} height={100} alt="file preview" /></div>

        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardActionMenu file={file} /></div>
        
    </Card>
    
  )
}