"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../ui/button";
import { useModal } from "@/context/ModalContext";

const CommentFloatButton = () => {
  const { setModalState } = useModal();

  const handleClick = () => {
    setModalState("selectTray");
  };
  return (
    <Button onClick={handleClick}>
      <h1>Create pedestal tray</h1>
      <AiOutlinePlus />
    </Button>
  );
};

export default CommentFloatButton;
