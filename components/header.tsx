import Link from "next/link";
import { EditIcon, Loader2Icon, SearchIcon } from "lucide-react";
import { ClerkLoaded, ClerkLoading, SignedIn, UserButton } from "@clerk/nextjs";

import { SearchBar } from "@/components/search-bar";

const Header = () => {
  return (
    <header className="bg-gray-100 px-4 py-2 flex items-center justify-between text-sm font-medium">
      <div className="flex items-center gap-x-5">
        <h1 className="text-2xl lg:text-4xl font-serif font-bold">Scribe</h1>

        <div className="hidden md:flex">
          <SearchBar />
        </div>
      </div>

      <div className="flex items-center gap-x-8">
        <Link href="/search" className="flex md:hidden">
          <SearchIcon className="size-6 text-muted-foreground" />
        </Link>

        <Link
          href="/new"
          className="flex items-center space-x-2 text-muted-foreground hover:text-black transition-colors"
        >
          <EditIcon className="size-5" />
          <p>Write</p>
        </Link>

        <ClerkLoading>
          <Loader2Icon className="size-8 animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export { Header };
