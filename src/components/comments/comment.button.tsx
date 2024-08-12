"use client";
import { AiOutlinePlus } from "react-icons/ai";
import Button from "../ui/button";
import { useModal } from "@/src/context/ModalContext";
import { useMediaQuery } from "react-responsive";

const CommentFloatButton = () => {
  const { setModalState } = useModal();
  const isTablet = useMediaQuery({ query: "(min-width: 768px)" });

  const handleClick = () => {
    setModalState("selectTray");
  };
  return (
    <Button onClick={handleClick} shadow>
      <h1>{isTablet ? "Create pedestal tray" : "Create pedestal tray"}</h1>
      <div>
        <AiOutlinePlus />
      </div>
    </Button>
  );
};

export default CommentFloatButton;
