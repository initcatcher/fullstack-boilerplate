import type { Config } from "@react-router/dev/config";

export default {
  // React Router 7 설정
  appDirectory: "app",
  // SPA 모드 활성화 (서버 사이드 렌더링 비활성화)
  ssr: false,
} satisfies Config;
