'use client'
import Error from "@/components/error";
import Modal from "@/components/ui/modal";
import React from "react";

const page = () => {
  return (
    <div>
      <Modal handleClose={() => {
        console.log('Error!')
      } }>
        <div className="w-full h-full grid place-items-center">
        <Error />
        </div>
      </Modal>
    </div>
  );
};

export default page;
