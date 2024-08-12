import { useCallback } from "react";
import { useModal } from "../context/ModalContext";
import Image from "next/image";

const Error = () => {
  const { setModalState } = useModal();

  const handleClose = useCallback(() => {
    setModalState("none");
  }, [setModalState]);

  const handleTryAgain = useCallback(() => {
    setModalState("selectTray");
  }, [setModalState]);

  return (
    <div className="m-6 p-3 min-w-[200px] max-w-[400px] bg-white rounded-xl flex flex-col ">
      <div
        className=" gap-2 flex justify-start items-center hover:cursor-pointer"
        onClick={handleClose}
      >
        <Image
          src="/assets/error/alert-error.svg"
          alt="error"
          width={48}
          height={48}
        />
        <h1 className={`font-bold text-xl tracking-wide`}>Upload failed</h1>
      </div>
      <div className="text-center">
        <div className="text-gray-400 mt-2">
          Something went wrong. Please try sending your response again
        </div>
        <div>
          <button
            type="button"
            className="flex justify-center items-center mt-4 w-full font-bold text-white py-3 bg-[#FF3D63] rounded-md"
            onClick={handleTryAgain}
          >
            Try again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error;
