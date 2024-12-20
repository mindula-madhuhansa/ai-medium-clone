import { currentUser } from "@clerk/nextjs/server";

import PostItem from "@/components/post-item";
import TabContent from "@/components/tab-content";
import UserAvatar from "@/components/user-avatar";
import { getUserById } from "@/services/userServices";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDraftPosts, getPublishedPosts } from "@/services/postServices";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await currentUser();
  const author: Author = await getUserById(id);

  const draftPosts: PostDoc[] = await getDraftPosts(id);
  const publishedPosts: PostDoc[] = await getPublishedPosts(id);

  if (user?.primaryEmailAddress?.emailAddress !== author.email) {
    return (
      <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8">
        <div>
          <div className="flex flex-col lg:hidden items-center">
            <UserAvatar src={author.profilePicture} className="size-32" />
            <h2 className="mt-8 mb-12 text-3xl font-bold">{author.name}</h2>
            <div className="border-t border-zinc-200 my-4" />
          </div>

          <h2 className="hidden lg:inline-flex mt-8 mb-12 text-5xl font-bold">
            {author.name}
          </h2>

          {publishedPosts.map((post: PostDoc) => (
            <div key={post._id} className="mb-8">
              <PostItem post={post} showAuthor={false} />

              <div className="border-t border-zinc-200 my-4" />
            </div>
          ))}
        </div>

        <div className="hidden lg:flex flex-col border-l border-zinc-200 lg:pl-8">
          <UserAvatar src={author.profilePicture} className="size-32" />
          <h3 className="mt-4 font-semibold">{author.name}</h3>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-4xl font-bold mb-8">Your stories</h2>

      <Tabs defaultValue="drafts">
        <TabsList>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        <TabContent value="drafts" items={draftPosts} />
        <TabContent value="published" items={publishedPosts} />
        <TabContent value="responses" items={[]} />
      </Tabs>
    </div>
  );
}
