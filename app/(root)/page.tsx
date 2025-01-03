import { auth } from "@/auth";
import { BookCard } from "@/components/book-card";
import Navbar from "@/components/nav-bar";
import { sanityFetch } from "@/sanity/lib/live";
import { USER_BOOKS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { redirect } from "next/navigation";
import { Key } from "react";

interface Book {
  _id: string;
  title: string;
  author: string;
  _createdAt: string;
  image_url: string;
  file_path: string;
  file_url: string;
  file: File;
}

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  let books = [];

  try {
    const params = { userId: session?.id };
    const { data } = await sanityFetch({ query: USER_BOOKS_QUERY, params });
    books = data || [];
  } catch (error) {
    console.log(error);
    books = [];
  }

  return (
    <>
      <Navbar username={session?.user?.name} image={session?.user?.image} />
      {books.length > 0 ? (
        // if books.length > 0, we display it, else we render something that prompts the user to add something
        <section className="h-screen flex justify-center">
          <div className="max-w-full mt-28">
            <h1 className="xl:text-4xl text-2xl font-extrabold text-slate-950 mb-10">
              {`Your Library: (${books.length})`}
            </h1>
            <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5;">
              {books.map((book: Book, index: Key) => (
                <BookCard key={index} book={book} />
              ))}
            </ul>
          </div>
        </section>
      ) : (
        <section className="h-screen flex flex-col items-center justify-center">
          <div className="flex flex-col items-center max-w-full mx-auto text-center">
            <div className="mb-8">
              <Image
                src="/homepage_astronaut.png"
                alt="A photo of an astronaut found in the homepage"
                width={500}
                height={500}
                className="mx-auto"
              />
            </div>
            <h1 className="xl:text-7xl text-4xl font-extrabold text-slate-950 mb-10 underline">
              Your Library is Currently Empty.
            </h1>
            <p className="text-2xl text-gray-600">
              It seems like you do not have any books yet. Let us get started by
              adding your first book!
            </p>
            <p className="text-gray-500 mt-5 italic">
              &quot;A book is a dream you hold in your hands.&quot; – Neil
              Gaiman
            </p>
            <p className="text-xl mt-10 mb-5 font-extrabold">
              Click the + icon at the top to start adding your books.
            </p>
          </div>
        </section>
      )}
    </>
  );
}
