
import { Button } from "@/components/ui/button";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import {  currentUser } from "@clerk/nextjs/server";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default async function Home() {

  const user = await currentUser()

  console.log(user?.firstName)

  if(!user) return <SignInButton  mode="modal"><Button>Sing in</Button></SignInButton>

  

  return (
    <div className="flex flex-col gap-y-40 items-center">
      <div className="flex gap-6 w-full justify-around">
        <Button variant={"default"}>test</Button>
        <SignOutButton><Button variant={"destructive"} >Sign out</Button></SignOutButton>
      </div>

      <h1 className="max-w-max p-8 bg-cyan-200 text-black flex items-center gap-x-4 rounded-xl opacity-75 ">
        <Avatar>
            <AvatarImage src={`${user?.imageUrl}`} />
            <AvatarFallback>WG</AvatarFallback>
        </Avatar>
        <p>{`${user?.firstName}`}</p>
      </h1>
      
    </div>
  );
}
