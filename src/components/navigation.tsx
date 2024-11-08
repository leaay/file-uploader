import { Button } from "@/components/ui/button";
import useH from "@/hooks/useH";
import {  FileStack, StarIcon, X } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";


interface BaseProps {
    desktop?: boolean;
    mobile?: boolean;
  }

  interface MobileProps extends BaseProps {
    mobile: true;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

  interface DesktopProps extends BaseProps {
    mobile?: false;
  }
  
  type NavigationProps = MobileProps | DesktopProps;

const Navigation: React.FC<NavigationProps> = (props) => {


    const headerHeight = useH('header');
    const pathname = usePathname();




    if(props.desktop){

        return (

            <div style={{ top: `calc(${headerHeight}px  )`, maxHeight:`calc(100vh - ${headerHeight}px )`}}  className="  sticky top-8 mb-2rem  h-screen border-r-2 ">
                    <div style={{ top: `calc(${headerHeight}px  )`}} className="sticky flex flex-col gap-4 p-4 items-start "> 
                        <Link href="/dashboard">
                            <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname === "/dashboard",})}><FileStack /> Files</Button>
                        </Link>
                        <Link href="/dashboard/favorites">
                            <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname.includes("/dashboard/favorites"),})}><StarIcon /> Favorites</Button>
                        </Link>
                    </div>
            </div>
        
          );

    }

    if(props.mobile){

        const closeMenu = () => {
            props.setIsMenuOpen(false);
            document.body.classList.remove('overflow-hidden');

        };

        return (
            <div className="fixed inset-0 z-[9999]">
                <div onClick={closeMenu} className={`absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm ${props.isMenuOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-300`}  />
                <div className={`absolute right-0 top-0 h-full max-w-[300px] w-full bg-white shadow-lg ${props.isMenuOpen ? "animate-slideIn" : "animate-slideOut"}`}>
                    <div className="flex flex-col gap-4 py-16 px-6 items-start"> 

                        <Button onClick={closeMenu} className="absolute top-2 right-2" variant={"ghost"}><X /></Button>

                        <Link onClick={closeMenu} href="/dashboard">
                            <Button variant={"link"} className={clsx("flex gap-2", {"text-purple-500": pathname === "/dashboard",})}>
                                <FileStack /> Files
                            </Button>
                        </Link>

                        <Link onClick={closeMenu} href="/dashboard/favorites">
                            <Button variant={"link"}className={clsx("flex gap-2", {"text-purple-500": pathname.includes("/dashboard/favorites"),})}>
                                <StarIcon /> Favorites
                            </Button>
                        </Link>
                        
                    </div>
                </div>
            </div>
        )

    }


};

export default Navigation;