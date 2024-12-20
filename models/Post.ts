import slugify from "slugify";
import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  authorId: mongoose.Schema.Types.ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
  imagePrompt?: string;
  imageUrl?: string;
  status: "draft" | "published";
  likesCount: number;
  commentsCount: number;
}

const PostSchema: Schema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    imagePrompt: { type: String },
    imageUrl: { type: String },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
    likesCount: { type: Number, default: 0 },
    commentsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

PostSchema.pre("save", function (next) {
  if (!this.status) {
    this.status = "draft";
  }

  this.slug = slugify(this.title as string, { lower: true, strict: true });
  next();
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);

export default Post;
