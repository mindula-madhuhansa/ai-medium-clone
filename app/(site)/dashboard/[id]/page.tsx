import TabContent from "@/components/tab-content";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDraftPosts, getPublishedPosts } from "@/services/postServices";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const draftPosts: PostDoc[] = await getDraftPosts(id);
  const publishedPosts: PostDoc[] = await getPublishedPosts(id);

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

      <div className="border-t border-zinc-200 my-4" />
    </div>
  );
}
