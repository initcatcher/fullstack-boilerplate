# Fullstack-boilerplate

AWS + CI/CD 스터디를 위한 풀스택 프로젝트 보일러플레이트입니다.

## 기술 스택

### 프론트엔드
- React 19
- React-Router
- TypeScript
- Node.js
- npm

### 백엔드
- Spring Boot
- Java 21
- Maven
- Mysql

### 인프라
- Nginx (리버스 프록시)
- AWS
- Docker

## 프로젝트 구조
```
fullstack-boilerplate/
├── frontend/           # React 프론트엔드
├── backend/            # Spring Boot 백엔드
└── nginx/             # Nginx 설정
```

## 시작하기

### 프론트엔드 설정 (frontend/)
1. Node.js 설치 (v16 이상 권장)
2. 의존성 설치:
```bash
cd frontend
npm install
```
3. 개발 서버 실행:
```bash
npm run dev
```
4. 빌드:
```bash
npm run build
```

### 백엔드 설정 (backend/)
1. JDK 21 설치
2. 프로젝트 빌드:
```bash
cd backend
mvn clean install
```
3. 서버 실행:
```bash
mvn spring-boot:run
```

### Nginx 설정 (nginx/)
1. Nginx 설치
2. nginx.conf 파일을 nginx 설정 디렉토리에 복사
3. Nginx 시작:
```bash
sudo service nginx start
```

## 개발 환경 설정

### 환경 변수
프로젝트 실행을 위해 다음 환경 변수들을 설정해야 합니다:

```env
# Frontend (.env)
VITE_API_URL=http://localhost:8080

# Backend (application.properties)
spring.profiles.active=dev
server.port=8080
```

## 배포

### Docker를 이용한 배포

프로젝트는 Docker와 docker-compose를 사용하여 컨테이너화되어 있습니다.

1. Docker 이미지 빌드 및 실행:
```bash
# 모든 서비스 빌드 및 실행
docker-compose up --build

# 백그라운드에서 실행
docker-compose up -d
```

2. 서비스 중지:
```bash
docker-compose down
```

3. 개별 서비스 로그 확인:
```bash
# 프론트엔드 로그
docker-compose logs frontend

# 백엔드 로그
docker-compose logs backend
```

4. 컨테이너 상태 확인:
```bash
docker-compose ps
```

각 서비스는 다음 포트로 접근 가능합니다:
- 프론트엔드: http://localhost:3000
- 백엔드: http://localhost:8080
- Nginx: http://localhost:80

## 문제 해결

일반적인 문제 해결 방법:

1. 포트 충돌: 8080(백엔드) 또는 3000(프론트엔드) 포트가 이미 사용 중인 경우 환경 변수에서 포트를 변경하세요.
2. CORS 에러: nginx.conf의 CORS 설정을 확인하세요.
3. 빌드 실패: Node.js 및 Java 버전이 요구사항과 일치하는지 확인하세요.

## 기여하기

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.
3. 변경사항을 커밋합니다.
4. 브랜치에 푸시합니다.
5. Pull Request를 생성합니다.


