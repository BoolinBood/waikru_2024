"use client";

import { useAppContext } from "@/src/context/AppContext";
import { socket } from "@/src/sockets/socket.client";
import { useEffect, useState } from "react";

const handleRemoveBadWord = (word: string) => {
  socket.emit("delete_bad_word", word);
};

const BadWordPage = () => {
  const { badWords } = useAppContext();

  const [filteredWords, setFilteredWords] = useState<string[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    if (query === "" || query === undefined) {
      setFilteredWords(badWords);
      return;
    }

    setFilteredWords(badWords.filter((word) => word.includes(query)));
  }, [query, badWords]);

  return (
    <div className="w-full h-screen bg-gray-200 p-8 overflow-scroll">
      <div className="my-4">
        <a
          href="/kmutt-sit-sit-admin-123 "
          className="px-4 py-2 rounded bg-red-500 text-white"
        >
          Click to go to admin page
        </a>
      </div>

      <div className="p-4 border-2 border-fuchsia-600">
        <h1 className="text-3xl font-bold">Search your badword</h1>
        <input
          onChange={(e) => setQuery(e.target.value)}
          className="p-2 m-2 w-full md:w-auto"
          placeholder="Search your badword here"
        />
      </div>

      <div className="p-4 border-2 border-pink-600">
        <h1 className="text-3xl font-bold">Current Bad Words</h1>

        <ul>
          {filteredWords.map((word, index) => (
            <li
              key={index}
              className="p-2 m-2 bg-gray-500 text-white rounded flex 
                items-center
                justify-between"
            >
              <span className="text-white">{word}</span>
              <span
                className="p-2 m-2 bg-red-500 text-white rounded"
                onClick={() => handleRemoveBadWord(word)}
              >
                Remove
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BadWordPage;
