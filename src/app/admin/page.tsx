"use client";

import { useAppContext } from "@/src/context/AppContext";
import { socket } from "@/src/sockets/socket.client";
import { useState } from "react";

import React, { useEffect } from "react";

const AdminPage = () => {
  const { deleteTray } = useAppContext();
  const [trays, setTrays] = useState<TrayType[]>([]);

  useEffect(() => {
    socket.emit("get_all_trays");
    socket.on("tray_update", (updatedTrays) => {
      if (Array.isArray(updatedTrays)) {
        setTrays(updatedTrays);
      } else {
        console.error("Received non-array data for trays:", updatedTrays);
      }
    });
    return () => {
      socket.off("tray_update");
    };
  }, []);

  const handleDeleteTray = async (id: string) => {
    try {
      deleteTray(id);
      socket.emit("get_all_trays");
    } catch (error) {
      console.error("Error deleting tray:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-semibold">Role: Admin</h1>

      <h1 className="text-lg text-orange-600 font-bold mt-4">
        Amount: {trays.length} {trays.length === 1 ? "tray" : "trays"}
      </h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Dept
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Selected Tray
              </th>
              <th scope="col" className="px-6 py-3">
                Destroy
              </th>
            </tr>
          </thead>
          <tbody>
            {trays.map((tray: TrayType, i) => (
              <tr
                className={`${i % 2 !== 0 ? "bg-slate-600" : "bg-slate-800"}`}
                key={tray._id}
              >
                <th scope="row" className="px-6 py-4">
                  {tray.name}
                </th>
                <td className="px-6 py-4">{tray.dept}</td>
                <td className="px-6 py-4">{tray.message}</td>
                <td className="px-6 py-4">{tray.flower}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-red-500 hover:underline"
                    onClick={() => handleDeleteTray(tray._id as string)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;
