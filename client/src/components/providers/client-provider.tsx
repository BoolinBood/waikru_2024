"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Suspense } from "react";
import { AppProvider } from "@/src/context/AppContext";
import { ModalProvider } from "@/src/context/ModalContext";
import ModalWrapper from "../modals/modal.wrapper";

const queryClient = new QueryClient();

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <ModalProvider>
          {children}
          <ModalWrapper />
        </ModalProvider>
      </AppProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default ClientProviders;
