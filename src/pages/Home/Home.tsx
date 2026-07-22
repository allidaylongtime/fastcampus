import { useEffect, useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../../components/ui/NavigationBar";
import { PostFilterHeader } from "../../components/ui/PostFilterHeader";
import { PostCard } from "../../components/ui/PostCard";
import { Divider } from "../../components/ui/Divider";
import { useSession } from "../../lib/useSession";
import { fetchPosts, type HomePostData } from "../../lib/posts";
import { formatRelativeTime } from "../../lib/formatRelativeTime";
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
  width: "840px",
};

// Figma Divider 노드 자체 높이는 24px(2px 라인 + 상하 여백)이지만, 재사용하는
// `Divider` 컴포넌트는 2px 라인만 렌더링합니다. 컴포넌트는 수정하지 않고, 이
// 래퍼로 상하 --spacing-12(총 24px에 가장 가까운 토큰)만큼 여백을 더해
// Figma의 24px 구분 영역과 시각적으로 맞춥니다.
const dividerWrapStyle: CSSProperties = {
  width: "100%",
  paddingTop: "var(--spacing-12)",
  paddingBottom: "var(--spacing-12)",
};

/**
 * Figma: `Community/Home`(node-id 2098:567).
 * NavigationBar / PostFilterHeader / PostCard / Divider를 그대로 조합만 하며,
 * 각 컴포넌트 내부는 수정하지 않습니다.
 */
export function Home() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [posts, setPosts] = useState<HomePostData[]>([]);

  useEffect(() => {
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  const handleAuthClick = async () => {
    if (session) {
      await supabase.auth.signOut();
    } else {
      navigate("/login");
    }
  };

  return (
    <div style={rootStyle}>
      <NavigationBar
        categories={[{ label: "커뮤니티", selected: true }]}
        state={session ? "logout" : "login"}
        onAuthClick={handleAuthClick}
      />
      <div style={feedContainerStyle}>
        <div style={bodyStyle}>
          <PostFilterHeader onWriteClick={() => navigate("/write")} />
          <div style={dividerWrapStyle}>
            <Divider />
          </div>
          {posts.map((post) => (
            <div key={post.id} style={{ width: "100%" }}>
              <PostCard
                chips={post.chips}
                title={post.title}
                preview={post.preview}
                timeAgo={formatRelativeTime(post.createdAt)}
                thumbnailType={post.thumbnailType}
                viewCount={post.viewCount}
                likeCount={post.likeCount}
                onClick={() => navigate(`/view/${post.id}`)}
                style={{ cursor: "pointer" }}
              />
              <div style={dividerWrapStyle}>
                <Divider />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
