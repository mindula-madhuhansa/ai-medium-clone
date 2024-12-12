import Image from "next/image";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@/components/ui/button";

const Landing = () => {
  return (
    <div className="h-full flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-28 lg:gap-0">
      <div className="space-y-10 md:space-y-12">
        <h1 className="text-6xl lg:text-9xl text-zinc-800 font-serif font-medium">
          Where Stories
          <br />
          Spark Ideas
        </h1>
        <p className="text-xl">
          A Place for writers to share their stories and ideas with the world.
        </p>

        <form
          action={async () => {
            "use server";
            const { redirectToSignIn } = await auth();
            return redirectToSignIn({ returnBackUrl: "/" });
          }}
        >
          <Button
            type="submit"
            className="rounded-full text-lg px-8 py-6 bg-green-500 lg:bg-primary text-white"
          >
            Start Reading
          </Button>
        </form>
      </div>

      <Image
        src="/assets/images/home.png"
        alt="Banner"
        width={1024}
        height={1024}
        className="hidden lg:block absolute right-0 object-cover h-[720px] w-auto"
      />
    </div>
  );
};

export { Landing };
