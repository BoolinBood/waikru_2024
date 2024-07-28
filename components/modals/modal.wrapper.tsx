"use client";

import { useModal } from "@/context/ModalContext";
import Modal from "./modal";
import SelectTray from "../trays/tray.select";
import Loading from "../loading/loading";
import CreateComment from "../trays/tray.create";
import Error from "../error";
import Success from "../success";
import CommentView from "../comments/comment.view";
import { AnimatePresence } from "framer-motion";

const ModalWrapper = () => {
  const { modalState, selectedTray, selectedFlower } = useModal();

  return (
    <AnimatePresence mode="wait" initial={true}>
      {modalState !== "none" && (
        <>
          {modalState === "loading" && (
            <Modal>
              <Loading />
            </Modal>
          )}
          {modalState === "error" && (
            <Modal>
              <Error />
            </Modal>
          )}
          {modalState === "success" && (
            <Modal closeButton={false}>
              <Success />
            </Modal>
          )}
          {modalState === "selectTray" && (
            <Modal>
              <SelectTray />
            </Modal>
          )}
          {modalState === "viewTray" && selectedTray && (
            <Modal>
              <CommentView tray={selectedTray} />
            </Modal>
          )}
          {modalState === "createTray" && selectedFlower && (
            <Modal closeButton={false}>
              <CreateComment selectedFlower={selectedFlower as FlowerType} />
            </Modal>
          )}
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
