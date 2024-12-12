"use client";

import { useActionState, useState } from "react";
import { File, Upload } from "lucide-react";
import { redirect } from "next/navigation";
import { createBookFormSchema } from "@/lib/validation";
import { z } from "zod";
import { uploadBook } from "@/lib/upload-book";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { nanoid } from "nanoid";
import ImagePreview from "@/components/image-preview";
import UploadForm from "@/components/upload-form";
import { useToast } from "@/hooks/use-toast";
import UploadFormFooter from "@/components/upload-form-footer";

interface FormValues {
  title: string;
  author: string;
  image_url: string;
}

const getSignedUrl = async (
  fileName: string,
  fileType: string | undefined,
  filePath: string
) => {
  const response = await fetch("/api/generateSignedUrl", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fileName, fileType, filePath }),
  });

  const { signedUrl, error } = await response.json();

  if (error) {
    throw new Error(`Failed to generate signed URL: ${error}`);
  }

  return signedUrl;
};

const uploadFileToSignedUrl = async (signedUrl: string, file: File) => {
  const response = await fetch(signedUrl, {
    method: "PUT",
    headers: { "Content-Type": file.type },
    body: file,
  });

  if (!response.ok) {
    throw new Error("File upload to signed URL failed");
  }
};

const generatePublicUrl = (filePath: string) => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/epub-files/${filePath}`;
};

const saveBookDetails = async (
  formValues: FormValues,
  filePath: string,
  publicUrl: string
) => {
  return uploadBook({
    title: formValues.title,
    author: formValues.author,
    image_url: formValues.image_url,
    file_path: filePath,
    file_url: publicUrl,
  });
};

export default function Page() {
  // we first need to validate whether the image is valid before rendering it
  const { data: session } = useSession();
  if (!session) {
    redirect("/");
  }

  const [imageUrl, setImageUrl] = useState<string>("");
  const [isValidImage, setIsValidImage] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();
  const { toast } = useToast();

  const handleImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setImageUrl(url);

    const validImageExtensions = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    const isValid = validImageExtensions.some((ext) => url.endsWith(ext));
    setIsValidImage(isValid);
  };

  // for file change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
    } else {
      setFile(null);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFormSubmit = async (previousState: any, formData: FormData) => {
    const formValues = {
      title: formData.get("title") as string,
      author: formData.get("author") as string,
      image_url: formData.get("image_url") as string,
      file: formData.get("file") as File,
    };

    try {
      await createBookFormSchema.parseAsync(formValues);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);

        const errorMessages = Object.values(fieldErrors).flat().join(", ");

        toast({
          variant: "destructive",
          title: "Input Error!",
          description: errorMessages,
        });

        return {
          ...previousState,
          error: "Validation failed",
          status: "ERROR",
        };
      } else {
        toast({
          variant: "destructive",
          title: "An Error Occurred!",
          description:
            "Something Unexpected Occurred while Parsing your Inputs! Please try Again!",
        });

        return {
          ...previousState,
          error: "An unexpected error has occurred",
          status: "ERROR",
        };
      }
    }

    try {
      const file = formValues.file;

      if (!file) {
        throw new Error("No file provided");
      }

      const fileExt = file?.name.split(".").pop();
      const fileName = `${nanoid()}.${fileExt}`;
      const userId = session.id;
      const filePath = `${userId}/${fileName}`;

      const signedUrl = await getSignedUrl(fileName, fileExt, filePath);
      await uploadFileToSignedUrl(signedUrl, file);

      const publicUrl = generatePublicUrl(filePath);
      const result = await saveBookDetails(formValues, filePath, publicUrl);

      if (result.status === "success") {
        toast({
          variant: "default",
          title: "Book Uploaded Successfully!",
          description: "Your book has been uploaded to the database.",
        });

        router.push(`/book/${result._id}`);
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An Error Occurred!",
        description: "Something Unexpected Occurred! Please try Again!",
      });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <ImagePreview imageUrl={imageUrl} isValidImage={isValidImage} />

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
          <UploadForm
            formSubmit={formSubmit}
            handleImageUrlChange={handleImageUrlChange}
            handleFileChange={handleFileChange}
            errors={errors}
            isPending={isPending}
          />
          <UploadFormFooter isPending={isPending} />
        </div>
      </div>
    </div>
  );
}
