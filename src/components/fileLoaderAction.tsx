import React, { useState } from 'react'
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Trash2, X } from 'lucide-react';
import { Doc } from '../../convex/_generated/dataModel';
import {AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,AlertDialogFooter,AlertDialogHeader,AlertDialogTitle} from "@/components/ui/alert-dialog"

type SelectedFile = Pick<Doc<"files">, "_id" | "fileID">;

export interface ExtendedProp {
    selectedItems: SelectedFile[];
    setSelectedItems: React.Dispatch<React.SetStateAction<SelectedFile[]>>;
}

export default function FileLoaderAction({selectedItems, setSelectedItems }:ExtendedProp) {

  const deleteFileBatch = useMutation(api.files.deleteFileBatch)
  const  [isAlertOpen , setIsDialogOpen] = useState<boolean>(false)

  return (
    <>
        <AlertDialog open={isAlertOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your {selectedItems.length} files from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>

                    <AlertDialogAction onClick={async()=>{await deleteFileBatch({ files: selectedItems });setSelectedItems([]);toast({variant:'white',title:'Files has been deleted succesfuly!'})}} >
                                Continue
                    </AlertDialogAction>

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        <div className=" bg-purple-100 order-3 outline outline-1 outline-purple-200 rounded-3xl flex min-w-max items-center gap-2 px-4" > 
            <Button onClick={()=>setSelectedItems([])} className="p-1 hover:bg-purple-100" variant={"ghost"}><X/></Button>
            <p className="flex gap-2 items-center min-w-fit font-bold"> {selectedItems.length} selected</p>
            <Button onClick={()=>setIsDialogOpen(true)} className="p-1 hover:bg-purple-100 hover:text-red-600" variant="ghost"><Trash2 /></Button> 
        </div>
  </>
  )
}
