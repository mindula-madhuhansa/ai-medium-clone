import { redirect } from "next/navigation";

import {
  deletePost,
  getPostById,
  updatePostStatus,
} from "@/services/postServices";
import { Button } from "@/components/ui/button";
import PostEditor from "@/components/post-editor";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div className="flex flex-col">
      <PostEditor post={post} />

      <div className="flex justify-end w-full mt-6 space-x-4">
        <form
          action={async () => {
            "use server";
            await deletePost(id);
            redirect("/dashboard");
          }}
        >
          <Button type="submit" variant="destructive">
            Discard
          </Button>
        </form>

        <form
          action={async () => {
            "use server";
            await updatePostStatus(id, "published");
            redirect(`/post/${post.slug}`);
          }}
        >
          <Button className="bg-green-500 hover:bg-green-500/90">
            {post.status === "published" ? "Save & Publish" : "Publish"}
          </Button>
        </form>
      </div>
    </div>
  );
}
