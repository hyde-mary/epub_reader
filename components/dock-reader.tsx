"use client";
import { Download, HomeIcon, MinusCircle, PlusCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface DockReaderProps {
  fontSize: number;
  setFontSize: (size: number) => void;
  file_url: string;
}

const DockReader = ({ fontSize, setFontSize, file_url }: DockReaderProps) => {
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2); // Trigger parent state update
      console.log("Increasing font size to:", fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2); // Trigger parent state update
      console.log("Decreasing font size to:", fontSize - 2);
    }
  };

  return (
    <div className="w-full mx-auto px-2 sm:px-3 lg:px-4 p-1 pt-2 pb-2 text-slate-600">
      <div className="relative flex items-center">
        <div className="flex items-center absolute left-0">
          <Link href="/">
            <HomeIcon className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute inset-0 flex justify-center items-center">
          <MinusCircle
            className="w-6 h-6 mr-2 cursor-pointer"
            onClick={decreaseFontSize}
          />
          <p className="font-semibold text-lg">Font Size</p>
          <PlusCircle
            className="w-6 h-6 ml-2 cursor-pointer"
            onClick={increaseFontSize}
          />
        </div>
        <div className="absolute right-0 flex">
          <a href={file_url} download className="w-6 h-6 cursor-pointer">
            <Download className="w-6 h-6" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default DockReader;
