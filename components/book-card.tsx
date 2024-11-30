import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { CalendarIcon } from "lucide-react";

export function BookCard({ book }) {
  const { author, _createdAt, title } = book;
  return (
    <li className="py-6 px-5">
      <Card className="w-[350px] overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src="https://cdn.kobo.com/book-images/a949584a-22a3-4bda-8776-87b952941b83/1200/1200/False/seirei-gensouki-spirit-chronicles-volume-5.jpg"
            alt={`Cover of ${title}`}
            fill
            style={{ objectFit: "cover" }}
            className="transition-all hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-extrabold text-xl line-clamp-1">{title}</h3>
          <p className="text-md text-muted-foreground">
            By: <span className="underline">{author}</span>
          </p>
          <div className="flex items-center mt-2text-xs text-muted-foreground">
            <CalendarIcon className="w-3 h-3 mr-1" />
            <span>{_createdAt}</span>
          </div>
        </CardContent>
        <CardFooter className="px-4">
          <Button className="w-full">Read Now</Button>
        </CardFooter>
      </Card>
    </li>
  );
}
