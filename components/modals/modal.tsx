"use client";

import { AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import Backdrop from "../ui/backdrop";
import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "@/context/ModalContext";
import { motion } from "framer-motion";

interface IProps {
  children: ReactNode;
}

const dropIn = {
  hidden: {
    x: "-100vh",
    opacity: 0,
  },
  visible: {
    x: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    x: "100vh",
    opacity: 0,
  },
};

const Modal = ({ children }: IProps) => {
  const { setModalState, modalState } = useModal();

  const handleClose = () => {
    setModalState("none");
  };

  return (
    <AnimatePresence mode="wait" initial={true}>
      {modalState !== "none" && (
        <Backdrop onClick={handleClose}>
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="modal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {children}
            <button className="-close" onClick={handleClose}>
              <AiOutlineClose />
            </button>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default Modal;
