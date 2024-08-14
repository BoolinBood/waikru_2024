"use client";

import { useAppContext } from "@/src/context/AppContext";
import { socket } from "@/src/sockets/socket.client";
import { useCallback, useState } from "react";

import React, { useEffect } from "react";

const AdminPage = () => {
  const { deleteTray, isReadOnly, badWords } = useAppContext();
  const [trays, setTrays] = useState<TrayType[]>([]);
  const [badWord, setBadWord] = useState<string>("");

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

  const handleDeleteTray = useCallback(
    (id: string) => {
      deleteTray(id);
    },
    [deleteTray]
  );

  const handleInputChanged = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBadWord(e.target.value);
    },
    []
  );

  const handleAddBadword = useCallback(
    (word: string) => {
      if (word) {
        if (badWords.includes(word)) {
          alert("This word is already in the list");
          return;
        }

        socket.emit("add_bad_word", word);
        alert("Badword added successfully");
        setBadWord("");
      }
    },
    [badWords]
  );

  const toggleReadOnly = () => {
    socket.emit("toggle_read_only", !isReadOnly);
  };

  return (
    <div className="w-full h-screen bg-gray-200 p-8 overflow-scroll">
      <div className="border-green-400 border-2 p-4">
        <h1 className="mt-2">Read only Section</h1>
        <button
          onClick={toggleReadOnly}
          className={`mt-2 px-4 py-2 rounded ${
            !isReadOnly ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          Click to {isReadOnly ? "disable" : "enable"} Read-Only Mode
        </button>
      </div>

      <div className="my-4 border-red-400 border-2 p-4">
        <h1>Badword Section</h1>
        <input
          onChange={handleInputChanged}
          placeholder="Add your badword here"
          className="p-4 w-full md:w-auto"
        />
        <div className="my-4">
          <button
            onClick={() => handleAddBadword(badWord)}
            className="px-4 py-2 rounded bg-green-500 text-white"
          >
            Click to add a new badword
          </button>
        </div>

        <div className="my-4">
          <a
            href="/kmutt-badwords"
            className="px-4 py-2 rounded bg-orange-500 text-white"
          >
            Click to go badword page
          </a>
        </div>
      </div>

      <div className="my-4 p-4 border-blue-500 border-2">
        <h1 className="text-2xl font-semibold">Role: Admin</h1>

        <h1 className="text-lg text-orange-600 font-bold mt-4">
          Amount: {trays.length} {trays.length === 1 ? "tray" : "trays"}
        </h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2 overflow-scroll">
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
            <tbody className="overflow-auto">
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
    </div>
  );
};

export default AdminPage;
