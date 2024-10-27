import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";
import { FileImage} from "lucide-react";
import FileCardActionMenu from "./fileCardActionMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";


interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

interface ExtendedProp {
    file: ExtendedFile
}

type FileType = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";


export function FileCard({file}:ExtendedProp) {

    const added = new Date(file._creationTime)

    function isImage(fileType:string) {

        const imageTypes: FileType[] = ["image/jpeg", "image/png", "image/gif" ];
        return imageTypes.includes(fileType as FileType)

    }

    // <Tooltip>
    //               <TooltipTrigger><div  className={` max-w-32 md:max-w truncate flex items-center`}>{fileName}</div></TooltipTrigger>
    //               <TooltipContent className="max-w-96">{fileName}</TooltipContent>
    //          </Tooltip>

  return (

    <Card  style={{ zIndex: 0  }} className="group relative z max-h-72 md:max-h-52 overflow-hidden gap-1 outline-2 outline outline-gray-400   ">
        <CardHeader className=" gap-1  " >
            <Tooltip>
                <TooltipTrigger className="truncate">
                    <CardTitle className="flex px-4 pt-2  pr-8  w-10/12 truncate overflow-hidden text-md">{file.name}</CardTitle></TooltipTrigger>
                <TooltipContent side="bottom" className="z-50 max-w-40">{file.name}</TooltipContent>
            </Tooltip>
            <CardDescription className="px-4 text-xs" > {added.toDateString()}</CardDescription>
            {   
            
                isImage(file.fileType) ? 
                <Image className=" rounded-lg flex items-center justify-center px-2 aspect-[1/1.1] w-full z-[-29]" src={file.url as string} width={400} height={400} alt="image preview" /> : 
                file.fileType !== "image/svg+xml" ? 
                <Image className="rounded-lg h-full flex items-center justify-center px-2 aspect-[1/1.1] w-full z-[-29]" src="/pdf-placeholder.png" width={400} height={400} alt="file preview" /> : 
                null
                
            }
            {file.fileType === "image/svg+xml" ? <FileImage className="place-self-center m-4" width={100} height={100} /> : null}
            {/* {file.fileType === "image/svg+xml" ? <Image className=" px-2 aspect-[1/1.1] w-full z-[-29]" src="/SVG.jpg" width={400} height={400} alt="file preview" /> : null} */}
            
        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardActionMenu file={file} /></div>
        
    </Card>
    
  )
}