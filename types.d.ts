type Author = {
  _id: string;
  name: string;
  profilePicture?: string;
};

type PostDoc = {
  _id: string;
  authorId: Author;
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
