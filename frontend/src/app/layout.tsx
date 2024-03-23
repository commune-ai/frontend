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

export default function RootLayout({ children }) {
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
