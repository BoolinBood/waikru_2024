import type { Metadata } from "next";
import { AppProvider } from "../context/AppContext";
import { ModalProvider } from "../context/ModalContext";
import { Inter } from "next/font/google";

import ModalWrapper from "@/src/components/modals/modal.wrapper";

const inter = Inter({ subsets: ["latin"] });

import "@/src/styles/index.scss";
import "@/src/styles/globals.css";
import ClientProviders from "../components/providers/client-provider";

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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
