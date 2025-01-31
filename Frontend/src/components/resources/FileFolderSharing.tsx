'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { useState } from 'react';

export default function FileFolderSharing() {
    const [sharedUsers, setSharedUsers] = useState([
        { name: 'Sandeep Maurya', canEdit: true },
        { name: 'Kashish Mali', canEdit: true },
    ]);

    return (
        <div className="">
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-xl p-7">
                <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-4">
                    Configuration sharing folder
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    Share your project and collaborate with your team
                </p>

                <div className="mb-6">
                    <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        ABDA Lab Learning Material
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">24 Files • 334.45 GB</p>
                </div>

                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-700 dark:text-gray-300">Invite members via a sharable link</p>
                    <button className="bg-blue-500 text-white px-4 py-1 text-sm rounded hover:bg-blue-600">
                        Copy Link
                    </button>
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search for a member to add"
                        className="w-full px-4 py-2 text-sm rounded border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                        Shared with {sharedUsers.length} members
                    </h3>

                    {sharedUsers.map((user, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded mb-2">
                            <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback className="bg-muted">
                                        {user.name
                                            .split(' ')
                                            .map((name) => name[0])
                                            .join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <span className="text-sm text-gray-800 dark:text-gray-200">{user.name}</span>
                            </div>

                            <div className="flex items-center space-x-2">
                                <select
                                    value={user.canEdit ? 'Can Edit' : 'Can View'}
                                    className="text-sm border border-gray-300 dark:border-gray-700 rounded px-2 py-1 focus:ring-2 focus:ring-blue-500"
                                    onChange={(e) => {
                                        const newSharedUsers = [...sharedUsers];
                                        newSharedUsers[index].canEdit = e.target.value === 'Can Edit';
                                        setSharedUsers(newSharedUsers);
                                    }}>
                                    <option>Can Edit</option>
                                    <option>Can View</option>
                                </select>

                                <button
                                    onClick={() => {
                                        const newSharedUsers = sharedUsers.filter((_, i) => i !== index);
                                        setSharedUsers(newSharedUsers);
                                    }}
                                    className="text-red-500 hover:text-red-600 text-sm">
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="w-full bg-blue-500 text-white py-2 text-sm rounded hover:bg-blue-600">Save</button>
            </div>
        </div>
    );
}
