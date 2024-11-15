import {Card,CardDescription,CardHeader,CardTitle,} from "@/components/ui/card"
import { Doc } from "../../convex/_generated/dataModel";
import Image from "next/image";
import FileCardActionMenu from "./fileCardActionMenu";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";


interface ExtendedFile extends Doc<'files'> {
    url: string | null;
}

type SelectedFile = Pick<Doc<"files">, "_id" | "fileID">;

interface ExtendedProp {
    file: ExtendedFile
    selectedItems: SelectedFile[];
    setSelectedItems: React.Dispatch<React.SetStateAction<SelectedFile[]>>;
}

export function FileCard({file,selectedItems, setSelectedItems }:ExtendedProp) {


        const added = new Date(file._creationTime)

        const getIconSrc = (fileType: string) => {
            switch (fileType) {
              case "image/jpeg":
                return "/jpeg.svg";
              case "image/png":
                return "/png.svg";
              case "image/gif":
                return "/gif.svg";
              case "image/svg+xml":
                return "/svg.svg";
              case "application/pdf":
                return "/pdf.svg";
              default:
                return "/default.svg";
            }
          };

        const src = getIconSrc(file.fileType);

        const isFileSelected = (id: string) => selectedItems.some((item) => item._id === id);

        const handleCardClick = () => {
            setSelectedItems((prev) =>
              prev.some((item) => item._id === file._id)
                ? prev.filter((item) => item._id !== file._id)
                : [...prev, { _id: file._id, fileID: file.fileID }] 
            );
        };

  return (

    <Card 
        onClick={selectedItems.length > 0 ? handleCardClick : undefined}
        onDoubleClick={selectedItems.length === 0 ? handleCardClick : undefined}
        style={{ zIndex: 0  }} 
        className={`group relative z max-h-72 md:max-h-80  gap-2 outline-1 outline outline-gray-400 p-2 overflow-hidden shadow-lg shadow-gray-200  
            ${isFileSelected(file._id) ? "outline-purple-500 outline-4 shadow-purple-200 bg-purple-100"  : "outline-gray-400 shadow-gray-200"} 
            ${selectedItems.length > 0 && "cursor-pointer"} 
        `}>
        <CardHeader className=" gap-1 h-full " >
            <Tooltip>
                <TooltipTrigger className="truncate">
                    <CardTitle className="flex px-2  w-10/12 truncate overflow-hidden text-md">{file.name}</CardTitle></TooltipTrigger>
                <TooltipContent side="bottom" className="z-50 max-w-40">{file.name}</TooltipContent>
            </Tooltip>
            <CardDescription className="px-2 text-xs" > uploaded: {added.toLocaleDateString()}</CardDescription>
            <div className="w-full h-full  flex items-center justify-center"><Image className="rounded-lg h-full  px-2 aspect-[1/1.1]  z-[-29] " src={src} width={100} height={100} alt="file preview" /></div>

        </CardHeader>
        <div className="absolute top-2 right-2"><FileCardActionMenu file={file} /></div>
        
    </Card>
    
  )
}