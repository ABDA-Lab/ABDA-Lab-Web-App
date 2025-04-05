'use client';
import CustomDropdown from '@/components/CustomDropdown';
import { AppSidebar } from '@/components/dashboard/appSidebar';
import SharingFileTab from '@/components/dashboard/SharingFileTab';
import FileFolder from '@/components/resources/FileFolder';
import FileFolderSharing from '@/components/resources/FileFolderSharing';
import UploadFile from '@/components/resources/UploadFile';
import { BackgroundGradient } from '@/components/ui/background-gradient';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function Page() {
    return (
        <>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset className="">
                    <div className="py-20">
                        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb>
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">Shared Folder</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator className="hidden md:block" />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Contents</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </header>
                        <SharingFileTab />
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    );
}
