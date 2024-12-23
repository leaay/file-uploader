import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import {Form,FormControl,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import Spiner from "./spiner";
import { useToast } from "@/hooks/use-toast"


interface Props {
  currentOwner?: string;
}

export type FileType = "image/jpeg" | "image/png" | "image/gif" | "image/svg+xml" | "application/pdf";

export default function UploadModal({ currentOwner }: Props){

    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const saveFile = useMutation(api.files.createFile);
    const { toast } = useToast()
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const acceptedFileTypes: string[] = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/svg+xml",
      "application/pdf",
    ];
   

    const formSchema = z.object({
        fileName: z.string().min(2, {message:'Name has to be atleast 2 letters long.'}).max(200,{message:'Name cannot be longer than 200 signs.'}),
        file: z.custom<File | null>((val)=>{
          if(val instanceof File){
            return acceptedFileTypes.includes(val.type)
          }
          return false
        }, 'File is required and must be of type JPEG, PNG, GIF, SVG, or PDF.')
      })
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          fileName: "",
          file: null,
        },
      })
    
     async function onSubmit(values: z.infer<typeof formSchema>) {

        if(!currentOwner){
          toast({
            variant:'destructive',
            title:"User is not logged in"
          })
          throw new Error('User is not logged in')
          return 
        }

        const postUrl = await generateUploadUrl();
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": values.file!.type },
            body: values.file,
        });

        const { storageId } = await result.json();

        if(values.file?.type === undefined){
          return
        }


        try{
          await saveFile({ 
            fileID:storageId, 
            ownerID:currentOwner, 
            name:values.fileName , 
            fileType:values.file.type as FileType
          });
          
          form.reset()
          setIsDialogOpen(false)
          toast({
            title: "Uploaded successfully"
          })

        }catch (err){
          toast({
            variant:'destructive',
            title: "Something went wrong, please try again later."
          })
        }

    }


    return(
        <Dialog onOpenChange={()=>{form.reset(),setIsDialogOpen(!isDialogOpen)}} open={isDialogOpen} >
              <DialogTrigger><Button>Upload File</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload something</DialogTitle>
                    <DialogDescription>
                      Choose files from your device.
                    </DialogDescription>
                  </DialogHeader>

                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                          control={form.control}
                          name="fileName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name your file</FormLabel>
                              <FormControl>
                                <Input  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="file"
                          render={({ field:{onChange }, ...field }) => (
                            <FormItem>
                              <FormLabel>Choose file</FormLabel>
                              <FormControl>
                                <Input 
                                  type="file"
                                  onChange={(event)=>{
                                    if(!event.target.files) return;
                                    onChange(event.target.files[0])
                                  }} 
                                  className="cursor-pointer"  {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button disabled={form.formState.isSubmitting}  type="submit">{form.formState.isSubmitting ? <Spiner /> : 'Upload'}</Button>
                      </form>
                  </Form>
                
                          
                </DialogContent>
        </Dialog>

    )
}

            