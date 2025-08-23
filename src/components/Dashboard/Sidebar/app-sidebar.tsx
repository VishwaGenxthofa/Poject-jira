"use client"

import { Link } from "react-router-dom"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
 GalleryVerticalEnd,
  Map,
  PieChart,
  Rocket,
  Settings2,
  SquareTerminal,
} from "lucide-react"
import logo from '../../../assets/logo.png'
import { NavMain } from "@/components/Dashboard/Sidebar/nav-menu"
import NavProjects  from "@/components/Dashboard/Sidebar/nav-projects"
import { NavUser } from "@/components/Dashboard/Sidebar/nav-users"
// import { TeamSwitcher } from "@/components/Dashboard/Sidebar/teams-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Menubar } from "primereact/menubar"
import Header from "@/components/Header/Header"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "MyProject1",
      url: "/project",
      icon: Rocket,
    },
    {
      name: "My Projects2",
      url: "/task",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className=" m-2">
        {/* <TeamSwitcher teams={data.teams} /> */}
        <Link to='/' className=' max-w-290-px items-center justify-center'>
              <img src={logo} alt='Logo' className=" mx-auto border-white"/>
            </Link>
      </SidebarHeader>
      <SidebarContent>
       
        {/* <NavMain items={data.navMain} /> */}
        <NavProjects></NavProjects>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
