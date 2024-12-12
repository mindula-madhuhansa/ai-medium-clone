import slugify from "slugify";
import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  authorId: mongoose.Schema.Types.ObjectId;
  title: string;
  slug: string;
  shortDescription: string;
  content: string;
}

const PostSchema: Schema = new Schema(
  {
    authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

PostSchema.statics.paginate = async function (filter, options) {
  const { page = 1, limit = 10 } = options;
  const skip = (page - 1) * limit;
  const posts = await this.find(filter).skip(skip).limit(limit);
  const total = await this.countDocuments(filter);

  return { posts, total, page, limit };
};

PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title as string, { lower: true, strict: true });
  next();
});

const Post = mongoose.models.User || mongoose.model<IPost>("Post", PostSchema);

export default Post;
