import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { EditIcon, Loader2Icon, SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

const Header = () => {
  return (
    <header className="p-4 flex items-center justify-between text-sm font-medium max-w-6xl mx-auto w-full">
      <div className="flex items-center gap-x-5">
        <Link href="/">
          <h1 className="text-2xl lg:text-4xl font-serif font-bold">Scribe</h1>
        </Link>

        <SignedIn>
          <div className="hidden md:flex">
            <SearchBar />
          </div>
        </SignedIn>
      </div>

      <div className="flex items-center gap-x-8">
        <SignedIn>
          {/* Signed-in Header */}
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

          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
        </SignedIn>

        <SignedOut>
          {/* Not Signed-in Header */}
          <Link
            href="/new-post"
            prefetch={false}
            className="text-muted-foreground hover:text-black"
          >
            Write
          </Link>

          <ClerkLoading>
            <Loader2Icon className="size-8 animate-spin" />
          </ClerkLoading>

          <ClerkLoaded>
            <SignInButton />
            <Button asChild className="text-sm px-4 py-3 rounded-full">
              <SignUpButton />
            </Button>
          </ClerkLoaded>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
