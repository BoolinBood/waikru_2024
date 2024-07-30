"use client"
import { useAppContext } from "@/app/context/AppContext";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { Spinner } from "../ui/spinner";

const TrayList = () => {
  const { trays, loadMoreTrays, hasMore, currentDept, changeDept } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMoreTrays();
    }
  }, [isInView, hasMore]);

  const handleDeptChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newDept = event.target.value as Dept | "";
    changeDept(newDept === "" ? null : newDept);
  };

  return (
    <div className="w-full bg-gray-200 p-8">
      <select onChange={handleDeptChange} value={currentDept || ""}>
        <option value="">All Departments</option>
        <option value="IT">IT</option>
        <option value="CS">CS</option>
        <option value="DSI">DSI</option>
      </select>
      <h1 className="text-2xl font-semibold">All Trays ({trays.length})</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-2">
        <table className="w-full text-sm text-left rtl:text-right text-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
            <th scope="col" className="px-6 py-3">
                No.
              </th>
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
                Flower
              </th>
            </tr>
          </thead>
          <tbody>
            {trays.map((tray: TrayType, i) => (
              <tr
                className={`${i % 2 !== 0 ? "bg-slate-600" : "bg-slate-800"}`}
                key={tray._id}
              >
                <td className="px-6 py-4">{i + 1}</td>
                <td scope="row" className="px-6 py-4">
                  {tray.name}
                </td>
                <td className="px-6 py-4">{tray.dept}</td>
                <td className="px-6 py-4">{tray.message}</td>
                <td className="px-6 py-4">{tray.flower}</td>
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