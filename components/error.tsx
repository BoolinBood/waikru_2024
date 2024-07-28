import React from "react";
import { Inter } from "next/font/google";
import { CgClose } from "react-icons/cg";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Error = () => {
  return (
    <div className="m-6 p-3 min-w-[200px] max-w-[400px] bg-white rounded-xl flex">
      <img src="/assets/error/alert-error.svg" alt="" width={48} height={48}/>
      <div>
        <h1 className={`${inter.className} font-bold text-xl tracking-wide`}>
          Upload failed
        </h1>
        <div className="text-gray-400 mt-2">
          Something went wrong. Please try sending your response again
        </div>
        <button
          type="button"
          className="mt-4 w-full font-bold text-white py-3 bg-[#FF3D63] rounded-md"
        >
          Try again
        </button>
      </div>
      <div>
        <CgClose size={24} />
      </div>
    </div>
  );
};

export default Error;
