import React, { useState } from "react";
import { CgClose, CgChevronLeft } from "react-icons/cg";
import { Inter } from "next/font/google";

interface Props {
  trayData: TrayType;
}


enum Faculty {
  IT,
  CS,
  DSI,
}

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });

const Create: React.FC<Props> = ({ trayData }) => {
  const [selectedTag, setSelectedTag] = useState<Faculty>(Faculty.IT);

  const handleTagClick = (tag: Faculty) => {
    if (selectedTag != tag) {
      setSelectedTag(tag);
    }
  };

  return (
    <div 
    className={`min-w-[200px] max-w-[350px] bg-white rounded-[32px] p-6 flex flex-col items-center gap-4 ${inter.className}`}>
      {/* Close button and flower section */}
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <CgChevronLeft size={32} />
          <div className="font-bold">back</div>
        </div>
        <div>
          <CgClose size={24} />
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-4">
        <div>
          <img
            src="/assets/seemore/flower.svg"
            alt="flower"
            width={56}
            height={56}
          />
        </div>
        <div>
          <div className="text-bold text-xl">{trayData.selectedTray}</div>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full  border-b-[1px] border-b-slate-200 placeholder:text-sm"
          />
        </div>
      </div>

      {/* Tag section */}
      <div className="self-start">
        <div className="mb-2">Tag</div>
        <div className="flex gap-4">
          <button
            type="button"
            className={`rounded-full bg-[#FC6C8D] px-3 py[2px] text-white font-bold ${selectedTag == Faculty.IT ? "" : "opacity-40"}`}
            onClick={() => handleTagClick(Faculty.IT)}
          >
            <h1>IT</h1>
          </button>
          <button
            type="button"
            className={`rounded-full bg-[#A297C0] px-3 py[2px] text-white font-bold ${selectedTag == Faculty.CS ? "" : "opacity-40"}`}
            onClick={() => handleTagClick(Faculty.CS)}
          >
            <h1>CS</h1>
          </button>
          <button
            type="button"
            className={`rounded-full bg-[#8DB0C4] px-3 py[2px] text-white font-bold ${selectedTag == Faculty.DSI ? "" : "opacity-40"}`}
            onClick={() => handleTagClick(Faculty.DSI)}
          >
            <h1>DSI</h1>
          </button>
        </div>
      </div>

      {/* Textarea section */}
      <textarea
        name="message"
        id="message-input"
        placeholder="Write your message here"
        className="h-[148px] p-2 rounded-md w-full outline outline-[2px] outline-slate-300 resize-none"
      />

      {/* Submit button */}
      <div className="component-bottom">
        <button className="btn" type="submit">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Create;
