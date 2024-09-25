import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";


export  function Header(){
    return (
        <div className="border-b p-4 bg-gray-50 ">
            <div className="container mx-auto flex justify-between items-center">
                <div className="font-medium text-xl">Uploaderv1</div>
                <div className="flex gap-x-8">
                    <OrganizationSwitcher/>
                    <UserButton appearance={{
                        elements: {
                            avatarBox:'w-10 , h-10',
                        },
                    }} />

                </div>

            </div>
        </div>
    )
}
