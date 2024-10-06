import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import {DropdownMenu,DropdownMenuContent,DropdownMenuItem,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog"
import { Doc } from "../../convex/_generated/dataModel";
import { EllipsisVertical, Trash2 } from "lucide-react";
import { useState } from "react";

interface prop {
    file: Doc<'files'>
}



function FileCardAction(){

    const  [isAlertOpen , setIsDialogOpen] = useState<boolean>(false)

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
                    <AlertDialogAction>Continue</AlertDialogAction>
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


export function FileCard({file}:prop) {

  return (

    <Card className="relative">
        <CardHeader>
            <CardTitle>{file.name}</CardTitle>
            <CardDescription>created: {file._creationTime}</CardDescription>
        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardAction/></div>
        
    </Card>
    
  )
}