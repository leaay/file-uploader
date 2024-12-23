import { Button } from "@/components/ui/button";
import { SignInButton,SignedIn,SignedOut, useOrganization, useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import UploadModal  from "@/components/uploadModal"
import { FileCard } from "@/components/fileCard";
import Image from 'next/image'
import SearchBar from "@/components/searchBar";
import { useEffect, useState } from "react";
import useH from "@/hooks/useH";
import { DataTable } from "./file-table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {  Grid, Rows4} from "lucide-react";
import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip"
import { columns } from "./columns";
import { Skeleton } from "@/components/ui/skeleton"
import {Select,SelectContent,SelectItem,SelectTrigger,SelectValue} from "@/components/ui/select"
import { Doc } from "../../convex/_generated/dataModel";
import FileLoaderAction from "./fileLoaderAction";

interface prop{
    title: string;
    fav?: boolean;
}

type SelectedFile = Pick<Doc<"files">, "_id" | "fileID">;
type DataViewType = 'grid' | 'table';

export default  function FilesLoader({title,fav}:prop) {

  const org = useOrganization()
  const {user} = useUser()

  const [query , setQuery] = useState<string | undefined>(undefined)
  const [typeQuery , setTypeQuery] = useState<string  | undefined>(undefined)
  const [selectedItems, setSelectedItems] = useState<SelectedFile[]>([]);
  const [dataView, setDataView] = useState<DataViewType>('grid');

  const currentOwner = org.organization?.id ? org.organization.id : user?.id;
  const headerHeight = useH('header');

  const showFiles = useQuery(api.files.getFile, {ownerID: currentOwner || 'skip' , query:query , typeQuery:typeQuery , fav:fav ? true : false}) || undefined; 

  useEffect(() => {
    const savedLayout  = localStorage.getItem('dataView') as DataViewType;
    if (savedLayout !== null) {
      setDataView(savedLayout);
    }
  }, []);

  const toggleView = (prop:DataViewType) => {
    setDataView(prop);
    localStorage.setItem('dataView', prop); 
  };



  return (
    
    <div className={` relative  flex-1 flex ${showFiles?.length === 0  ? 'justify-start' : ''} items-center flex-col min-h-[calc(100vh - ${headerHeight})]`}>
      <TooltipProvider >
        
        <SignedOut>
          <SignInButton mode="modal"><Button variant={"default"}>Sign In</Button></SignInButton></SignedOut>
        <SignedIn>

        
          <>
            <div style={{ top: `calc(${headerHeight}px )` }} className={`p-6   bg-white z-[5]  w-full    sticky `}>
              <div className="flex flex-col md:flex-row gap-2 justify-between mx-auto items-start md:items-center container ">
                <div className="flex  order-1 flex-row  gap-4 w-full justify-between  items-start md:items-center">
                  <h1 className="text-2xl ">{title}</h1>
                  <SearchBar  setQuery={setQuery} />
                </div>

                  {selectedItems.length > 0 && <FileLoaderAction selectedItems={selectedItems} setSelectedItems={setSelectedItems} /> }
              
                  <div className="flex order order-2 justify-between flex-row flex-wrap items-end md:items-center md:flex-row md:flex-nowrap  gap-4 md:justify-end">
                    {selectedItems.length > 0 ? null :
                     <Select onValueChange={(value: string) => setTypeQuery(value === "ALL" ? undefined : value)}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="ALL">ALL</SelectItem>
                            <SelectItem value="image/jpeg">JPG</SelectItem>
                            <SelectItem value="image/png">PNG</SelectItem>
                            <SelectItem value="image/gif">GIF</SelectItem>
                            <SelectItem value="image/svg+xml">SVG</SelectItem>
                          <SelectItem value="application/pdf">PDF</SelectItem>
                      </SelectContent>
                     </Select>}
                     <Tabs value={dataView} defaultValue={dataView} >
                          <TabsList >
                              <Tooltip>
                                <TooltipTrigger><TabsTrigger onClick={()=>toggleView("grid")} value="grid"><Grid className="w-8" /></TabsTrigger></TooltipTrigger>
                                <TooltipContent className="z-50">Grid view</TooltipContent>
                              </Tooltip>
                              <Tooltip>
                                <TooltipTrigger><TabsTrigger onClick={()=>toggleView("table")} value="table"><Rows4 className="w-8"  /></TabsTrigger></TooltipTrigger>
                                <TooltipContent className="z-50">Table view</TooltipContent>
                              </Tooltip>
                          </TabsList>
                     </Tabs>
                     <UploadModal currentOwner={currentOwner} />
                  </div>
                
              </div>
              
            </div>
            
            {dataView === 'grid'  &&
            <div className=" grid grid-cols-2 py-4  w-11/12 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  px-8   ">
                  {showFiles?.map((file) => <FileCard selectedItems={selectedItems} setSelectedItems={setSelectedItems}  key={file._id} file={file} /> )}
            </div>
            }

            {dataView === 'table'&& showFiles && <DataTable data={showFiles} columns={columns} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />}
            
          </>
          
        

         {showFiles?.length === 0 && dataView === 'grid' &&

          <div className="flex flex-col justify-center p-10 ">
            <Image src="/empty.svg" width={700}height={700}alt="Picture of the author"/>
            <div className="flex flex-col md:flex-row items-start p-8 justify-center gap-y-6 ">
              <h1 className="text-4xl">Upload something!</h1> 
            </div>
          </div>

        } 

        {showFiles === undefined && dataView === 'grid' && 
            <div className=" grid grid-cols-1  sm:grid-cols-2 w-11/12 rounded-xl gap-4 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7  px-8   ">
              {
              Array.from({length:14}).map((index)=>(<Skeleton key={index + '1'} className="w-full h-72 bg-gray-300  md:h-52"/>))
              }
            </div>
        }

        {showFiles === undefined &&  dataView === 'table' && 
           <div className="grid w-11/12">
           <div className="grid  mb-1">
             <Skeleton className="h-10 bg-gray-400 rounded w-full" />
           </div>
       
           {Array.from({ length: 12 }).map((index) => (
             <div key={index + '1'} className="grid grid-cols-5 gap-1 mb-1">
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
               <Skeleton className="h-10 w-full bg-gray-300 rounded" />
             </div>
           ))}
         </div>
        }

        

      </SignedIn>
      </TooltipProvider>

    </div>
  );
}


{/* <div className=" bg-purple-100 outline outline-1 outline-purple-200 rounded-3xl flex min-w-max items-center gap-2 px-4" > 
<Button onClick={()=>setSelectedItems([])} className="p-1 hover:bg-purple-100" variant={"ghost"}><X/></Button>
<p className="flex gap-2 items-center min-w-fit font-bold"> {selectedItems.length} selected</p>
<Button  onClick={async()=>{
  await deleteFileBatch({ files: selectedItems });
  setSelectedItems([]);
  toast({variant:'white',title:'Files has been deleted succesfuly!'})
}} 
className="p-1 hover:bg-purple-100 hover:text-red-600" variant="ghost"><Trash2 /></Button> 
</div> */}