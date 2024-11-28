"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LogOut, Plus } from "lucide-react";

export default function Navbar() {
  // this navbar will only be rendered if the user is signed in
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? "bg-white shadow-md" : "border-b bg-white"}`}
    >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="ml-2 text-lg font-semibold">
              {/* Name of the user can go here */}
            </span>
          </div>
          <div className="flex-1 flex justify-center">
            <Button
              size="icon"
              variant="outline"
              aria-label="Add new item"
              className="shadow-md"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="default" className="flex items-center">
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
        </div>
      </div>
    </nav>
  );
}
