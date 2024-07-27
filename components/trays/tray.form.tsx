"use client";
import { useState, FormEvent } from "react";
import { useAppContext } from "@/context/AppContext";

const TrayForm = () => {
  const { saveTray } = useAppContext();
  const [name, setName] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selectedTray, setSelectedTray] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    saveTray(name, message, selectedTray, () => {
      setIsLoading(false);
      setName("");
      setMessage("");
      setSelectedTray("");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
        className="rounded-sm px-2"
      />
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Message"
        required
        className="rounded-sm px-2"
      />
      <select
        value={selectedTray}
        onChange={(e) => setSelectedTray(e.target.value)}
        required
        className="rounded-sm p-1"
      >
        <option value="">Select a tray</option>
        <option value="Tray1">Tray 1</option>
        <option value="Tray2">Tray 2</option>
        <option value="Tray3">Tray 3</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 px-4 py-1 text-white rounded-md hover:bg-blue-600/90"
        disabled={isLoading}
      >
        {isLoading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
};

export default TrayForm;
