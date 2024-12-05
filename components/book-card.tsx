import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { CalendarPlus2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import BookCardRead from "./book-card-read";
import { BookCardAction } from "./book-card-action";

interface Book {
  _id: string;
  title: string;
  author: string;
  _createdAt: string;
  image_url: string;
  file_id: string;
  file: File;
}

export function BookCard({ book }: { book: Book }) {
  const { _id, author, _createdAt, title, image_url, file_id } = book;
  return (
    <li className="py-6 px-5">
      <Card className="w-[350px] overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src={image_url}
            alt={`Cover of ${title}`}
            fill
            style={{ objectFit: "cover" }}
            className="transition-all hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-extrabold text-xl line-clamp-1">{title}</h3>
          <p className="text-md text-accent-foreground">
            By: <span className="underline">{author}</span>
          </p>
          <div className="flex items-center mt-2text-xs text-muted-foreground">
            <CalendarPlus2 className="w-4 h-4 mr-1" />
            <span>{formatDate(_createdAt)}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4 gap-x-2">
          <BookCardRead id={_id} />
          <BookCardAction id={_id} file_id={file_id} />
        </CardFooter>
      </Card>
    </li>
  );
}
