'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import See from '@/components/see'

const trayData:TrayType = {
  _id: '',
  name: '',
  message: '',
  selectedTray: ''
}


const page = () => {
  return (
    <div>
      <Modal handleClose={() => {
        console.log('See more!')
       
      } }>
        <div className="w-full h-full grid place-items-center">
        <See tray={trayData} />
        </div>
      </Modal>
    </div>
  );
};

export default page;