"use client";

import React, { useState } from "react";
import DockReader from "./dock-reader";

interface Book {
  _id: string;
  title: string;
  user: string;
  author: string;
  image_url: string;
  file_id: string;
  _createdAt: string;
}

interface File {
  _id: string;
  originalFilename: string;
  url: string;
  size: number;
  extension: string;
  _createdAt: string;
}

interface BookReaderProps {
  book: Book;
  file: File;
}

const BookReader = ({ book, file }: BookReaderProps) => {
  const [fontSize, setFontSize] = useState<number>(16);
  const file_url = file.url;
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <section className="flex-grow-[8] bg-slate-100"></section>

      <div className="relative group">
        <div
          className={`absolute left-1/2 bottom-[-45px] transform -translate-x-1/2 bg-slate-200 border border-slate-400 shadow-2xl rounded-xl p-6 max-w-4xl w-3/4 transition-all duration-300 ease-in-out group-hover:bottom-2`}
        >
          <DockReader
            fontSize={fontSize}
            setFontSize={setFontSize}
            file_url={file_url}
          />
        </div>
      </div>
    </div>
  );
};

export default BookReader;
