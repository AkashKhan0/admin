"use client";
import { useState } from "react";
import Add from "./Add";

export default function Dashboard() {

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
        <Add />
      </div>
    </div>
  );
}
