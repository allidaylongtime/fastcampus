import { supabase } from "./supabase";
import type { PostCardImageType } from "../components/ui/PostCardImage";
import type { PostCardChipItem } from "../components/ui/PostCard";

interface CategoryRow {
  label: string;
  type: "category" | "notice";
}

function toChips(
  postCategories: { categories: CategoryRow | null }[],
): PostCardChipItem[] {
  return postCategories
    .map((pc) => pc.categories)
    .filter((category): category is CategoryRow => category !== null)
    .map((category) => ({ label: category.label, type: category.type }));
}

interface PostListRow {
  id: string;
  title: string;
  preview: string;
  thumbnail_type: number;
  view_count: number;
  like_count: number;
  created_at: string;
  post_categories: { categories: CategoryRow | null }[];
}

export interface HomePostData {
  id: string;
  chips: PostCardChipItem[];
  title: string;
  preview: string;
  createdAt: string;
  thumbnailType: PostCardImageType;
  viewCount: number;
  likeCount: number;
}

export async function fetchPosts(): Promise<HomePostData[]> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, preview, thumbnail_type, view_count, like_count, created_at, post_categories ( categories ( label, type ) )",
    )
    .order("created_at", { ascending: false })
    .returns<PostListRow[]>();

  if (error) throw error;

  return data.map((post) => ({
    id: post.id,
    chips: toChips(post.post_categories),
    title: post.title,
    preview: post.preview,
    createdAt: post.created_at,
    thumbnailType: post.thumbnail_type as PostCardImageType,
    viewCount: post.view_count,
    likeCount: post.like_count,
  }));
}

interface PostDetailRow {
  id: string;
  title: string;
  content: string;
  thumbnail_type: number;
  view_count: number;
  like_count: number;
  created_at: string;
  author_id: string;
  profiles: { nickname: string } | null;
  post_categories: { categories: CategoryRow | null }[];
}

export interface PostDetailData {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorNickname: string;
  createdAt: string;
  thumbnailType: PostCardImageType;
  viewCount: number;
  likeCount: number;
  chips: PostCardChipItem[];
}

export async function fetchPostById(id: string): Promise<PostDetailData> {
  const { data, error } = await supabase
    .from("posts")
    .select(
      "id, title, content, thumbnail_type, view_count, like_count, created_at, author_id, profiles ( nickname ), post_categories ( categories ( label, type ) )",
    )
    .eq("id", id)
    .single()
    .returns<PostDetailRow>();

  if (error) throw error;

  return {
    id: data.id,
    title: data.title,
    content: data.content,
    authorId: data.author_id,
    authorNickname: data.profiles?.nickname ?? "알 수 없음",
    createdAt: data.created_at,
    thumbnailType: data.thumbnail_type as PostCardImageType,
    viewCount: data.view_count,
    likeCount: data.like_count,
    chips: toChips(data.post_categories),
  };
}

export async function incrementPostView(id: string): Promise<void> {
  const { error } = await supabase.rpc("increment_view_count", {
    post_id: id,
  });
  if (error) throw error;
}

export async function createPost(input: {
  title: string;
  content: string;
  authorId: string;
}): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("posts")
    .insert({
      title: input.title,
      content: input.content,
      author_id: input.authorId,
    })
    .select("id")
    .single();

  if (error) throw error;

  return { id: data.id };
}
