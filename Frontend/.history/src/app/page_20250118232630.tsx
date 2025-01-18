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

export default function Home() {


    return (
        <>
            <div className="font-mono">
                {/* <MenuItem item="" active={active} setActive={setActive}>
                    Home
                </MenuItem> */}
            </div>
        </>
    );
}
