"use client";

import { useAppContext } from "@/app/context/AppContext";

export default function StatusInfo() {
  const { isConnected, dbConnected, transport } = useAppContext();

  return (
    <>
      <p>Socket Status: <span className="text-green-500 font-bold">{isConnected ? "connected" : "disconnected"}</span></p>
      <p>Database Status: <span className="text-green-500 font-bold">{dbConnected ? "connected" : "disconnected"}</span></p>
      <p>Transport: <span className="font-bold">{transport}</span></p>
    </>
  );
}