"use client";
import { useAppContext } from "@/app/context/AppContext";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";

const TrayList = () => {
  const { trays, loadMoreTrays, hasMore } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMoreTrays();
    }
  }, [isInView, hasMore]);

  return (
    <div className="w-full bg-gray-200 p-8">
      <h1 className="text-2xl font-semibold">All Trays</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Message
              </th>
              <th scope="col" className="px-6 py-3">
                Selected Tray
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
                <td className="px-6 py-4">{tray.message}</td>
                <td className="px-6 py-4">{tray.selectedTray}</td>
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

export default TrayList;