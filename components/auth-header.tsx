import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { EditIcon, Loader2Icon, SearchIcon } from "lucide-react";

import SearchBar from "@/components/search-bar";
import { getUserByEmail } from "@/services/userServices";
import UserProfileButton from "@/components/user-profile-button";

const AuthHeader = async () => {
  const clerkUser = await currentUser();

  if (!clerkUser) return;

  const user = await getUserByEmail(
    clerkUser.primaryEmailAddress?.emailAddress as string
  );

  return (
    <header className="p-4 flex items-center justify-between text-sm font-medium w-full">
      <div className="flex items-center gap-x-5">
        <Link href="/">
          <h1 className="text-2xl lg:text-4xl font-serif font-bold">Scribe</h1>
        </Link>

        <div className="hidden md:flex">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-x-8">
        <Link href="/search" className="flex md:hidden">
          <SearchIcon className="size-6 text-muted-foreground" />
        </Link>

        <Link
          href="/new-post"
          className="flex items-center space-x-2 text-muted-foreground hover:text-black transition-colors"
        >
          <EditIcon className="size-5" />
          <p>Write</p>
        </Link>

        <ClerkLoading>
          <Loader2Icon className="size-8 animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>{user && <UserProfileButton id={user.id} />}</ClerkLoaded>
      </div>
    </header>
  );
};

export default AuthHeader;
