import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { CalendarIcon, CalendarPlus2 } from "lucide-react";
import { formatDate } from "@/lib/utils";

export function BookCard({ book }) {
  const { author, _createdAt, title, image_url } = book;
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
        <CardFooter className="px-4">
          <Button className="w-full">Read Now</Button>
        </CardFooter>
      </Card>
    </li>
  );
}
