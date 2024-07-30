"use client"
import { useAppContext } from "@/app/context/AppContext";
import { useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "../ui/spinner";

const TrayList = () => {
  const { trays, loadMoreTrays, hasMore, changeDept } = useAppContext();
  const ref = useRef(null);
  const isInView = useInView(ref);
  const [selectedDepts, setSelectedDepts] = useState<Dept[]>([]);

  useEffect(() => {
    if (isInView && hasMore) {
      loadMoreTrays();
    }
  }, [isInView, hasMore]);

  const handleDeptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dept = event.target.value as Dept;
    setSelectedDepts(prevDepts => {
      if (event.target.checked) {
        return [...prevDepts, dept];
      } else {
        return prevDepts.filter(d => d !== dept);
      }
    });
  };

  const applyFilter = () => {
    changeDept(selectedDepts.length > 0 ? selectedDepts : null);
  };

  return (
    <div className="w-full bg-gray-200 p-8">
      <div className="mb-4">
        <label className="mr-2">
          <input type="checkbox" value="IT" onChange={handleDeptChange} /> IT
        </label>
        <label className="mr-2">
          <input type="checkbox" value="CS" onChange={handleDeptChange} /> CS
        </label>
        <label className="mr-2">
          <input type="checkbox" value="DSI" onChange={handleDeptChange} /> DSI
        </label>
        <button onClick={applyFilter} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded">
          Apply Filter
        </button>
      </div>
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