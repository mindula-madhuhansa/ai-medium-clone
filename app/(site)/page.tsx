import { auth, currentUser } from "@clerk/nextjs/server";

import Landing from "@/components/landing";
import { saveNewUser } from "@/services/userServices";
import { getAllPosts } from "@/services/postServices";

export default async function Home() {
  const user = await currentUser();
  const { sessionId, userId } = await auth();

  if (!sessionId || !userId || !user) {
    return <Landing />;
  }

  await saveNewUser(user);

  const posts = await getAllPosts();

  if (!posts) {
    return <div className="">No posts found</div>;
  }

  return (
    <div className="">
      {posts.map((post) => (
        <div key={post._id} className="">
          <h2>{post.title}</h2>
          <p>{post.shortDescription}</p>
          <img src={post.imageUrl} alt={post.title} />
        </div>
      ))}
    </div>
  );
}
