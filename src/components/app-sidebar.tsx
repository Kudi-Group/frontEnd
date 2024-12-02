import { Calendar, Home, Settings, Box, BookText, MessageCircleQuestion, ChevronUp } from "lucide-react"
import Starfire from '@/assets/starfire.jpg'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import { useUser } from "../UserContext";
// Menu items.
const items = [
    {
        title: "Dashboard",
        url: "/user/dashboard",
        icon: Home,
    },
    {
        title: "Product",
        url: "#",
        icon: Box,
    },
    {
        title: "Loan Entry Form",
        url: "/user/loan-form",
        icon: BookText,
    },
    {
        title: "Schedule",
        url: "/user/schedule",
        icon: Calendar,
    },
    {
        title: "Help",
        url: "#",
        icon: MessageCircleQuestion,
    },
    {
        title: "Settings",
        url: "/user/profile",
        icon: Settings,
    },
]

export function AppSidebar() {
    const {user} = useUser();
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="px-4">
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className={item.url === location.pathname ? "bg-blue-700 text-white" : ''}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <Avatar className=' w-8 h-8 bg-blue-200 justify-center items-center'>
                                        <AvatarImage src={Starfire} />
                                    </Avatar> 
                                    {user?.username}
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem>
                                    <span>Account</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Billing</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Sign out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
