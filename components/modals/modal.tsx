"use client";

import { ReactNode } from "react";
import Backdrop from "../ui/backdrop";
import { AiOutlineClose } from "react-icons/ai";
import { useModal } from "@/context/ModalContext";
import { motion } from "framer-motion";
import { MotionDiv } from "../motion.div";

interface IProps {
  children: ReactNode;
  closeButton?: boolean;
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
      duration: 0.3,
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

const Modal = ({ children, closeButton = true }: IProps) => {
  const { setModalState } = useModal();

  const handleClose = () => {
    setModalState("none");
  };

  return (
    <Backdrop onClick={handleClose}>
      <MotionDiv
        onClick={(e) => e.stopPropagation()}
        className="modal"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        layout
        exit="exit"
      >
        {children}
        {closeButton && (
          <button className="-close" onClick={handleClose}>
            <AiOutlineClose />
          </button>
        )}
      </MotionDiv>
    </Backdrop>
  );
};

export default Modal;
