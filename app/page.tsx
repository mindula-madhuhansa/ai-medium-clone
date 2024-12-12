import { auth } from "@clerk/nextjs/server";

import { Landing } from "@/components/landing";

export default async function Home() {
  const { sessionId } = await auth();

  if (!sessionId) {
    return <Landing />;
  }

  return <div className="">Signed Up</div>;
}
