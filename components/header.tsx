import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

const Header = async () => {
  return (
    <header className="p-4 flex items-center justify-between text-sm font-medium max-w-6xl mx-auto w-full">
      <Link href="/">
        <h1 className="text-2xl lg:text-4xl font-serif font-bold">Scribe</h1>
      </Link>

      <div className="flex items-center gap-x-8">
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
      </div>
    </header>
  );
};

export default Header;
