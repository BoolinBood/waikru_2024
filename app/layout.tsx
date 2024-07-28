import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext";
import { ModalProvider } from "../context/ModalContext";
import { Suspense } from "react";
import { Inter } from "next/font/google";

import Loading from "@/components/loading/loading";
import ModalWrapper from "@/components/modals/modal.wrapper";

const inter = Inter({ subsets: ["latin"] });

import "@/styles/index.scss";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "SIT Waikru | SIT ไหว้ครู",
  description: "SIT Waikru | SIT ไหว้ครู",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ModalProvider>
            <Suspense fallback={<Loading />}>{children}</Suspense>
            <ModalWrapper />
          </ModalProvider>
        </AppProvider>
      </body>
    </html>
  );
}
