"use client";

import React, { useEffect, useRef, useState } from "react";
import { ReactReader, ReactReaderStyle } from "react-reader";
import type { Rendition } from "epubjs";
import Link from "next/link";
import { Home, MinusCircle, PlusCircle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface BookReaderProps {
  file: { url: string };
}

type ITheme = "light" | "dark";

function updateTheme(rendition: Rendition, theme: ITheme) {
  const themes = rendition.themes;
  switch (theme) {
    case "dark": {
      themes.override("color", "#fff");
      themes.override("background", "#000");
      break;
    }
    case "light": {
      themes.override("color", "#000");
      themes.override("background", "#fff");
      break;
    }
  }
}

const BookReader = ({ file }: BookReaderProps) => {
  const [location, setLocation] = useState<string | number>(0);
  const rendition = useRef<Rendition | undefined>(undefined);
  const [theme, setTheme] = useState<ITheme>("dark");
  const [fontSize, setFontSize] = useState<number>(16);

  useEffect(() => {
    if (rendition.current) {
      updateTheme(rendition.current, theme);
      // Apply the font size dynamically
      rendition.current.themes.fontSize(`${fontSize}px`);
    }
  }, [theme, fontSize]); // Update when theme or fontSize changes

  const increaseFontSize = () => {
    setFontSize((prevSize) => Math.min(prevSize + 2, 24)); // Limit max size to 24px
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => Math.max(prevSize - 2, 12)); // Limit min size to 12px
  };

  return (
    <div className={`h-screen ${theme === "dark" ? "bg-[#000]" : "bg-[#fff]"}`}>
      {/* Navbar for other stuff and buttons */}
      <div className="w-full h-[54px] mx-auto px-2 sm:px-3 lg:px-4">
        <div className="relative flex items-center h-[54px]">
          <div className="flex items-center absolute left-0">
            <Link className="z-50" href={"/"}>
              <Home
                className={`w-6 h-6 ${theme === "dark" ? "text-[#fff]" : "text-[#000]"}`}
              />
            </Link>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <MinusCircle
              onClick={decreaseFontSize}
              className={`w-6 h-6 ${theme === "dark" ? "text-[#fff]" : "text-[#000]"} mr-4`}
            />
            <p
              className={`${theme === "dark" ? "text-[#fff]" : "text-[#000]"} font-semibold text-lg`}
            >
              Font Size
            </p>
            <PlusCircle
              onClick={increaseFontSize}
              className={`w-6 h-6 ${theme === "dark" ? "text-[#fff]" : "text-[#000]"} ml-4`}
            />
          </div>
          <div className="absolute right-0">
            <Label
              htmlFor="dark-mode"
              className={`${theme === "dark" ? "text-[#fff]" : "text-[#000]"} font-semibold text-lg`}
            >
              Dark Mode
              <Switch
                id="dark-mode"
                className="ml-4"
                checked={theme === "dark"} // Bind to the theme state
                onCheckedChange={() =>
                  setTheme(theme === "dark" ? "light" : "dark")
                } // Toggle the theme on change
              />
            </Label>
          </div>
        </div>
      </div>

      {/* ReactReader for the book */}
      <div className="h-[calc(100vh-54px)]">
        <ReactReader
          url={file.url}
          title={"Alice in Wonderland"}
          location={location}
          locationChanged={(loc: string) => setLocation(loc)}
          readerStyles={
            theme === "dark" ? darkReaderTheme() : lightReaderTheme()
          }
          getRendition={(_rendition) => {
            updateTheme(_rendition, theme);
            rendition.current = _rendition;
            // Apply font size to the rendition
            rendition.current.themes.fontSize(`${fontSize}px`);
          }}
        />
      </div>
    </div>
  );
};

const lightReaderTheme = () => ({
  ...ReactReaderStyle,
  readerArea: {
    ...ReactReaderStyle.readerArea,
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: "black",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    fontSize: "16px",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "black",
  },
});

const darkReaderTheme = () => ({
  ...ReactReaderStyle,
  arrow: {
    ...ReactReaderStyle.arrow,
    color: "white",
  },
  arrowHover: {
    ...ReactReaderStyle.arrowHover,
    color: "#ccc",
  },
  readerArea: {
    ...ReactReaderStyle.readerArea,
    backgroundColor: "#000",
    transition: undefined,
  },
  titleArea: {
    ...ReactReaderStyle.titleArea,
    color: "#ccc",
    fontSize: "24px",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  tocArea: {
    ...ReactReaderStyle.tocArea,
    background: "#111",
    fontSize: "16px",
  },
  tocButtonExpanded: {
    ...ReactReaderStyle.tocButtonExpanded,
    background: "#222",
  },
  tocButtonBar: {
    ...ReactReaderStyle.tocButtonBar,
    background: "#fff",
  },
  tocButton: {
    ...ReactReaderStyle.tocButton,
    color: "white",
  },
});

export default BookReader;
