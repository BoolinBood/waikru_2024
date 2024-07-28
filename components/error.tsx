import React, { useState } from 'react';
import Image from 'next/image';

const Error = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleRetry = () => {
    console.log('Retrying...');

    retryUpload()
      .then(() => {
        console.log('Upload successful');
        setIsVisible(false); 
      })
      .catch((error) => {
        console.error('Upload failed', error);
      });
  };

  const retryUpload = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const isSuccess = Math.random() > 0.5;
        if (isSuccess) {
          resolve();
        } else {
          reject(new Error('Failed to upload'));
        }
      }, 2000);
    });
  };

  if (!isVisible) return null;

  return (
    <div className='error'>
        <div className='-box'>
          <div className='box-toper'>
              <Image src="/assets/error/icon-cross.png" alt="icon-cross" width={24} height={24} />
              <p className='upload-failed'>Upload failed</p>
          </div>
        </div>
        <p className="-text">
          Something went wrong. Please try <br />
          sending your response again
        </p>
        <button className='btn' onClick={handleRetry}>Try again</button>
    </div>
  )
}

export default Error;
