"use client";

import React, { useState } from "react";
import DockReader from "./dock-reader";
import ContentReader from "./content-reader";
import useLocalStorageState from "use-local-storage-state";

interface Book {
  _id: string;
  title: string;
  user: string;
  author: string;
  image_url: string;
  file_path: string;
  file_url: string;
  _createdAt: string;
}

interface BookReaderProps {
  book: Book;
}

const BookReader = ({ book }: BookReaderProps) => {
  const [fontSize, setFontSize] = useState<number>(18);
  const { file_url } = book;

  const [location, setLocation] = useLocalStorageState<string | number>(
    "persist-location",
    {
      defaultValue: 0,
    }
  );

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <section className="flex-grow-[8] bg-slate-100">
        <ContentReader
          book={book}
          file_url={file_url}
          location={location}
          setLocation={setLocation}
          fontSize={fontSize}
        />
      </section>

      <div className="relative group">
        <div
          className={`absolute left-1/2 bottom-[-45px] transform -translate-x-1/2 bg-slate-100 border border-slate-300 shadow-2xl rounded-xl p-6 max-w-4xl w-3/4 transition-all duration-300 ease-in-out group-hover:bottom-2 z-50`}
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
