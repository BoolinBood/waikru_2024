"use client";
import React from "react";
import { useAppContext } from "../../context/AppContext";

const AdminPage = () => {
  const { isConnected, dbConnected, transport, trays, deleteTray } =
    useAppContext();

  return (
    <div className="w-full h-screen bg-gray-200 space-y-2 p-6">
      <p className="text-blue-500 font-bold">Adminnnnnnnnnnnnnnnnnn</p>
      <p>
        Socket Status:{" "}
        <span className="text-green-500 font-bold">
          {isConnected ? "connected" : "disconnected"}
        </span>
      </p>
      <p>
        Database Status:{" "}
        <span className="text-green-500 font-bold">
          {dbConnected ? "connected" : "disconnected"}
        </span>
      </p>
      <p>
        Transport: <span className="font-bold">{transport}</span>
      </p>
      <h2>All Trays:</h2>
      <ul className="space-y-3">
        {trays.map((tray) => (
          <li key={tray._id} className="flex gap-3 items-center">
            <span>
              {tray.name} - {tray.message} - {tray.selectedTray}
            </span>
            <button
              className="text-white px-2 py-1 text-sm bg-red-500 rounded-lg hover:bg-red-500/90"
              onClick={() => deleteTray(tray._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
