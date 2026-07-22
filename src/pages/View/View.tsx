import { useEffect, useState, type CSSProperties } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NavigationBar } from "../../components/ui/NavigationBar";
import { Button } from "../../components/ui/Button";
import { PostWriteHeader } from "../../components/ui/PostWriteHeader";
import { Date } from "../../components/ui/Date";
import { Divider } from "../../components/ui/Divider";
import { ContentInputContainer } from "../../components/ui/ContentInputContainer";
import { PostCardStats } from "../../components/ui/PostCardStats";
import { useSession } from "../../lib/useSession";
import {
  fetchPostById,
  incrementPostView,
  type PostDetailData,
} from "../../lib/posts";
import { fetchInteractionState, toggleBookmark } from "../../lib/interactions";
import { formatDate } from "../../lib/formatDate";
import { supabase } from "../../lib/supabase";

const rootStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "var(--spacing-32)",
  paddingBottom: "var(--spacing-32)",
  backgroundColor: "var(--color-background-default)",
};

const feedContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
  paddingTop: "var(--spacing-48)",
};

const bodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-12)",
  width: "840px",
};

const headerRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  paddingTop: "var(--spacing-12)",
  paddingBottom: "var(--spacing-12)",
};

const backButtonStyle: CSSProperties = {
  borderRadius: "var(--radius-circle)",
};

const dividerWrapStyle: CSSProperties = {
  width: "100%",
  paddingTop: "var(--spacing-12)",
  paddingBottom: "var(--spacing-12)",
};

/**
 * Figma: `Community/View`(node-id 783:3370).
 * 게시글 id를 라우트 파라미터로 받아 Supabase에서 실제 데이터를 조회합니다.
 */
export function View() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { session } = useSession();
  const [post, setPost] = useState<PostDetailData | null>(null);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchPostById(id).then(setPost).catch(console.error);

    incrementPostView(id).catch(console.error);
  }, [id]);

  useEffect(() => {
    if (!id || !session) {
      setLiked(false);
      setBookmarked(false);
      return;
    }

    fetchInteractionState(id, session.user.id)
      .then((state) => {
        setLiked(state.liked);
        setBookmarked(state.bookmarked);
      })
      .catch(console.error);
  }, [id, session]);

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut();
    } else {
      navigate("/login");
    }
  };

  const handleBookmarkClick = async () => {
    if (!id) return;
    if (!session) {
      navigate("/login");
      return;
    }

    const nextBookmarked = !bookmarked;
    setBookmarked(nextBookmarked);

    try {
      await toggleBookmark(id, session.user.id, nextBookmarked);
    } catch (error) {
      console.error(error);
      setBookmarked(!nextBookmarked);
    }
  };

  if (!post) {
    return (
      <div style={rootStyle}>
        <NavigationBar
          categories={[{ label: "커뮤니티", selected: true }]}
          state={session ? "logout" : "login"}
          onAuthClick={handleAuthClick}
        />
      </div>
    );
  }

  return (
    <div style={rootStyle}>
      <NavigationBar
        categories={[{ label: "커뮤니티", selected: true }]}
        state={session ? "logout" : "login"}
        onAuthClick={handleAuthClick}
      />
      <div style={feedContainerStyle}>
        <div style={bodyStyle}>
          <div style={headerRowStyle}>
            <Button
              size="small"
              variant="outline"
              icon="arrow_left"
              aria-label="뒤로가기"
              style={backButtonStyle}
              onClick={() => navigate(-1)}
            />
          </div>
          <PostWriteHeader
            title={post.title}
            description={post.authorNickname}
          />
          <Date text={formatDate(post.createdAt)} />
          <div style={dividerWrapStyle}>
            <Divider />
          </div>
          <ContentInputContainer
            imageType={post.thumbnailType}
            imageAlt="첨부 이미지"
            value={post.content}
            readOnly
            tabIndex={-1}
          />
          <PostCardStats
            viewCount={post.viewCount}
            likeCount={post.likeCount}
            liked={liked}
            bookmarked={bookmarked}
            onBookmarkClick={handleBookmarkClick}
          />
        </div>
      </div>
    </div>
  );
}
