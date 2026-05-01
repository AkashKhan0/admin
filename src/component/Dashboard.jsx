"use client";
import { useState } from "react";
import Add from "./Add";
import Edit from "./Edit";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("add");

  return (
    <div className="w-full h-full uni_col gap-5">
      <div className="fix_w uni_col">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-mono text-[#A21410]">
          A Plus Mart BD
        </h1>
        <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-mono text-[#A21410]">
          Medical
        </h3>
      </div>

      <div className="fix_w flex items-start justify-between gap-5 h-full">
        <div className="left w-[20%] h-full uni_col gap-3">
          <button
            className={`${
              activeTab === "add"
                ? "bg-[#2b2a293a] text-[#000]"
                : "bg-[#2b2a291c] hover:bg-[#2b2a291c]"
            }
            `}
            onClick={() => setActiveTab("add")}
          >
            Add
          </button>
          <button
            className={`${
              activeTab === "edit"
                ? "bg-[#2b2a293a] text-[#000]"
                : "bg-[#2b2a291c] hover:bg-[#2b2a291c]"
            }
            `}
            onClick={() => setActiveTab("edit")}
          >
            Edit
          </button>
        </div>
        <div className="right w-[80%] h-full">
          {/* image upload options */}
          {activeTab === "add" && <Add />}
          {activeTab === "edit" && <Edit />}
        </div>
      </div>
    </div>
  );
}
