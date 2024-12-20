type Author = {
  _id: string;
  name: string;
  email: string;
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
  likesCount: number;
  commentsCount: number;
};

type Post = {
  title: string;
  shortDescription: string;
  content: string;
  imagePrompt: string;
  imageUrl?: string;
};
