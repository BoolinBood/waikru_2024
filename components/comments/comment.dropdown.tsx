import React, { useEffect, useState } from 'react'
import { useAppContext } from "@/context/AppContext";

const CommentFiterButton = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { currentDept, changeDept,  } = useAppContext();


    const handleDeptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        console.log("value " + value)
        changeDept(value as Dept, checked);
      };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const isAllSelected = ["IT", "CS", "DSI"].every(dept => currentDept.includes(dept as Dept));
    const selectedDepts = isAllSelected ? "All" : (currentDept.length ? currentDept.join(", ") : "All");
     console.log("selectedDepts" + selectedDepts)
     console.log("currentDept" + currentDept)

  return (
    <div className="dept-filter">
        <button onClick={toggleDropdown}>
          {selectedDepts}
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <label>
              <input
                type="checkbox"
                value="IT"
                checked={currentDept.includes("IT")} 
                onChange={handleDeptChange}
              />
              IT
            </label>
            <label>
              <input
                type="checkbox"
                value="CS"
                checked={currentDept.includes("CS")}
                onChange={handleDeptChange}
              />
              CS
            </label>
            <label>
              <input
                type="checkbox"
                value="DSI"
                checked={currentDept.includes("DSI")}
                onChange={handleDeptChange}
              />
              DSI
            </label>
          </div>
        )}
      </div>
  )
}

export default CommentFiterButton;