"use client";
import CustomDropdown from "@/components/CustomDropdown";
import { AppSidebar } from "@/components/dashboard/appSidebar";
import FileFolder from "@/components/resources/FileFolder";
import FileFolderSharing from "@/components/resources/FileFolderSharing";
import UploadFile from "@/components/resources/UploadFile";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function Page() {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
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
          <div className="flex flex-1 flex-col gap-4 p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-2">
              <FileFolderSharing />
              <div className="aspect-video rounded-xl bg-muted/50">
                <UploadFile />
              </div>
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
              <div className="flex justify-end p-6">
                <CustomDropdown
                  label="View Options"
                  options={[
                    {
                      label: "Profile",
                      shortcut: "⌘P",
                      onClick: () => console.log("Profile clicked"),
                    },
                    {
                      label: "Settings",
                      shortcut: "⌘S",
                      onClick: () => console.log("Settings clicked"),
                    },
                    {
                      label: "Log Out",
                      shortcut: "⇧⌘Q",
                      onClick: () => console.log("Logged out"),
                      disabled: false,
                    },
                  ]}
                />
              </div>
              <div className="grid grid-cols-5 gap-4 p-6">
                <FileFolder name="Learning AI" type="folder" />
                <FileFolder name="Machine learning" type="folder" />
                <FileFolder name="Paper.txt" type="file" />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
