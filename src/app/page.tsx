"use client"
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton,SignedIn,SignedOut } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast"

export default  function Home() {

  const { toast } = useToast()
  const createFile = useMutation(api.files.createFile)
  const showFiles = useQuery(api.files.getFile)
  const [input, setInput] = useState('')

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value)
  }

  const handleInputSend = ()=>{

    createFile({name:input})
    setInput('')
    toast({description:'item has been created'})

  }


  return (
    <div className="flex flex-col gap-y-10 justify-center p-4 items-center">
      
        <SignedOut><SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
      <SignedIn>
        <SignOutButton><Button variant={"destructive"}>Sign Out</Button></SignOutButton>
        <div className="flex flex-col gap-y-5 w-3/4 items-center">
          <Input className="w-auto" placeholder="save" type="text" value={input} onChange={handleInputChange} />
          <Button disabled={!input} onClick={handleInputSend}>Add</Button> 
        </div>
        <div className="grid grid-cols-4 w-3/4 rounded-xl overflow-hidden bg-indigo-800">
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
