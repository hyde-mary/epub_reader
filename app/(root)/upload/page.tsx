"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book, BookUser, ImageIcon, Upload, UploadIcon } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default function AuthForm() {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  return (
    <div className="container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      {/* LEFT SIDE */}
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-zinc-900" />

        {/* Upload and Title */}
        <div className="relative z-20 flex items-center">
          <Upload className="mr-5 w-7 h-7" />
          <p className="text-xl font-extrabold underline">Upload Your Books</p>
        </div>

        {/* Centered Image */}
        <div className="flex flex-col items-center justify-center h-full space-y-4 z-20">
          {imageUrl ? (
            <Image
              src={`${imageUrl}`}
              alt="Book Cover"
              width={400}
              height={600}
              className="rounded-lg object-contain"
            />
          ) : (
            <Image
              src="https://cdn.dribbble.com/users/1637204/screenshots/5912295/attachments/1271645/moby-dick-book-cover-illustration-attachment.png"
              alt="Book Cover"
              width={400}
              height={600}
              className="rounded-lg object-contain"
            />
          )}
        </div>

        {/* Description Text */}
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Try inserting your image url for your cover and view it above.
              Recommended: PNGs
            </p>
            <footer className="text-sm">
              - This image will be displayed on the homepage in a card format.
              Make sure it is of good quality!
            </footer>
          </blockquote>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="lg:p-8 w-full flex items-center justify-center min-h-screen">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <form onSubmit={() => {}}>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4 underline">
              Upload your Book
            </h1>
            <p className="text-sm text-muted-foreground mb-4">
              Enter the necessary information such as the Title and Author of
              the book. <br />
            </p>
            <div className="grid gap-2">
              <div className="grid gap-1 mb-2">
                <Label
                  htmlFor="Title"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <Book className="w-4 h-4" />
                  Title:
                </Label>
                <Input
                  id="Title"
                  placeholder="Title of the Book (e.g. Moby Dick)"
                  type="text"
                  className="mt-2"
                />
              </div>
              <div className="grid gap-1 mb-2">
                <Label
                  htmlFor="Author"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <BookUser className="w-4 h-4" />
                  Author:
                </Label>
                <Input
                  id="Author"
                  placeholder="Author of the Book (e.g. Herman Melville)"
                  type="text"
                  className="mt-2"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Furthermore, you are to provide an image URL cover for your
                book. This will appear in your homepage
              </p>
              <div className="grid gap-1 mt-4">
                <Label
                  htmlFor="Author"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <ImageIcon className="w-4 h-4" />
                  Cover Image URL:
                </Label>
                <Input
                  id="Author"
                  placeholder="https://images.booksense.com/images/007/839/9781954839007.jpg"
                  type="text"
                  className="mt-2"
                  onChange={handleImageUrlChange}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-6 mb-2">
                Once you are satisfied, click the upload button below.
              </p>
              <Button>
                <UploadIcon />
                Upload Book
              </Button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or Cancel with
              </span>
            </div>
          </div>
          <Button variant="outline" type="button" onClick={() => redirect("/")}>
            Cancel
          </Button>
          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking upload, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
