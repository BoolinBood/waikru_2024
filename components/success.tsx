import { Inter } from "next/font/google";
import React, { useState } from "react";

const inter = Inter({subsets: ["latin"], weight: ["400", "700"]})

const Success = () => {
    const [isVisible,setIsVisible] = useState(true);

    const handleClose = () =>{
        setIsVisible(false);
    }
    if(!isVisible){
        return null;
    }
  return (
    <div className={`-success p-3`}>
      {/* <button type="button" className="close" onClick={handleClose}>
        <img src="/assets/success/vector_close.svg" alt="close" />
      </button> */}
      <div className={`success-icon ${inter.className}`}>
        <img
          src="/assets/success/check-one.svg"
          alt="icon-close"
          width={36}
          height={36}
        />
        <h1 className="text-xl font-bold">Upload Successful</h1>
        <p className="text-gray-400">your message has already been posted.</p>
      </div>
    </div>
  );
};

export default Success;
