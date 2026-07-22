import { supabase } from "./supabase";

export interface InteractionState {
  liked: boolean;
  bookmarked: boolean;
}

export async function fetchInteractionState(
  postId: string,
  userId: string,
): Promise<InteractionState> {
  const [likeResult, bookmarkResult] = await Promise.all([
    supabase
      .from("likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle(),
    supabase
      .from("bookmarks")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", userId)
      .maybeSingle(),
  ]);

  if (likeResult.error) throw likeResult.error;
  if (bookmarkResult.error) throw bookmarkResult.error;

  return {
    liked: likeResult.data !== null,
    bookmarked: bookmarkResult.data !== null,
  };
}

export async function toggleLike(
  postId: string,
  userId: string,
  nextLiked: boolean,
): Promise<void> {
  const { error } = nextLiked
    ? await supabase.from("likes").insert({ post_id: postId, user_id: userId })
    : await supabase
        .from("likes")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);

  if (error) throw error;
}

export async function toggleBookmark(
  postId: string,
  userId: string,
  nextBookmarked: boolean,
): Promise<void> {
  const { error } = nextBookmarked
    ? await supabase
        .from("bookmarks")
        .insert({ post_id: postId, user_id: userId })
    : await supabase
        .from("bookmarks")
        .delete()
        .eq("post_id", postId)
        .eq("user_id", userId);

  if (error) throw error;
}
