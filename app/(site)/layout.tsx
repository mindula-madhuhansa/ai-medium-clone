import Header from "@/components/header";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={"flex flex-col h-screen bg-gray-50"}>
      <Header />

      <main className="flex-1 w-full p-4 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
