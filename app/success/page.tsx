"use client";
import React from "react";
import Modal from "@/components/ui/modal";
import Success from "@/components/Success";
const page = () => {
  return (
    <div>
      <Modal
        handleClose={() => {
          console.log("Success!");
        }}
      >
        <div className="w-full h-full grid place-items-center">
          <Success />
        </div>
      </Modal>
    </div>
  );
};

export default page;
