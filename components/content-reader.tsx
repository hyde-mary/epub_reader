"use client";

import React, { useEffect, useRef } from "react";
import { ReactReader } from "react-reader";
import type { Rendition } from "epubjs";

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
  location: string | number;
  setLocation: (location: string | number) => void;
  fontSize: number;
}

const ContentReader = ({
  book,
  file,
  location,
  setLocation,
  fontSize,
}: BookReaderProps) => {
  const file_url = file.url;
  const title = book.title;

  const rendition = useRef<Rendition | undefined>(undefined);

  useEffect(() => {
    if (rendition.current) {
      rendition.current.themes.fontSize(`${fontSize}px`);
    }
  }, [fontSize]);

  return (
    <div className="h-full">
      <ReactReader
        url={file_url}
        title={title}
        location={location}
        locationChanged={(loc: string) => setLocation(loc)}
        getRendition={(_rendition) => {
          rendition.current = _rendition;
          rendition.current.themes.fontSize(`${fontSize}px`);
        }}
      />
    </div>
  );
};

export default ContentReader;
