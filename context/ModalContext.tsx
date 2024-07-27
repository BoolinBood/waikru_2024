"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalState =
  | "selectTray"
  | "createTray"
  | "error"
  | "loading"
  | "success"
  | "none";

interface ModalContextProps {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  selectedFlower: string;
  setSelectedFlower: (flower: string) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>("none");
  const [selectedFlower, setSelectedFlower] = useState<string>("");

  return (
    <ModalContext.Provider
      value={{ modalState, setModalState, selectedFlower, setSelectedFlower }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
