import * as React from 'react';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from '@/components/ui/sidebar';
import { SearchForm } from './searchForm';
import Logo from '../Logo';

// This is sample data.
const data = {
    versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
    navMain: [
        {
            title: 'Notification',
            url: '#',
            items: [
                {
                    title: 'Latest',
                    url: '/dashboard/notification/latest',
                },
                {
                    title: 'ABDA Messenger',
                    url: '/dashboard/notification/messenger',
                },
            ],
        },
        {
            title: 'Your Task Upcoming',
            url: '#',
            items: [
                {
                    title: 'Learning',
                    url: '#',
                },
                {
                    title: 'Projects',
                    url: '/dashboard/up-coming/projects',
                    isActive: true,
                },
                {
                    title: 'Research',
                    url: '#',
                },
            ],
        },
        {
            title: 'Manage Material',
            url: '#',
            items: [
                {
                    title: 'Shared Folder',
                    url: '/dashboard/manage-material/shared-folder',
                },
                {
                    title: 'Learning Courses',
                    url: '/dashboard/manage-material/learning-courses',
                },
                {
                    title: 'Public Blogs',
                    url: '#',
                },
            ],
        },
        {
            title: 'ABDA Corner',
            url: '#',
            items: [
                {
                    title: 'Internal Sharing',
                    url: '#',
                },
                {
                    title: 'Seminar & Workshop',
                    url: '#',
                },
                {
                    title: 'Funny Moments',
                    url: '#',
                },
                {
                    title: 'Timetable',
                    url: '#',
                },
                {
                    title: 'Award & Recognition',
                    url: '#',
                },
            ],
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Logo />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {/* We create a SidebarGroup for each parent. */}
                {data.navMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={item.isActive}>
                                            <a href={item.url}>{item.title}</a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
