"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";
import { SignOut } from "@/components/signout-button";
import { redirect } from "next/navigation";

// so that ts is happy
type NavbarProps = {
  username?: string | null | undefined;
  image: string | null | undefined;
};

const Navbar: React.FC<NavbarProps> = ({ username, image }) => {
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
      <div className="max-w-full max-h-[64px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-16">
          <div className="flex items-center absolute left-0">
            {/* Name of the user can go here */}
            {image && (
              <Image
                src={image}
                alt={`${username}'s profile`}
                width={35}
                height={35}
                className="rounded-full border-2 border-slate-300 shadow-lg"
              />
            )}
            <p className="text-lg font-semibold ml-4">{username}</p>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <Button
              size="icon"
              variant="outline"
              aria-label="Add new item"
              className="shadow-md border-slate-400"
              onClick={() => redirect("/upload")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute right-0">
            <SignOut />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
