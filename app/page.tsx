import { auth, currentUser } from "@clerk/nextjs/server";

import { Landing } from "@/components/landing";
import { saveNewUser } from "@/services/userServices";

export default async function Home() {
  const { sessionId, userId } = await auth();
  const user = await currentUser();

  if (!sessionId || !userId || !user) {
    return <Landing />;
  }

  await saveNewUser(user);

  return <div className="">Signed Up</div>;
}
