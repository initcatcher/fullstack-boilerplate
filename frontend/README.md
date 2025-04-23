# Frontend

React를 사용한 프론트엔드 애플리케이션입니다.

## 기술 스택
- React 18
- React Router
- TypeScript
- Vite
- Styled Components
- Axios

## 프로젝트 구조
```
frontend/
├── src/
│   ├── components/     # 재사용 가능한 컴포넌트
│   ├── pages/         # 페이지 컴포넌트
│   ├── hooks/         # 커스텀 훅
│   ├── api/           # API 통신 관련 코드
│   ├── utils/         # 유틸리티 함수
│   ├── types/         # TypeScript 타입 정의
│   └── styles/        # 전역 스타일
├── public/            # 정적 파일
└── tests/             # 테스트 파일
```

## 개발 환경 설정

1. Node.js 설치 (v16 이상)
2. 의존성 설치:
```bash
npm install
```

## 스크립트

- 개발 서버 실행:
```bash
npm run dev
```

- 프로덕션 빌드:
```bash
npm run build
```

- 테스트 실행:
```bash
npm run test
```

- 린트 검사:
```bash
npm run lint
```

## 환경 변수 설정

`.env` 파일을 생성하고 다음 변수들을 설정하세요:

```env
VITE_API_URL=http://localhost:8080
VITE_NODE_ENV=development
```

## 코딩 컨벤션

- 컴포넌트는 함수형 컴포넌트로 작성
- 상태 관리는 React Query와 Context API 사용
- 스타일링은 Styled Components 사용
- 파일명은 PascalCase 사용 (예: UserProfile.tsx)
- 테스트 파일은 `.test.tsx` 확장자 사용

# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
