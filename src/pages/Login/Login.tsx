import { useState, type ChangeEvent, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../../components/ui/Logo";
import { TitleInput } from "../../components/ui/TitleInput";
import { Button } from "../../components/ui/Button";
import { LoginBottom } from "../../components/ui/LoginBottom";
import { Icon } from "../../components/ui/Icon";
import { supabase } from "../../lib/supabase";

type AuthMode = "signin" | "signup";

// Figma: node-id 781:4699 (`Community/Login`). 카드 외부 여백(200px)·카드 내부
// padding(좌우 160px/상하 90px)·카드 폭(720px)은 spacing 토큰 스케일(최대 64px)에
// 없지만, 사용자 확정에 따라 Figma 원본 px 값을 그대로 고정값으로 사용합니다
// (토큰 근사 없음).
const rootStyle: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  minHeight: "100vh",
  paddingTop: "200px",
  paddingBottom: "200px",
  backgroundColor: "var(--color-background-subtle)",
};

const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "var(--spacing-32)",
  width: "720px",
  padding: "90px 160px",
  backgroundColor: "var(--color-background-default)",
  borderRadius: "var(--radius-2xl)",
};

const inputListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-16)",
  width: "100%",
  maxWidth: "320px",
};

const bodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "var(--spacing-8)",
  width: "100%",
};

const loginAreaStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "var(--spacing-16)",
  width: "100%",
};

const passwordWrapperStyle: CSSProperties = {
  position: "relative",
  width: "100%",
};

// `TitleInput`의 라벨 행(padding 4px + caption/body-sm-bold line-height 21px = 29px) +
// 루트 gap(2px) + input 행(border 1px + padding 12px + body-lg-regular line-height 24px
// + padding 12px + border 1px = 50px)을 박스 모델로 계산하면 input 세로 중앙은
// TitleInput 루트 top 기준 56px 지점입니다. 16px 아이콘 버튼을 그 중앙에 맞추기 위해
// top을 56 - 8 = 48px로 계산했습니다. 브라우저 실측이 아닌 CSS 박스 모델 계산값이므로,
// 실제 렌더링에서 폰트 메트릭 차이로 수 px 오차가 있을 수 있습니다.
const passwordToggleButtonStyle: CSSProperties = {
  position: "absolute",
  top: "48px",
  right: "var(--spacing-16)",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: "16px",
  height: "16px",
  padding: 0,
  border: "none",
  background: "none",
  cursor: "pointer",
  color: "var(--color-text-tertiary)",
};

/**
 * 로그인 페이지.
 *
 * Figma: node-id 781:4699 (`Community/Login`). Logo + 이메일/비밀번호 입력 +
 * 로그인 버튼 + 구글 로그인 버튼 + LoginBottom(로그인 유지/비밀번호 찾기/회원가입
 * 안내)을 세로로 배치한 흰색 카드가 연한 회색 배경 위에 중앙 정렬됩니다.
 * NavigationBar는 이 화면에 없습니다.
 *
 * - `Logo`/`TitleInput`/`Button`/`LoginBottom`/`Icon`은 기존 컴포넌트를 그대로
 *   재사용하며 수정하지 않습니다.
 * - 비밀번호 표시/숨김 토글은 `TitleInput` 내부가 아니라 이 페이지에서
 *   `position: relative` 래퍼 + 절대 위치 버튼으로 구현합니다. `TitleInput`에는
 *   `type`/`style`(paddingRight) prop만 전달해 우회합니다.
 * - "구글로 로그인 하기" 버튼은 Figma의 별도 `LoginGoogle` 서브컴포넌트 대신 기존
 *   `Button`(variant="mono-light" size="medium" icon="google")으로 100% 커버되어
 *   별도 컴포넌트를 만들지 않았습니다.
 * - "로그인"/"구글로 로그인" 버튼의 제출/인증 로직은 백엔드 연동 범위 밖이라
 *   onClick을 지정하지 않았습니다.
 */
export function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleKeepLoggedInChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeepLoggedIn(event.target.checked);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMessage("");

    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setSubmitting(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    navigate("/home");
  };

  const handleGoogleLogin = async () => {
    setErrorMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/home` },
    });
    if (error) setErrorMessage(error.message);
  };

  const handleSignUpToggle = () => {
    setErrorMessage("");
    setMode((prev) => (prev === "signin" ? "signup" : "signin"));
  };

  return (
    <div style={rootStyle}>
      <div style={cardStyle}>
        <Logo />
        <div style={inputListStyle}>
          <div style={bodyStyle}>
            <div style={loginAreaStyle}>
              <TitleInput
                label="이메일"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={handleEmailChange}
              />
              <div style={passwordWrapperStyle}>
                <TitleInput
                  label="비밀번호"
                  type={showPassword ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{ paddingRight: "var(--spacing-40)" }}
                  error={Boolean(errorMessage)}
                  helpText={errorMessage || undefined}
                />
                <button
                  type="button"
                  aria-label={
                    showPassword ? "비밀번호 숨기기" : "비밀번호 표시"
                  }
                  onClick={() => setShowPassword((prev) => !prev)}
                  style={passwordToggleButtonStyle}
                >
                  <Icon name={showPassword ? "eye-on" : "eye-off"} size={16} />
                </button>
              </div>
            </div>
            <Button
              variant="core"
              size="large"
              style={{ width: "100%" }}
              disabled={submitting}
              onClick={handleSubmit}
            >
              {mode === "signin" ? "로그인" : "회원가입"}
            </Button>
            <Button
              variant="mono-light"
              size="medium"
              icon="google"
              style={{ width: "100%" }}
              onClick={handleGoogleLogin}
            >
              구글로 로그인 하기
            </Button>
          </div>
          <LoginBottom
            checked={keepLoggedIn}
            onChange={handleKeepLoggedInChange}
            onSignUpClick={handleSignUpToggle}
          />
        </div>
      </div>
    </div>
  );
}
