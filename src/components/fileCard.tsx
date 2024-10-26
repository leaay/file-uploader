import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";
import { FileImage} from "lucide-react";
import FileCardActionMenu from "./fileCardActionMenu";


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


  return (

    <Card  style={{ zIndex: 0  }} className="group relative z max-h-72 md:max-h-52 overflow-hidden gap-1 outline-2 outline outline-gray-400 hover:outline-blue-500 hover:cursor-pointer ">
        <CardHeader className=" gap-1  " >
            <CardTitle className=" truncate max-w-full   bg-gray-400 px-4 py-2 pr-8 group-hover:bg-blue-500">{file.name}</CardTitle>
            <CardDescription className="px-4" > {added.toDateString()}</CardDescription>
            {   
                isImage(file.fileType) ? 
                <Image className=" px-2 aspect-[1/1.1] w-full z-[-29]" src={file.url as string} width={400} height={400} alt="image preview" /> : 
                file.fileType !== "image/svg+xml" ? 
                <Image className=" px-2 aspect-[1/1.1] w-full z-[-29]" src="/pdf-placeholder.png" width={400} height={400} alt="file preview" /> : 
                null
                
            }
            {file.fileType === "image/svg+xml" ? <FileImage className="place-self-center m-4" width={100} height={100} /> : null}
            {/* {file.fileType === "image/svg+xml" ? <Image className=" px-2 aspect-[1/1.1] w-full z-[-29]" src="/SVG.jpg" width={400} height={400} alt="file preview" /> : null} */}
            
        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardActionMenu file={file} /></div>
        
    </Card>
    
  )
}