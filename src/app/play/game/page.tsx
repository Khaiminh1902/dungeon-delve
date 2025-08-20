"use client";
import React from "react";

export default function GamePage() {
  return (
    <div className="flex justify-center items-center h-screen w-screen bg-black">
      <iframe
        src="/unity/index.html"
        className="w-full h-full border-0"
        allowFullScreen
      />
    </div>
  );
}
