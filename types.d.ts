type PostDoc = {
  _id: string;
  authorId: string;
  title: string;
  shortDescription: string;
  content: string;
  imageUrl: string;
  status: "published" | "draft";
  createdAt: string;
  updatedAt: string;
  slug: string;
};

type Post = {
  title: string;
  shortDescription: string;
  content: string;
  imagePrompt: string;
  imageUrl?: string;
};
