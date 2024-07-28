"use client";
import { socket } from "@/sockets/socket";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
  const [transport, setTransport] = useState("?");
  const [trays, setTrays] = useState<TrayType[]>([]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("get_trays");
      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setDbConnected(false);
      setTransport("?");
    }

    function onServerStatus(status: {
      isConnected: boolean;
      dbConnected: boolean;
    }) {
      setIsConnected(status.isConnected);
      setDbConnected(status.dbConnected);
    }

    function onTrayUpdate(data: TrayType | TrayType[]) {
      if (Array.isArray(data)) {
        setTrays(data);
      } else {
        setTrays((prevTrays) => [...prevTrays, data]);
      }
    }

    function onTrayDeleted(id: string) {
      setTrays((prevTrays) => prevTrays.filter((tray) => tray._id !== id));
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server_status", onServerStatus);
    socket.on("tray_update", onTrayUpdate);
    socket.on("tray_deleted", onTrayDeleted);

    if (socket.connected) {
      socket.emit("get_trays");
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server_status", onServerStatus);
      socket.off("tray_update", onTrayUpdate);
      socket.off("tray_deleted", onTrayDeleted);
    };
  }, []);

  const saveTray = (
    name: string,
    message: string,
    flower: FlowerType,
    dept: "IT" | "CS" | "DSI",
    callback?: () => void
  ) => {
    socket.emit("save_tray", { name, message, flower, dept }, () => {
      if (callback) callback();
    });
  };

  const deleteTray = (id: string) => {
    socket.emit("delete_tray", id);
  };

  return (
    <AppContext.Provider
      value={{
        isConnected,
        dbConnected,
        transport,
        trays,
        saveTray,
        deleteTray,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
