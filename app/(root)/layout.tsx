import Navbar from "@/components/nav-bar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
