import React from 'react';
import type {Metadata} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";
import {AppStoreProvider} from '@/state/AppStoreProvider';
import {Toaster} from 'react-hot-toast';
import './globals.css';

export const metadata: Metadata = {
    title: 'Submit Your Review',
    description: 'Give your review',

};

const RootLayout = ({children}: Readonly<{ children: React.ReactNode; }>) => {

    return (
        <html lang={'en'}>
        <body>
        <AppRouterCacheProvider options={{key: 'css'}}>
            <AppStoreProvider>
                    {children}
            </AppStoreProvider>
            <Toaster position='bottom-center'/>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
export default RootLayout;
