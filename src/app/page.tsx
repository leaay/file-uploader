"use client"
import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton"
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger} from "@/components/ui/dialog"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form,FormControl,FormDescription,FormField,FormItem,FormLabel,FormMessage} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

export default  function Home() {

  const org = useOrganization()
  const {user} = useUser()
  const createFile = useMutation(api.files.createFile)
  const currentOwner = org.organization?.id ? org.organization.id : user?.id;
  const showFiles = useQuery(api.files.getFile, {ownerID: currentOwner || 'skip'}) 



  const formSchema = z.object({
    fileName: z.string().min(2, {message:'Name has to be atleast 2 letters long.'}).max(200,{message:'Name cannot be longer than 200 signs.'}),
    // file: z.custom<File>((file)=>{

    //   if (!(file instanceof File)) {
    //     return false;
    //   }


    //   return true
    
    // },{message:'file must be < 5mb'})
    file: z.custom<File>((val)=>val instanceof File, 'File is requaried')
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileName: "",
      file: undefined
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col gap-y-10 justify-center p-4 items-center">
      
        <SignedOut>
          <SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
        <SignedIn>

        <div className="container mx-auto flex flex-row justify-between p-12 items-center">
          <h1 className="text-xl">Your Files</h1>

            <Dialog>
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
                                <Input placeholder="shadcn" {...field} />
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
                        <Button type="submit">Upload</Button>
                      </form>
                  </Form>
                  
                </DialogContent>
            </Dialog>
          
        </div>

        {!showFiles && 
          <div className="flex flex-col gap-4 container items-center ">
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          <Skeleton className="bg-gray-400 h-[40px] w-3/4 rounded-xl"/>
          </div>   
        }

        <div className="grid grid-cols-4 w-3/4 rounded-xl overflow-hidden bg-indigo-200">
          {showFiles?.map((file,index) => (
            <div key={file._id} className={`${index % 2 === 0 ? 'bg-slate-400' : 'bg-gray-300'} p-4 text-black`}>
              {file.name}
            </div>
          ))}
        </div>

      </SignedIn>
    </div>
  );
}
