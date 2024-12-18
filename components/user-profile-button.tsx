"use client";

import { UserButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LayoutDashboardIcon } from "lucide-react";

const UserProfileButton = ({ id }: { id: string }) => {
  const router = useRouter();

  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Dashboard"
          labelIcon={<LayoutDashboardIcon className="size-4" />}
          onClick={() => router.push(`/dashboard/${id}`)}
        />
        <UserButton.Action label="manageAccount" />
        <UserButton.Action label="signOut" />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserProfileButton;
