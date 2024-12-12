import Image from "next/image";
import React from "react";

interface UploadImageProps {
  imageUrl: string;
  isValidImage: boolean;
}

const ImagePreview = ({ imageUrl, isValidImage }: UploadImageProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4 z-20">
      {isValidImage ? (
        <Image
          src={`${imageUrl}`}
          alt="Book Cover"
          width={400}
          height={600}
          className="rounded-lg object-contain border-8 border-white"
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
  );
};

export default ImagePreview;
