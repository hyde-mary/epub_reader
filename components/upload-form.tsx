import React from "react";
import { Label } from "@/components/ui/label";
import { Book, BookUser, File, ImageIcon, UploadIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface UploadFormProps {
  formSubmit: (payload: FormData) => void;
  handleImageUrlChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
  isPending: boolean;
}

const UploadForm = ({
  formSubmit,
  handleImageUrlChange,
  handleFileChange,
  errors,
  isPending,
}: UploadFormProps) => {
  return (
    <form action={formSubmit}>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4 underline">
        Upload your Book
      </h1>
      <p className="text-sm text-muted-foreground mb-4">
        Enter the necessary information such as the Title and Author of the
        book. <br />
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
          {errors.title && (
            <p className="text-red-400 text-sm">{errors.title}</p>
          )}
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
          {errors.author && (
            <p className="text-red-400 text-sm">{errors.author}</p>
          )}
        </div>
        <Separator />
        <p className="text-sm text-muted-foreground">
          Furthermore, you are to provide an image URL cover for your book. This
          will appear in your homepage
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
          {errors.image_url && (
            <p className="text-red-400 text-sm">{errors.image_url}</p>
          )}
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
          <Input
            id="file"
            name="file"
            type="file"
            className="mt-2 p-2"
            onChange={handleFileChange}
          />
          {errors.file && <p className="text-red-400 text-sm">{errors.file}</p>}
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
  );
};

export default UploadForm;
