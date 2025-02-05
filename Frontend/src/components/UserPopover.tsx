import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

export default function UserPopover({ profile, logout }: { profile: any; logout: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center space-x-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                    <div
                        onMouseEnter={() => setIsOpen(true)}
                        onMouseLeave={() => setIsOpen(false)}
                        className="relative">
                        <Avatar className="border-green-500 border-2 cursor-pointer hover:opacity-80">
                            <AvatarImage src={profile.avatar || ''} alt={profile.username || 'User'} />
                            <AvatarFallback>
                                {profile.username ? profile.username.charAt(0).toUpperCase() : 'U'}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                </PopoverTrigger>
                <PopoverContent
                    className="w-48 p-2 bg-white shadow-lg rounded-md"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}>
                    <div className="p-2 text-center">
                        <p className="text-xs text-gray-500">{profile.username || ''}</p>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex flex-col space-y-2">
                        <Link href="/profile">
                            <Button variant="ghost" className="w-full text-left hover:bg-gray-100">
                                Profile
                            </Button>
                        </Link>
                        <Button
                            onClick={logout}
                            variant="ghost"
                            className="w-full text-left text-red-500 hover:bg-red-100">
                            Logout
                        </Button>
                    </div>
                </PopoverContent>
            </Popover>
            <p className="text-sm text-b">{profile.nickname || 'Nickname'}</p>
        </div>
    );
}
