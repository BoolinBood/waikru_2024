'use client'
import { useModal } from "@/context/ModalContext";
import React from "react";

const page = () => {

  const modalContext = useModal();

  modalContext.setModalState("error");
  
  return (
    <div>
    </div>
  );
};

export default page;
