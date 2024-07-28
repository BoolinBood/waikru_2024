"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

type ModalState =
  | "selectTray"
  | "createTray"
  | "viewTray"
  | "error"
  | "loading"
  | "success"
  | "none";

interface ModalContextProps {
  modalState: ModalState;
  setModalState: (state: ModalState) => void;
  selectedFlower: string;
  setSelectedFlower: (flower: string) => void;
  selectedTray: TrayType | undefined;
  setSelectedTray: (tray: TrayType | undefined) => void;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modalState, setModalState] = useState<ModalState>("success");
  const [selectedFlower, setSelectedFlower] = useState<string>("");
  const [selectedTray, setSelectedTray] = useState<TrayType | undefined>(
    undefined
  );

  return (
    <ModalContext.Provider
      value={{
        modalState,
        setModalState,
        selectedFlower,
        setSelectedFlower,
        selectedTray,
        setSelectedTray,
      }}
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
