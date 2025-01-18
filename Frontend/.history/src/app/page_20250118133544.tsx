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
    const { theme, toggleTheme } = useTheme();
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
            {/* <DownloadFileButton /> */}
            {/* <UploadFileButton /> */}
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                {/* <div className="flex justify-end p-4">
                    <button
                        onClick={handleRandomUser}
                        className="px-4 py-2 rounded-lg bg-blue-500 text-white dark:bg-blue-300 dark:text-black">
                        Show Random User
                    </button>
                </div> */}
                <CardContainer className="inter-var">
                    {/* <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg bg-gray-800 text-white dark:bg-gray-200 dark:text-black"
        >
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button> */}
                    {/* <div>
          {randomUser && (
            <div className="mt-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
              <p className="text-lg font-bold">Random User</p>
              <p>
                <strong>ID:</strong> {randomUser.id}
              </p>
              <p>
                <strong>Name:</strong> {randomUser.name}
              </p>
              <p>
                <strong>Email:</strong> {randomUser.email}
              </p>
            </div>
          )}
        </div> */}

                    {/* <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
                        <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
                            cho anh mot chut hy vong duoc ko
                        </CardItem>
                        <CardItem
                            as="p"
                            translateZ="60"
                            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
                            cho anh mot chut hy vong duoc ko
                        </CardItem>
                        <CardItem translateZ="100" rotateX={20} rotateZ={-10} className="w-full mt-4">
                            <Image
                                src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                height="1000"
                                width="1000"
                                className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                                alt="thumbnail"
                            />
                        </CardItem>
                        <div className="flex justify-between items-center mt-20">
                            <CardItem
                                translateZ={20}
                                translateX={-40}
                                as="button"
                                className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white">
                                cho anh hy vong →
                            </CardItem>
                            <CardItem
                                translateZ={20}
                                translateX={40}
                                as="button"
                                className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                                lam on
                            </CardItem>
                        </div>
                    </CardBody> */}
                </CardContainer>
        </motion.div>
        <div className=""></div>
        </>
    );
}
