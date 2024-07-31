import { useEffect, useState, useCallback } from "react";
import { useAppContext } from "@/context/AppContext";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";
import debounce from "lodash/debounce";

const DEPARTMENTS = ["IT", "CS", "DSI"] as const;
type Dept = (typeof DEPARTMENTS)[number];

const CommentFilterButton: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const { currentDept, changeDept } = useAppContext();

  const selectedDepts =
    currentDept.length && currentDept.length < 3
      ? currentDept.join(", ")
      : "All";

  const handleDeptChange = (value: Dept, checked: boolean) => {
    changeDept(value, checked);
  };

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const dropdownElement = document.querySelector(".comment-filter");
      if (
        dropdownOpen &&
        dropdownElement &&
        !dropdownElement.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    },
    [dropdownOpen]
  );

  const handleScroll = useCallback(
    debounce(() => {
      const commentSection = document.querySelector(
        ".comment-section"
      ) as HTMLElement;
      setIsSticky(commentSection?.scrollTop > 200);
    }, 100),
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    const commentSection = document.querySelector(
      ".comment-section"
    ) as HTMLElement;
    commentSection?.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      commentSection?.removeEventListener("scroll", handleScroll);
    };
  }, [handleClickOutside, handleScroll]);

  return (
    <div className={`comment-filter ${isSticky ? "sticky" : ""}`}>
      <button onClick={toggleDropdown}>
        <h1>{selectedDepts}</h1>
        {dropdownOpen ? <MdArrowDropUp /> : <MdArrowDropDown />}
      </button>
      {dropdownOpen && (
        <div className="-dropdown-menu">
          {DEPARTMENTS.map((dept) => (
            <label
              key={dept}
              className={currentDept.includes(dept) ? "-checked" : ""}
            >
              <input
                type="checkbox"
                value={dept}
                checked={currentDept.includes(dept)}
                onChange={({ target: { value, checked } }) =>
                  handleDeptChange(value as Dept, checked)
                }
              />
              <span className="-checkmark">
                {currentDept.includes(dept) && <IoMdCheckmark />}
              </span>
              {dept}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentFilterButton;
