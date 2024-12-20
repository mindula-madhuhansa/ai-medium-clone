import moment from "moment";
import Link from "next/link";

import { TabsContent } from "@/components/ui/tabs";

const TabContent = ({ value, items }: { value: string; items: PostDoc[] }) => {
  return (
    <TabsContent value={value}>
      {!items.length ? (
        <p className="mt-4 px-8 pt-6 pb-2 text-zinc-500">
          {value === "responses"
            ? "You have no responses yet"
            : value === "drafts"
            ? "You have no drafts yet"
            : "You have no published posts yet"}
        </p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item._id}>
              <Link
                href={
                  value === "published"
                    ? `/post/${item.slug}?id=${item._id}`
                    : `/new-post/${item._id}`
                }
                passHref
                className="mt-4 px-8 pt-6 pb-2 flex flex-col gap-1"
              >
                <h2 className="text-sm font-bold">{item.title}</h2>
                <p className="text-sm text-zinc-500 truncate max-w-md">
                  {item.shortDescription}
                </p>
                <p className="mt-3 text-xs text-zinc-500">
                  {value === "drafts" ? "Saved" : "Published"}{" "}
                  {moment(item.createdAt).fromNow()}
                </p>
              </Link>

              <div className="border-t border-zinc-200 my-4" />
            </div>
          ))}
        </>
      )}
    </TabsContent>
  );
};

export default TabContent;
