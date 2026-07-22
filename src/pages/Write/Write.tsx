import { useState, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { NavigationBar } from "../../components/ui/NavigationBar";
import { Button } from "../../components/ui/Button";
import { PostWriteHeader } from "../../components/ui/PostWriteHeader";
import { Input } from "../../components/ui/Input";
import { ContentInputContainer } from "../../components/ui/ContentInputContainer";
import { useSession } from "../../lib/useSession";
import { createPost } from "../../lib/posts";
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

const innerBodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-40)",
  width: "100%",
};

const formGroupStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-24)",
  width: "100%",
};

const submitButtonStyle: CSSProperties = {
  width: "100%",
};

/**
 * Figma: `Community/Page`(node-id 764:2245) — 게시글 쓰기 화면.
 *
 * View.tsx(`Community/View`, 783:3370)와 동일한 840px 중앙 정렬 레이아웃 패턴을
 * 그대로 따릅니다. 이 프레임을 위해 이미 확보된 기존 컴포넌트(NavigationBar / Button /
 * PostWriteHeader / Input / ContentInputContainer)만 조합했으며 신규 UI 컴포넌트는
 * 만들지 않았습니다.
 *
 * - 제목 인풋(`Input`, node-id 764:2345)과 본문 인풋(`ContentInputContainer`,
 *   node-id 764:2351, state=empty) 사이 간격은 Figma 원본이 20px이지만 `spacing/*`
 *   토큰 스케일(0~64)에 없는 값이라 가장 가까운 `--spacing-24`로 반올림했습니다
 *   (사용자 확정).
 * - 등록하기 버튼은 백엔드 연동이 범위 밖이라 onClick을 지정하지 않았습니다.
 */
export function Write() {
  const navigate = useNavigate();
  const { session } = useSession();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // TEMP: 로그인 완성 전 테스트용으로 비로그인 리다이렉트를 꺼둠 (사용자 요청).
  // 로그인 연동이 끝나면 아래 주석을 해제해서 원복할 것.
  // useEffect(() => {
  //   if (!loading && !session) {
  //     navigate("/login", { replace: true });
  //   }
  // }, [loading, session, navigate]);

  const handleSubmit = async () => {
    if (!session || !title.trim() || !content.trim()) return;

    setSubmitting(true);
    try {
      const { id } = await createPost({
        title,
        content,
        authorId: session.user.id,
      });
      navigate(`/view/${id}`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleAuthClick = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div style={rootStyle}>
      <NavigationBar
        categories={[{ label: "커뮤니티", selected: true }]}
        state={session ? "logout" : "login"}
        onAuthClick={session ? handleAuthClick : () => navigate("/login")}
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
          <div style={innerBodyStyle}>
            <PostWriteHeader />
            <div style={formGroupStyle}>
              <Input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
              <ContentInputContainer
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <Button
              variant="core"
              size="large"
              style={submitButtonStyle}
              disabled={submitting || !title.trim() || !content.trim()}
              onClick={handleSubmit}
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
