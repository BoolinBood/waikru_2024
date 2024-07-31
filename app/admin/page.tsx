"use client";

import { useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAppContext } from "@/context/AppContext";

const AdminPage = () => {
  const { trays, loadMoreTrays, hasMore, deleteTray } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isInView && hasMore) {
      loadMoreTrays();
    }
  }, [isInView, hasMore]);

  const filteredTrays = trays.filter((tray) =>
    tray.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="w-full h-screen bg-gray-200 p-8">
      <h1 className="text-2xl font-semibold">Role: Admin</h1>
      <input
        type="text"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mt-4 p-2 border rounded"
      />
      <h1 className="text-lg text-orange-600 font-bold mt-4">
        Amount: {filteredTrays.length}{" "}
        {filteredTrays.length === 1 ? "tray" : "trays"}
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
            {filteredTrays.map((tray: TrayType, i) => (
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
                    onClick={() => deleteTray(tray._id as string)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <div ref={ref} className="flex justify-center mt-5">
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default AdminPage;
