"use client";

import { useModal } from "@/context/ModalContext";
import Modal from "./modal";
import SelectTray from "../trays/tray.select";
import Loading from "../loading";

const ModalWrapper = () => {
  const { modalState } = useModal();

  switch (modalState) {
    case "loading":
      return (
        <Modal>
          <Loading />
        </Modal>
      );
    case "error":
      return <Modal>Error</Modal>;
    case "success":
      return <Modal>Success</Modal>;
    case "selectTray":
      return (
        <Modal>
          <SelectTray />
        </Modal>
      );
    case "createTray":
      return <Modal>Create Tray</Modal>;
    default:
      return null;
  }
};

export default ModalWrapper;
