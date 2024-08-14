"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { socket } from "@/src/sockets/socket.client";

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
  const [currentDept, setCurrentDept] = useState<Dept[]>([]);
  const [isReadOnly, setIsReadOnly] = useState<boolean>(false);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.emit("get_trays", currentDept);
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

    function onTrayUpdate(data: { trays: TrayType[]; totalCount: number }) {
      if (Array.isArray(data.trays)) {
        const filteredTrays = data.trays.filter(
          (tray) => currentDept.length === 0 || currentDept.includes(tray.dept)
        );
        setTrays((prevTrays) => {
          const newTrays = [...prevTrays, ...filteredTrays];
          setTotalCount(data.totalCount);
          setHasMore(newTrays.length < data.totalCount);
          return newTrays;
        });
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
      const isDeptMatch =
        currentDept.length === 0 || currentDept.includes(newTray.dept);
      if (isDeptMatch) {
        setTrays((prevTrays) => [newTray, ...prevTrays]);
      }
    }

    function onUpdateTotalCount(count: number) {
      setTotalCount(count);
      setHasMore(trays.length < count);
    }

    function onTrayDeleted(id: string) {
      setTrays((prevTrays) => prevTrays.filter((tray) => tray._id !== id));
    }

    function onReadOnlyStatus(status: boolean) {
      setIsReadOnly(status);
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
    socket.on("read_only_status", onReadOnlyStatus);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("server_status", onServerStatus);
      socket.off("tray_update", onTrayUpdate);
      socket.off("tray_deleted", onTrayDeleted);
      socket.off("new_tray", onNewTray);
      socket.off("update_total_count", onUpdateTotalCount);
      socket.off("save_error", onSaveError);
      socket.off("read_only_status", onReadOnlyStatus);
    };
  }, [currentDept]);

  const saveTray = (
    name: string,
    message: string,
    flower: FlowerType,
    dept: Dept,
    degree?: Degree,
    callback?: (result: resultMessage) => void
  ) => {
    if (isReadOnly) {
      setError("Database is currently in read-only mode.");
      if (callback)
        callback({ success: false, error: "Database is in read-only mode" });
      return;
    }

    socket.emit(
      "save_tray",
      { name, message, flower, dept, degree },
      (result: resultMessage) => {
        if (!result.success) {
          setError(result.error || "Unknown error occurred");
        } else {
          setError(null);
        }
        if (callback) callback(result);
      }
    );
  };

  const deleteTray = (id: string) => {
    if (isReadOnly) {
      setError("Database is currently in read-only mode.");
      return;
    }
    socket.emit("delete_tray", id);
  };

  const loadMoreTrays = () => {
    if (hasMore) {
      const nextPage = currentPage + 1;
      socket.emit("get_trays", nextPage, currentDept);
      setCurrentPage(nextPage);
    }
  };

  const handleChangeTag = (dept: Dept) => {
    setCurrentDept((prevDepts) => {
      const updatedDepts = prevDepts.includes(dept)
        ? prevDepts.filter((d) => d !== dept)
        : [...prevDepts, dept];

      socket.emit("get_trays", 1, updatedDepts);

      setCurrentPage(1);
      setTrays([]);
      setHasMore(true);
      return updatedDepts;
    });
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
        currentDept,
        setCurrentDept,
        handleChangeTag,
        isReadOnly,
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
