"use client"
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [connectionStatus, setConnectionStatus] = useState<string>('')

  useEffect(() => {
    const connectMongoDB = async () => {
      try {
        const response = await fetch('/api/connect')
        const data = await response.json()
        setConnectionStatus(data.message || data.error)
      } catch (error) {
        setConnectionStatus('Failed to connect')
      }
    }

    connectMongoDB()
  }, [])

  return (
    <div>
      <h1>MongoDB Connection Status</h1>
      <p>{connectionStatus}</p>
    </div>
  )
}

export default Page