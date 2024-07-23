"use client"
import React, { useEffect, useState } from 'react'
import { connectMongoDB, fetchTrays } from '../lib/trays'


const AdminPage = () => {
    const [trays, setTrays] = useState<ITray[]>([])
    const [connectionStatus, setConnectionStatus] = useState<string>('')

    const getTrays = async () => {
      const status = await connectMongoDB();
      setConnectionStatus(status);
      const fetchedTrays = await fetchTrays();
      setTrays(fetchedTrays);
    };

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
      getTrays();
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
                            onClick={() => deleteTray(tray._id as string)}
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