import { auth } from "@clerk/nextjs/server";

import { Header } from "@/components/header";
import { RootHeader } from "@/components/root-header";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sessionId } = await auth();

  return (
    <div
      className={`flex flex-col h-screen ${
        sessionId ? "bg-gray-100" : "bg-orange-50"
      }`}
    >
      {sessionId ? (
        <Header />
      ) : (
        <div className="border-b border-black">
          <RootHeader />
        </div>
      )}

      <main className="flex-1 w-full p-4 max-w-6xl mx-auto">{children}</main>
    </div>
  );
}
