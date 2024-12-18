import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>
        <AvatarImage src="https://github.com/shadcn.png" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
