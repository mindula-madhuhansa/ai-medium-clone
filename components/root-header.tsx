import {
  ClerkLoaded,
  ClerkLoading,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

const RootHeader = () => {
  return (
    <header className="p-4 flex items-center justify-between text-sm font-medium max-w-6xl mx-auto">
      <h1 className="text-2xl lg:text-4xl font-serif font-bold">Scribe</h1>

      <div className="flex items-center space-x-5">
        <Link href="/new">Write</Link>

        <ClerkLoading>
          <Loader2Icon className="size-8 animate-spin" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignInButton mode="modal" />

          <Button asChild className="text-sm px-4 py-3 rounded-full">
            <SignUpButton mode="modal" />
          </Button>
        </ClerkLoaded>
      </div>
    </header>
  );
};

export { RootHeader };
