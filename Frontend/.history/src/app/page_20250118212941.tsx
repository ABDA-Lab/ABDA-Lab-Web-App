'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from 'motion/react';

import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card';
import { useTheme } from '@/hooks/useTheme';
import { User } from '@/types/User';
import { useRandomIndex } from '@/hooks/useRandomIndex';
import UploadFileButton from '@/components/UploadFileButton';
import DownloadFileB
?""utton from '@/components/DownloadFileButton';



export default function Home() {
    // const { theme, toggleTheme } = useTheme();
    // const { randomIndex, generateRandomIndex } = useRandomIndex(users.length);
    // const [randomUser, setRandomUser] = useState<User | null>(null);

    // const handleRandomUser = () => {
    //     generateRandomIndex();
    //     if (randomIndex !== null) {
    //         setRandomUser(users[randomIndex]);
    //     }
    // };

    return (
        <>
            <div className="">Haha</div>
        </>
    );
}
