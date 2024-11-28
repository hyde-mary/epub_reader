import { auth } from "@/auth";
import Navbar from "@/components/nav-bar";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/auth");
  }

  return (
    <>
      <Navbar username={session?.user?.name} image={session?.user?.image} />
    </>
  );
}
