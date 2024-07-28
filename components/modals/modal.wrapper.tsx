"use client";

import { useModal } from "@/context/ModalContext";
import Modal from "./modal";
import SelectTray from "../trays/tray.select";
import Loading from "../loading";
import Create from "../Create";
import Success from "../Success";
import Error from "../Error";


const data: TrayType = {
  _id: "",
  name: "",
  message: "",
  selectedTray: "ixora",
};

const ModalWrapper = () => {
  const modalContext = useModal();

  switch (modalContext.modalState) {
    case "loading":
      return (
        <Modal>
          <Loading />
        </Modal>
      );
    case "error":
      return <Modal><Error /></Modal>;
    case "success":
      return (
        <Modal>
          <Success />
        </Modal>
      );
    case "selectTray":
      return (
        <Modal>
          <SelectTray />
        </Modal>
      );
    case "createTray":
      return (
        <Modal>
          <Create trayData={data} />
        </Modal>
      );
    default:
      return null;
  }
};

export default ModalWrapper;
