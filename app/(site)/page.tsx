import { currentUser } from "@clerk/nextjs/server";

import Landing from "@/components/landing";
import PostItem from "@/components/post-item";
import { saveNewUser } from "@/services/userServices";
import { getAllPosts } from "@/services/postServices";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <Landing />;
  }

  await saveNewUser(user);

  const posts: PostDoc[] = await getAllPosts();

  if (posts.length === 0) {
    return <div className="">No posts found</div>;
  }

  return (
    <div>
      {posts.map((post: PostDoc) => (
        <div key={post._id}>
          <PostItem post={post} />
          <div className="border-t border-zinc-300 my-8" />
        </div>
      ))}
    </div>
  );
}
