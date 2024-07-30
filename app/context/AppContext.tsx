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
  const [error, setError] = useState<string | null>(null);
  const [currentDept, setCurrentDept] = useState<Dept | null>(null);

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
        setTrays([]);
        setTotalCount(0);
        setHasMore(false);
      }
    }

    function onSaveError(data: { message: string }) {
      setError(data.message);
    }

    function onNewTray(newTray: TrayType) {
      setTrays(prevTrays => [newTray, ...prevTrays]);
    }
  
    function onUpdateTotalCount(count: number) {
      setTotalCount(count);
      setHasMore(trays.length < count);
    }


    function onTrayDeleted(id: string) {
      setTrays((prevTrays) => prevTrays.filter((tray) => tray._id !== id));
    }

    if (socket.connected) {
      socket.emit("get_trays", 1, currentDept);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("server_status", onServerStatus);
    socket.on("tray_update", onTrayUpdate);
    socket.on("tray_deleted", onTrayDeleted);
    socket.on("new_tray", onNewTray);
    socket.on("update_total_count", onUpdateTotalCount);
    socket.on("save_error", onSaveError);


    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server_status", onServerStatus);
      socket.off("tray_update", onTrayUpdate);
      socket.off("tray_deleted", onTrayDeleted);
      socket.off("new_tray", onNewTray);
      socket.off("update_total_count", onUpdateTotalCount);
      socket.off("save_error", onSaveError);
    };
  }, [currentDept]);

  const saveTray = (
    name: string,
    message: string,
    flower: FlowerType,
    dept: Dept,
    callback?: (result: resultMessage) => void
  ) => {
    socket.emit("save_tray", { name, message, flower, dept }, (result: resultMessage) => {
      if (!result.success) {
        setError(result.error || "Unknown error occurred");
      } else {
        setError(null);
      }
      if (callback) callback(result);
    });
  };

  const deleteTray = (id: string) => {
    socket.emit("delete_tray", id);
  };

  const loadMoreTrays = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      socket.emit("get_trays", nextPage, currentDept);
      setCurrentPage(nextPage);
    }
  };

  const changeDept = (newDept: Dept | null) => {
    setCurrentDept(newDept);
    setTrays([]); // Clear existing trays
    setCurrentPage(1); // Reset to first page
    setHasMore(true); // Reset hasMore
    socket.emit("get_trays", 1, newDept); // Fetch trays for new department
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
        error,
        setError,
        setCurrentDept,
        currentDept,
        changeDept,
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
