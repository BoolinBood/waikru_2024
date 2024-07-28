"use client";
import { socket } from "@/sockets/socketClient";
import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [dbConnected, setDbConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("?");
  const [trays, setTrays] = useState<TrayType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);

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

    function onTrayUpdate(data: { trays: TrayType[], totalCount: number }) {
      if (Array.isArray(data.trays)) {
        setTrays(prevTrays => [...prevTrays, ...data.trays]);
        setTotalCount(data.totalCount);
        setHasMore(trays.length < data.totalCount);
      } else {
        console.error("Received unexpected data structure:", data);
      }
    }

    function onTrayDeleted(id: string) {
      setTrays((prevTrays) => prevTrays.filter((tray) => tray._id !== id));
    }

    if (socket.connected) {
      socket.emit("get_trays");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server_status", onServerStatus);
    socket.on("tray_update", onTrayUpdate);
    socket.on("tray_deleted", onTrayDeleted);


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
    selectedTray: string,
    callback?: () => void
  ) => {
    socket.emit("save_tray", { name, message, selectedTray }, () => {
      socket.emit("get_trays", 1);
      setCurrentPage(1);
      setTrays([]); // Clear existing trays
      if (callback) callback();
    });
  };

  const deleteTray = (id: string) => {
    socket.emit("delete_tray", id);
  };

  const loadMoreTrays = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      socket.emit("get_trays", nextPage);
      setCurrentPage(nextPage);
    }
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
        loadMoreTrays,
        hasMore,
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
