// app/layout.tsx
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar, } from "@/components/Masterlayout/Sidebar";

export default function Layout({ children }:any) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
