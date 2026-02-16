"use client"

import React from "react";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { Roboto } from 'next/font/google'
import { Toaster } from "react-hot-toast";
import 'dayjs/locale/id';
import Providers from "./providers";


const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <AppRouterCacheProvider>
            <Toaster
              position="bottom-center"
              toastOptions={{
                // Define default options
                icon: undefined,
                className: '',
                duration: 5000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },

                // Default options for specific types
                success: {
                  duration: 5000,
                  style: {
                    background: '#5cb85c',
                  },
                },
                error: {
                  duration: 3000,
                  style: {
                    background: '#ff0505',
                  },
                },
              }}
            />
            {children}
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
