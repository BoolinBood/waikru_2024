"use client";

import { useEffect, useState, FormEvent } from "react";
import { socket } from "./lib/socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTray, setSelectedTray] = useState("");
  const [trays, setTrays] = useState<ITray[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("get_trays"); // Request trays on connection
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setDbConnected(false);
      setTransport("N/A");
    }

    function onServerStatus(status: { isConnected: boolean; dbConnected: boolean }) {
      setIsConnected(status.isConnected);
      setDbConnected(status.dbConnected);
    }

    function onTrayUpdate(data: ITray | ITray[]) {
      if (Array.isArray(data)) {
        setTrays(data);
      } else {
        setTrays((prevTrays) => [...prevTrays, data]);
      }
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server_status", onServerStatus);
    socket.on("tray_update", onTrayUpdate);
    if (socket.connected) {
      socket.emit("get_trays");
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server_status", onServerStatus);
      socket.off("tray_update", onTrayUpdate);
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    socket.emit("save_tray", { name, message, selectedTray });
    setName("");
    setMessage("");
    setSelectedTray("");
  };

  return (
    <div className="w-full h-screen bg-gray-200 space-y-2 p-6">
      <p>Socket Status: <span className="text-green-500 font-bold">{isConnected ? "connected" : "disconnected"}</span></p>
      <p>Database Status: <span className="text-green-500 font-bold">{dbConnected ? "connected" : "disconnected"}</span></p>
      <p>Transport: <span className="font-bold">{transport}</span></p>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-sm px-2"
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
          className="rounded-sm px-2"
        />
        <select
          value={selectedTray}
          onChange={(e) => setSelectedTray(e.target.value)}
          required
          className="rounded-sm p-1"
        >
          <option value="">Select a tray</option>
          <option value="Tray1">Tray 1</option>
          <option value="Tray2">Tray 2</option>
          <option value="Tray3">Tray 3</option>
        </select>
        <button type="submit" className="bg-blue-600 px-4 py-1 text-white rounded-md hover:bg-blue-600/90">Submit</button>
      </form>

      <div>
        <h2>Trays:</h2>
        <ul>
          {trays.map((tray) => (
            <li key={tray._id}>
              {tray.name} - {tray.message} - {tray.selectedTray}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}