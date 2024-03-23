"use client";
import '@rainbow-me/rainbowkit/styles.css';
import { Provider } from "react-redux"
import "@fontsource/source-code-pro";
import NavigationBar from '@/components/organisms/navbar/navigation-bar';
import Footer from '@/components/templates/footer/footer';
import Head from '@/components/templates/head';
import ThemeProvider from '@/context/toggle-theme-provider';
import './globals.css';
import 'reactflow/dist/style.css';
import { store } from "@/store/index"

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
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
