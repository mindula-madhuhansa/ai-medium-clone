import PostEditor from "@/components/post-editor";
import { Button } from "@/components/ui/button";
import {
  deletePost,
  getPostById,
  updatePostStatus,
} from "@/services/postServices";
import { redirect } from "next/navigation";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div>
      <div className="flex flex-col p-5 lg:p-10">
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
              redirect(`/post/${id}`);
            }}
          >
            <Button className="bg-green-500 hover:bg-green-500/90">
              Publish
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
