"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Book,
  BookUser,
  File,
  ImageIcon,
  Upload,
  UploadIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { bookFormSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

export default function Page() {
  // we first need to validate whether the image is valid before rendering it
  const [imageUrl, setImageUrl] = useState<string>("");
  const [isValidImage, setIsValidImage] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);

    const validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const isValid = validImageExtensions.some((ext) => url.endsWith(ext));
    setIsValidImage(isValid);
  };

  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    try {
      const formValues = {
        title: formData.get("title") as string,
        author: formData.get("author") as string,
        image_url: formData.get("image_url") as string,
        file: formData.get("file") as File,
      };

      // pass it to bookFormSchema and check validation
      await bookFormSchema.parseAsync(formValues);

      console.log(formValues);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        const errorMessages = Object.values(fieldErrors).flat().join(", ");

        toast({
          variant: "destructive",
          title: "Input Error!",
          description:
            errorMessages ||
            "There was a problem with your input. Please try again!",
        });

        return {
          ...previousState,
          error: "Validation failed",
          status: "ERROR",
        };
      } else {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
        return {
          ...previousState,
          error: "An unexpected error has occurred",
          status: "ERROR",
        };
      }
    }
  };

  const [data, formSubmit, isPending] = useActionState(
    handleFormSubmit,
    undefined
  );

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
          {isValidImage ? (
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
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
          <form action={formSubmit}>
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
                  htmlFor="title"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <Book className="w-4 h-4 mr-2" />
                  Title:
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Title of the Book (e.g. Moby Dick)"
                  type="text"
                  className="mt-2"
                />
              </div>
              <div className="grid gap-1 mb-2">
                <Label
                  htmlFor="author"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <BookUser className="w-4 h-4 mr-2" />
                  Author:
                </Label>
                <Input
                  id="author"
                  name="author"
                  placeholder="Author of the Book (e.g. Herman Melville)"
                  type="text"
                  className="mt-2"
                />
              </div>
              <Separator />
              <p className="text-sm text-muted-foreground">
                Furthermore, you are to provide an image URL cover for your
                book. This will appear in your homepage
              </p>
              <div className="grid gap-1 mt-2">
                <Label
                  htmlFor="image_url"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Cover Image URL:
                </Label>
                <Input
                  id="image_url"
                  name="image_url"
                  placeholder="https://images.booksense.com/images/007/839/9781954839007.jpg"
                  type="text"
                  className="mt-2"
                  onChange={handleImageUrlChange}
                />
              </div>
              <Separator className="mt-2 mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Finally, upload your ePub below:
              </p>
              <div className="grid gap-1">
                <Label
                  htmlFor="file"
                  className="font-bold text-md flex items-center space-x-3"
                >
                  <File className="w-4 h-4 mr-2" />
                  ePub:
                </Label>
                <Input id="file" name="file" type="file" className="mt-2 p-2" />
              </div>
              <p className="text-sm text-muted-foreground mt-4 mb-2">
                Once you are satisfied, click the upload button below.
              </p>
              <Button disabled={isPending}>
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
          <Button
            variant="outline"
            type="button"
            onClick={() => redirect("/")}
            disabled={isPending}
          >
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
