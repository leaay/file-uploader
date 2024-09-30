import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";


export  function Header(){
    return (
        <div className="border-b p-4 bg-gray-100 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-medium text-xl  md:text-2xl">Uploaderv1</div>
                <div className="flex gap-x-2 md:gap-x-12">
                    <OrganizationSwitcher/>
                    <UserButton appearance={{
                        elements: {
                            avatarBox:'w-6 , h-6 , md:h-12 , md:w-12',
                        },
                    }} />

                </div>

            </div>
        </div>
    )
}
