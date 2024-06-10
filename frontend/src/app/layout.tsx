"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ConfigProvider } from 'antd';
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "@fontsource/source-code-pro";
import Providers from "@/app/provider";
import Loading from '@/components/molecules/bittensor/loading';
import NavigationBar from '@/components/organisms/navbar/navigation-bar';
import Head from '@/components/templates/head/head';
import { ColorProvider } from '@/context/color-widget-provider';
import ThemeProvider from '@/context/toggle-theme-provider';
import './globals.css';
import { store } from "@/store/index"


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <Head />
      <body>
        {
          <>
            <Providers>
              <ThemeProvider>
                <ColorProvider>
                  <ConfigProvider
                    theme={{
                      token: {
                        colorBgElevated: "#111838",
                        colorText: "white"

                      },

                      components: {
                        Input: {
                          colorPrimary: '#eb2f96',
                          colorBgElevated: '#eeeeee',
                          colorBgContainer: '#eeeeee',
                          colorBgBase: '#eeeeee',
                          colorBgLayout: '#eeeeee',
                        },
                        Button: {
                          colorText: '#111838'
                        }
                      },


                    }}
                  >
                    <NavigationBar />
                    {children}
                  </ConfigProvider>
                </ColorProvider>
              </ThemeProvider>
            </Providers>
            <ToastContainer />
          </>
        }

      </body>
    </html>
  );
}
