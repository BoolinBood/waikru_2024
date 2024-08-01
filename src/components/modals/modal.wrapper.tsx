"use client";

import dynamic from "next/dynamic";
import { useModal } from "@/src/context/ModalContext";
import { AnimatePresence } from "framer-motion";

// Dynamically import components for lazy loading
const Modal = dynamic(() => import("./modal"));
const SelectTray = dynamic(() => import("../trays/tray.select"));
const Loading = dynamic(() => import("../loading/loading"));
const CreateComment = dynamic(() => import("../trays/tray.create"));
const Error = dynamic(() => import("../error"));
const Success = dynamic(() => import("../success"));
const CommentView = dynamic(() => import("../comments/comment.view"));

const ModalWrapper = () => {
  const { modalState, selectedTray, selectedFlower } = useModal();

  const renderModalContent = () => {
    switch (modalState) {
      case "loading":
        return <Loading />;
      case "error":
        return <Error />;
      case "success":
        return <Success />;
      case "selectTray":
        return <SelectTray />;
      case "viewTray":
        return selectedTray ? <CommentView tray={selectedTray} /> : null;
      case "createTray":
        return selectedFlower ? (
          <CreateComment selectedFlower={selectedFlower as FlowerType} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      {modalState !== "none" && (
        <Modal
          closeButton={modalState !== "success" && modalState !== "createTray"}
        >
          {renderModalContent()}
        </Modal>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
