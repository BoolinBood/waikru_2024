"use client";
import { useState, FormEvent } from "react";
import { useAppContext } from "@/app/context/AppContext";

const TrayForm = () => {
  const { saveTray, error, setError } = useAppContext();
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [flower, setFlower] = useState<FlowerType>("");
  const [dept, setDept] = useState<Dept>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!dept.length) {
      setError("Please select at least one department");
      return;
    }
    setIsLoading(true);
    saveTray(name, message, flower, dept, (result) => {
      setIsLoading(false);
      if (result.success) {
        setName("");
        setMessage("");
        setFlower("");
        setDept("");
        setError(null);
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
          className="rounded-sm px-2"
        />

        <div className="flex flex-wrap gap-3">
          {["IT", "CS", "DSI"].map((d) => (
            <label key={d}>
              <input
                type="radio"
                name="dept"
                value={d}
                checked={dept === d}
                onChange={() => setDept(d as Dept)}
              />
              {d}
            </label>
          ))}
        </div>

        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          required
          className="rounded-sm px-2"
        />
        <select
          value={flower}
          onChange={(e) => setFlower(e.target.value as FlowerType)}
          required
          className="rounded-sm p-1"
        >
          <option value="">Select a flower</option>
          <option value="ixora">ixora</option>
          <option value="eggplant">eggplant</option>
          <option value="marigold">marigold</option>
        </select>
        <button
          type="submit"
          className="bg-blue-600 px-4 py-1 text-white rounded-md hover:bg-blue-600/90"
          disabled={isLoading}
        >
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </form>
      {error && (
        <div className="text-red-500 mt-2">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 text-blue-500 underline"
          >
            Okay
          </button>
        </div>
      )}
    </>
  );
};

export default TrayForm;
