import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar = ({
  src,
  className,
}: {
  src?: string;
  className: string;
}) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} />
      <AvatarFallback>
        <AvatarImage src="https://github.com/shadcn.png" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
