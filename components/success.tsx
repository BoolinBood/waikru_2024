import React, { useState } from "react";
import Image from "next/image";
const success = () => {
    const [isVisible,setIsVisible] = useState(true);

    const handleClose = () =>{
        setIsVisible(false);
    }
    if(!isVisible){
        return null;
    }
  return (
    <div className="-success">
      {/* <button type="button" className="close" onClick={handleClose}>
        <img src="/assets/success/vector_close.svg" alt="close" />
      </button> */}
      <div className="success-icon">
        <img
          src="/assets/success/check-one.svg"
          alt="icon-close"
          width={36}
          height={36}
        />
        <h1 className="upload-success">Upload Successful</h1>
        <p className="subtext">your message has already been posted.</p>
      </div>
    </div>
  );
};

export default success;
