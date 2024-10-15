import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from "@/components/ui/alert-dialog"
import { Doc } from "../../convex/_generated/dataModel";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";

interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

interface ExtendedProp {
    file: ExtendedFile
}


function FileCardAction({file}:ExtendedProp){

    const  [isAlertOpen , setIsDialogOpen] = useState<boolean>(false)
    const deleteFile = useMutation(api.files.deleteFile)


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

        <DropdownMenu>
            <DropdownMenuTrigger><EllipsisVertical /></DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={()=>setIsDialogOpen(true)} className="flex flex-row gap-x-2 font-bold text-red-600"><Trash2 />Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}


export function FileCard({file}:ExtendedProp) {

    const added = new Date(file._creationTime)


  return (

    <Card  style={{ zIndex: 0 }} className="relative z">
        <CardHeader>
            <CardTitle>{file.name}</CardTitle>
            <CardDescription>Added: {added.toDateString()}</CardDescription>
            <p>{file.url}</p>
        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardAction file={file}/></div>
    </Card>
    
  )
}