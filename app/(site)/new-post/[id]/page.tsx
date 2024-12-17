import PostEditor from "@/components/post-editor";
import { getPostById } from "@/services/postServices";

export default async function EditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const post = await getPostById(id);

  return (
    <div>
      <PostEditor post={post} />
    </div>
  );
}
