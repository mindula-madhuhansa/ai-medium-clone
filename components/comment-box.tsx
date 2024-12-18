import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CommentBox = () => {
  return (
    <div className="mt-4 flex items-center gap-2 shadow-lg border p-4">
      <Input
        placeholder="What are your thoughts?"
        className="shadow-none border-none focus-visible:ring-0 focus-visible:outline-none"
      />

      <Button className="rounded-full">Respond</Button>
    </div>
  );
};

export default CommentBox;
