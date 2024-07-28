"use client";
import React, { useContext } from "react";
import Create from "@/components/Create";
import Modal from "@/components/modals/modal";
import { useModal } from "@/context/ModalContext";

const page = () => {
  const modalContext = useModal();

  modalContext.setModalState("createTray");

  return <div></div>;
};

export default page;
