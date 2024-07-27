"use client";

import { useModal } from "@/context/ModalContext";
import Modal from "../ui/modal";
import Loading from "../loading.loykratong";
import SelectTray from "../trays/tray.select";

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
