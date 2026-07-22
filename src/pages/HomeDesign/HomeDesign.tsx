import type { CSSProperties } from "react";
import { NavigationBar } from "../../components/ui/NavigationBar";
import { PostFilterHeader } from "../../components/ui/PostFilterHeader";
import { PostCard, type PostCardChipItem } from "../../components/ui/PostCard";
import { Divider } from "../../components/ui/Divider";
import type { PostCardImageType } from "../../components/ui/PostCardImage";

interface HomeDesignPost {
  id: string;
  chips: PostCardChipItem[];
  title: string;
  preview: string;
  timeAgo: string;
  thumbnailType: PostCardImageType;
  viewCount: number;
  likeCount: number;
}

const HOME_DESIGN_POSTS: HomeDesignPost[] = [
  {
    id: "post-1",
    chips: [{ label: "튜토리얼", type: "notice", icon: "pencil" }],
    title: "Auto Layout 완벽 가이드",
    preview:
      "Auto Layout의 핵심 개념부터 실전 활용까지. Fill, Hug, Fixed의 차이를 예제와 함께 정리했습니다.",
    timeAgo: "2시간 전",
    thumbnailType: 1,
    viewCount: 0,
    likeCount: 0,
  },
  {
    id: "post-2",
    chips: [{ label: "리소스", type: "category" }],
    title: "디자인 토큰, 왜 써야 할까?",
    preview:
      "색상, 간격, 타이포 — 왜 하드코딩하면 안 되는지, 토큰으로 관리하면 뭐가 좋은지 실무 관점에서 정리합니다.",
    timeAgo: "5시간 전",
    thumbnailType: 2,
    viewCount: 0,
    likeCount: 0,
  },
  {
    id: "post-3",
    chips: [
      { label: "튜토리얼", type: "notice", icon: "pencil" },
      { label: "AI", type: "category", icon: "ai" },
    ],
    title: "Figma Variables로 다크모드 만들기",
    preview:
      "Variables 기능으로 라이트/다크 모드를 한 파일에서 관리하는 방법. 컬렉션 구조 설계부터 적용까지.",
    timeAgo: "1일 전",
    thumbnailType: 3,
    viewCount: 0,
    likeCount: 0,
  },
];

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

const dividerWrapStyle: CSSProperties = {
  width: "100%",
  paddingTop: "var(--spacing-12)",
  paddingBottom: "var(--spacing-12)",
};

/**
 * `/home` 페이지(Home.tsx)와 동일한 컴포넌트 구성을 재사용하고 콘텐츠만 교체한
 * 베리에이션 페이지. 화면정의서: "Home 페이지 베리에이션".
 */
export function HomeDesign() {
  return (
    <div style={rootStyle}>
      <NavigationBar
        categories={[{ label: "디자인 팁", selected: true }]}
        state="logout"
      />
      <div style={feedContainerStyle}>
        <div style={bodyStyle}>
          <PostFilterHeader
            title="실시간 게시글"
            sortTabs={[
              { label: "추천순", selected: true },
              { label: "최신순" },
            ]}
          />
          <div style={dividerWrapStyle}>
            <Divider />
          </div>
          {HOME_DESIGN_POSTS.map((post) => (
            <div key={post.id} style={{ width: "100%" }}>
              <PostCard
                chips={post.chips}
                title={post.title}
                preview={post.preview}
                timeAgo={post.timeAgo}
                thumbnailType={post.thumbnailType}
                viewCount={post.viewCount}
                likeCount={post.likeCount}
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
