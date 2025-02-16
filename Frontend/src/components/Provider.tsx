'use client';

import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store/store';

const NoSSRThemeProvider = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
);

interface ProviderProps {
  children: ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  return (
    <ReduxProvider store={store}>
      <NoSSRThemeProvider attribute="class" defaultTheme="light">
        {children}
      </NoSSRThemeProvider>
    </ReduxProvider>
  );
}
