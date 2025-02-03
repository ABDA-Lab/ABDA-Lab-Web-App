'use client';

import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';
import { ThemeProvider } from 'next-themes';

interface ProviderProps {
    children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
    return (
        <ReduxProvider store={store}>
            <ThemeProvider attribute="class" defaultTheme="light">
                {children}
            </ThemeProvider>
        </ReduxProvider>
    );
}
