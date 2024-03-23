"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';

import { Provider } from "react-redux"
import "@fontsource/source-code-pro";

import NavigationBar from '@/components/organisms/navbar/navigation-bar';
import Footer from '@/components/templates/footer/footer';
import Head from '@/components/templates/head';
import ThemeProvider from '@/context/toggle-theme-provider';
import './globals.css';
import 'reactflow/dist/style.css';
import { store } from "@/store/index"



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener('load', handleLoad);

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      window.removeEventListener('load', handleLoad);
    };
  }, []);
  return (
    <html lang="en">
      <Head />
      <body>
                <Provider store={store}>
                  <ThemeProvider>
                    {/* <Banner /> */}
                    <NavigationBar />
                    {children}
                    <Footer />
                  </ThemeProvider>
                </Provider>
      </body>
    </html>
  );
}
