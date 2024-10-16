import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from "@/components/ui/alert-dialog"
import { Doc } from "../../convex/_generated/dataModel";
import { EllipsisVertical, FileDown, Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";



interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

interface ExtendedProp {
    file: ExtendedFile
}

type FileType = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";

function FileCardAction({file}:ExtendedProp){

    const  [isAlertOpen , setIsDialogOpen] = useState<boolean>(false)
    const deleteFile = useMutation(api.files.deleteFile)
    

    async function downloadFile(url: string, filename: string) {
        try {
            toast({
                duration: 1000,
                variant: 'white',
                description: (
                  <div className="flex items-center gap-2 font-bold">
                    <Loader2 className="animate-spin h-8 w-8 text-purple-500" />
                    <span>Downloading your file...</span>
                  </div>
                ),
            })
            const response = await fetch(url);
            const blob = await response.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = filename || "download";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);

          } catch (error) {
            
            toast({duration:1000,variant:'destructive',title:'Something went wrong'})

            return

          }

          return

      }


    return(
        <>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your file from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={async()=>{await deleteFile({_id:file._id,fileID:file.fileID});toast({variant:'white',title:'File has been deleted succesfuly!'})}}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <DropdownMenu >
            <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>downloadFile(file.url as string , file.name)} className="flex flex-row gap-x-2 font-bold "><FileDown />Download</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setIsDialogOpen(true)} className="flex flex-row gap-x-2 font-bold text-red-600"><Trash2 />Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}


export function FileCard({file}:ExtendedProp) {

    const added = new Date(file._creationTime)

    function isImage(fileType:string) {

        const imageTypes: FileType[] = ["image/jpeg", "image/png", "image/gif", "image/svg+xml"];
        return imageTypes.includes(fileType as FileType)

    }


  return (

    <Card  style={{ zIndex: 0 }} className="relative z">
        <CardHeader>
            <CardTitle className="truncate max-w-full group-hover:overflow-visible group-hover:whitespace-normal">{file.name}</CardTitle>
            <CardDescription>Added: {added.toDateString()}</CardDescription>
            {   
                isImage(file.fileType) ? 
                <Image className="p-2 aspect-[1/1.1]" src={file.url as string} width={200} height={200} alt="image preview" /> :
                <Image className="p-2 aspect-[1/1.1]" src="/pdf-placeholder.png" width={200} height={200} alt="file preview" />
            }
            
        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardAction file={file}/></div>
    </Card>
    
  )
}