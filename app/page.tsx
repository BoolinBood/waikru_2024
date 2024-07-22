"use client"
import React, { useEffect, useState } from 'react'


const Page = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('')
  const [formData, setFormData] = useState<ITray>({ _id:'',name: '', message: '', selectedTray: '' })
  const [trays, setTrays] = useState<ITray[]>([])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/trays', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        const result = await response.json()
        console.log('Success:', result)
        setFormData({ _id:'', name: '', message: '', selectedTray: '' })
        fetchTrays()
      } else {
        const errorData = await response.json()
        console.error('Error:', errorData)
      }
    } catch (error) {
      console.error('Failed to submit form:', error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    connectMongoDB()
    fetchTrays()
  }, [])

  return (
    <div>
      <h1>MongoDB Connection Status</h1>
      <p>{connectionStatus}</p>

      <h2>Add New Tray</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          type="text"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
        />
        <select
          name="selectedTray"
          value={formData.selectedTray}
          onChange={handleChange}
          required
        >
          <option value="">Select a tray</option>
          <option value="Tray1">Tray 1</option>
          <option value="Tray2">Tray 2</option>
          <option value="Tray3">Tray 3</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      <h2>Existing Trays</h2>
      <ul>
        {trays.map((tray, index) => (
          <li key={index}>
            {tray._id} - {tray.name} - {tray.message} - {tray.selectedTray}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Page