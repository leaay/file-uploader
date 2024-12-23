import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from "@/components/ui/alert-dialog"
import { EllipsisVertical, FileDown, Loader2, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "@/hooks/use-toast";
import { Doc } from "../../convex/_generated/dataModel";


interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

interface ExtendedProp {
    file: ExtendedFile
}


export default function FileCardActionMenu({file}:ExtendedProp){

    const  [isAlertOpen , setIsDialogOpen] = useState<boolean>(false)
    const deleteFile = useMutation(api.files.deleteFile)
    const toggleFavorite = useMutation(api.files.favouriteToggle)

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
                <DropdownMenuItem onClick={()=>toggleFavorite({_id:file._id, isFavorite:file.isFavourite})} className="flex flex-row gap-x-2 font-bold "><Star  className={`${file.isFavourite && 'fill-current'}`} />Favourite</DropdownMenuItem>
                <DropdownMenuItem onClick={()=>downloadFile(file.url as string , file.name)} className="flex flex-row gap-x-2 font-bold "><FileDown />Download</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={()=>setIsDialogOpen(true)} className="flex flex-row gap-x-2 font-bold text-red-600"><Trash2 />Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}