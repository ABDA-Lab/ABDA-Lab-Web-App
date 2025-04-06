'use client';
import * as React from 'react';
import Link from 'next/link';

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
import { usePathname } from 'next/navigation';

// Move data outside the component
const getNavData = () => ({
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
                    title: 'Projects',
                    url: '/dashboard/up-coming/projects',
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
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname();
    const data = getNavData();

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Logo />
                <SearchForm />
            </SidebarHeader>
            <SidebarContent>
                {data.navMain.map((section) => (
                    <SidebarGroup key={section.title}>
                        <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {section.items.map((item) => {
                                    // Check if this item matches the current path
                                    const isActive = pathname === item.url;

                                    return (
                                        <SidebarMenuItem key={item.title}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.url}>{item.title}</Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    );
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
