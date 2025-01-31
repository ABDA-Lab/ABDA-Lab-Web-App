'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'motion/react';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useTheme } from '@/hooks/useTheme';
import { User } from '@/types/User';
import { useRandomIndex } from '@/hooks/useRandomIndex';
import UploadFileButton from '@/components/UploadFileButton';
import DownloadFileButton from '@/components/DownloadFileButton';

const users: User[] = [
    { id: '1', name: 'Alice', email: 'alice@example.com' },
    { id: '2', name: 'Bob', email: 'bob@example.com' },
    { id: '3', name: 'Charlie', email: 'charlie@example.com' },
    { id: '4', name: '7', email: 'alice@example.com' },
    { id: '5', name: 'Bo83b', email: 'bob@example.com' },
    { id: '6', name: 'Ch5a45rl45ie', email: 'charlie@example.com' },
];

export default function Home() {
    // const { theme, toggleTheme } = useTheme();
    const { randomIndex, generateRandomIndex } = useRandomIndex(users.length);
    const [randomUser, setRandomUser] = useState<User | null>(null);

    const handleRandomUser = () => {
        generateRandomIndex();
        if (randomIndex !== null) {
            setRandomUser(users[randomIndex]);
        }
    };

    return (
        <>
            <div className="">Haha</div>
        </>
    );
}
