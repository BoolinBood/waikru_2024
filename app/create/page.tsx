'use client'
import React from 'react'
import Modal from '@/components/ui/modal'
import Create from '@/components/create'

const data:TrayType = {
    _id: '',
    name: '',
    message: '',
    selectedTray: ''
}

const page = () => {
  return (
    <div>
        <Modal handleClose={() => {
            console.log('success')
        }}>
           <div className="w-full h-full grid place-items-center">
         <Create trayData={data} />
        </div>
        </Modal>
    </div>
  )
}

export default page