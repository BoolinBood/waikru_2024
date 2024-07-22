"use client"
import React, { useEffect, useState } from 'react'

const AdminPage = () => {
    const [trays, setTrays] = useState<ITray[]>([])
    const [connectionStatus, setConnectionStatus] = useState<string>('')

    const connectMongoDB = async () => {
        try {
          const response = await fetch('/api/connect')
          const data = await response.json()
          setConnectionStatus(data.message || data.error)
        } catch (error) {
          setConnectionStatus('Connect failed')
        }
    }

    const fetchTrays = async () => {
        try {
          const response = await fetch('/api/trays')
          const data = await response.json()
          setTrays(data)
        } catch (error) {
          console.error('Failed to fetch trays:', error)
        }
    }

    const deleteTray = async (id: string) => {
        try {
          const response = await fetch(`/api/trays?id=${id}`, {
            method: 'DELETE',
          });
          if (response.ok) {
            setTrays(trays.filter(tray => tray._id !== id));
          } else {
            console.error('Failed to delete tray');
          }
        } catch (error) {
          console.error('Error deleting tray:', error);
        }
      }

    useEffect(() => {
        connectMongoDB()
        fetchTrays()
    }, [])

    return (
        <div>
            <h1>Admin</h1>
            <h1>{connectionStatus}</h1>
            <h2>All trays</h2>
            <ul className='flex flex-col gap-3'>
                {trays.map((tray) => (
                    <li key={tray._id} className='flex gap-4'>
                        {tray._id} - {tray.name} - {tray.message} - {tray.selectedTray}
                        <button 
                            className='p-2 bg-red-500 text-white rounded-md hover:bg-red-400'
                            onClick={() => deleteTray(tray._id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminPage