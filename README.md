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
- GitHub Actions (CI/CD)

## 프로젝트 구조
```
fullstack-boilerplate/
├── frontend/           # React 프론트엔드
├── backend/            # Spring Boot 백엔드
├── nginx/              # Nginx 설정
├── scripts/            # 배포 스크립트
└── .github/            # GitHub Actions 워크플로우
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

## AWS EC2 서버 설정

### EC2 인스턴스 생성
1. AWS 콘솔에서 EC2 인스턴스 생성
   - Ubuntu Server 22.04 LTS 또는 Amazon Linux 2 AMI 선택
   - t2.micro 이상 권장 (프리티어 가능)
   - 보안 그룹 설정: 80(HTTP), 22(SSH), 8080, 8081, 3000 포트 개방
   - 키 페어 생성 및 다운로드

2. 탄력적 IP 할당 (선택 사항)
   - AWS 콘솔 > EC2 > 탄력적 IP > 주소 할당
   - 인스턴스에 탄력적 IP 연결

### EC2 초기 설정
1. SSH로 EC2 인스턴스에 접속:
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

2. 시스템 업데이트:
```bash
sudo yum update -y   # Amazon Linux
# 또는
sudo apt update && sudo apt upgrade -y   # Ubuntu
```

3. Docker 설치:
```bash
# Amazon Linux 2
sudo amazon-linux-extras install docker
sudo service docker start
sudo usermod -a -G docker ec2-user
sudo systemctl enable docker

# Ubuntu
sudo apt install -y docker.io
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ubuntu
```

4. Docker Compose 설치:
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

5. GitHub Actions 배포를 위한 SSH 키 설정:
```bash
# authorized_keys 파일에 GitHub Actions 공개키 추가
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys
```

6. 애플리케이션 디렉토리 생성:
```bash
mkdir -p ~/frontend/dist
mkdir -p ~/backend
mkdir -p ~/nginx
```

### 배포 테스트
수동으로 배포 스크립트 실행:
```bash
chmod +x ~/deploy.sh
./deploy.sh
```

## CI/CD 파이프라인

이 프로젝트는 GitHub Actions를 사용한 CI/CD 파이프라인을 구현했습니다.

### 워크플로우 단계
1. **프론트엔드 테스트 및 빌드**: 프론트엔드 코드를 테스트하고 빌드합니다.
2. **백엔드 테스트 및 빌드**: 백엔드 코드를 테스트하고 빌드합니다.
3. **배포**: 메인 브랜치에 푸시된 경우 테스트 통과 후 EC2에 무중단 배포합니다.

### GitHub Actions 설정 방법

1. **저장소 구조 확인**: 
   - `.github/workflows/ci-cd.yml` 파일이 있는지 확인합니다.
   - `scripts/deploy.sh` 파일이 있는지 확인합니다.

2. **GitHub Secrets 설정**:
   - GitHub 저장소로 이동
   - Settings > Secrets and variables > Actions 접속
   - 다음 Secrets 추가:
     - `SSH_PRIVATE_KEY`: EC2 서버 접속용 SSH 프라이빗 키 (전체 키 내용 복사)
     - `EC2_HOST`: EC2 서버 IP 주소 또는 도메인 (예: 123.456.789.123)
     - `EC2_USER`: EC2 서버 접속 사용자명 (예: ubuntu, ec2-user)

3. **EC2 서버 준비**:
   - EC2 인스턴스에 Docker 및 Docker Compose 설치
   - 퍼블릭 IP를 할당하고 보안 그룹에서 필요한 포트 개방 (80, 8080, 8081, 3000)
   - SSH 접속 키 페어 설정
   
4. **SSH 키 설정**:
   - 로컬에서 SSH 키 생성: `ssh-keygen -t rsa -b 4096 -f github-actions-key`
   - 생성된 프라이빗 키(`github-actions-key`)는 GitHub Secrets에 등록
   - 퍼블릭 키(`github-actions-key.pub`)는 EC2 인스턴스의 `~/.ssh/authorized_keys`에 추가

5. **GitHub Actions 워크플로우 확인**:
   - main 브랜치에 코드 푸시
   - GitHub 저장소의 "Actions" 탭에서 워크플로우 실행 상태 확인
   - 워크플로우가 성공적으로 실행되는지 로그 확인

### 워크플로우 커스터마이징

필요에 따라 `.github/workflows/ci-cd.yml` 파일을 수정할 수 있습니다:

```yaml
# 브랜치 이름 변경
on:
  push:
    branches: [ main, develop ]  # 원하는 브랜치 이름으로 변경

# 테스트 설정 변경
- name: Run tests
  run: npm test -- --coverage  # 커버리지 리포트 추가

# JDK 버전 변경
- name: Set up JDK
  uses: actions/setup-java@v4
  with:
    java-version: '21'  # JDK 버전 변경
```

### 무중단 배포

이 프로젝트는 블루-그린 배포 방식의 무중단 배포를 구현했습니다:

1. 새 버전을 다른 포트(블루/그린)에 배포
2. 헬스 체크 통해 새 버전 정상 동작 확인
3. Nginx 설정 변경으로 트래픽 전환
4. 이전 버전 종료

## 문제 해결

일반적인 문제 해결 방법:

1. 포트 충돌: 8080(백엔드) 또는 3000(프론트엔드) 포트가 이미 사용 중인 경우 환경 변수에서 포트를 변경하세요.
2. CORS 에러: nginx.conf의 CORS 설정을 확인하세요.
3. 빌드 실패: Node.js 및 Java 버전이 요구사항과 일치하는지 확인하세요.
4. 배포 실패: GitHub Secrets 설정 및 SSH 키 권한을 확인하세요.

### GitHub Actions 오류 해결

1. **SSH 인증 문제**
   - GitHub Secrets에 등록한 SSH 키가 EC2 인스턴스의 authorized_keys 파일에 제대로 등록되었는지 확인
   - SSH 키 권한이 올바른지 확인: `chmod 600 ~/.ssh/id_rsa`
   - 워크플로우 로그에서 SSH 오류 메시지 확인

2. **빌드 실패**
   - 프론트엔드: `npm run lint` 또는 `npm test` 명령 실패 시 해당 스크립트가 package.json에 정의되어 있는지 확인
   - 백엔드: Maven 빌드 실패 시 의존성 문제 검토

3. **배포 실패**
   - EC2 인스턴스의 디스크 공간 부족 여부 확인: `df -h`
   - Docker 서비스 실행 중인지 확인: `sudo systemctl status docker`
   - 워크플로우 로그에서 실패한 단계 확인

4. **GitHub Actions 워크플로우가 트리거되지 않음**
   - `.github/workflows/ci-cd.yml` 파일이 올바른 위치에 있는지 확인
   - 트리거 조건(브랜치 이름 등)이 올바르게 설정되었는지 확인

### 블루-그린 배포 문제 해결

1. **새 버전이 시작되지 않음**
   - EC2 인스턴스에서 직접 Docker 로그 확인: `docker logs <container-id>`
   - Spring Boot 애플리케이션 로그 확인: `docker-compose logs backend`
   - 포트 충돌 여부 확인: `netstat -tulpn | grep LISTEN`

2. **Nginx 프록시 문제**
   - Nginx 설정 파일에서 upstream 설정 확인
   - Nginx 로그 확인: `docker-compose logs nginx`
   - Nginx 구성 테스트: `nginx -t`

3. **헬스 체크 실패**
   - Spring Boot Actuator 엔드포인트 접근 가능 여부 확인
   - 데이터베이스 연결 상태 확인
   - 방화벽/보안그룹에서 필요한 포트가 열려있는지 확인

## 기여하기

1. 이 저장소를 포크합니다.
2. 새로운 브랜치를 생성합니다.
3. 변경사항을 커밋합니다.
4. 브랜치에 푸시합니다.
5. Pull Request를 생성합니다.

## TODO 리스트

### 프론트엔드
- [ ] E2E 테스트 추가 (Cypress 또는 Playwright)
- [ ] 환경별 설정 파일 구분 (.env.development, .env.production)
- [ ] 에러 로깅 시스템 구축 (Sentry 등)
- [ ] 성능 최적화 (Code splitting, 이미지 최적화)
- [ ] PWA(Progressive Web App) 지원 추가

### 백엔드
- [ ] API 문서화 (Swagger/OpenAPI)
- [ ] 통합 테스트 추가
- [ ] 캐싱 전략 구현 (Redis)
- [ ] 로그 수집 시스템 구축 (ELK 스택)
- [ ] 서버 성능 모니터링 도구 추가

## 도전과제

### 초급 과제
1. **다양한 환경 설정**
   - 개발/테스트/스테이징/프로덕션 환경 분리 구성
   - 환경별 CI/CD 파이프라인 구성

2. **모니터링 시스템 구축**
   - 서버 상태 모니터링 (Prometheus + Grafana)
   - 알림 시스템 설정 (Slack, 이메일)

3. **테스트 자동화 강화**
   - 프론트엔드 E2E 테스트 추가
   - 백엔드 통합 테스트 추가

### 중급 과제
1. **컨테이너 오케스트레이션**
   - Kubernetes로 마이그레이션
   - 쿠버네티스 Manifest 파일 작성
   - GitHub Actions를 이용한 K8s 배포 자동화

2. **마이크로서비스 아키텍처**
   - 모놀리식 백엔드를 마이크로서비스로 분리
   - API 게이트웨이 구축 (Spring Cloud Gateway)
   - 서비스 디스커버리 추가 (Consul, Eureka)

3. **데이터베이스 성능 최적화**
   - 읽기/쓰기 분리 (Master-Slave 구성)
   - 데이터베이스 마이그레이션 툴 적용 (Flyway, Liquibase)

### 고급 과제
1. **멀티 리전 배포**
   - AWS 리전 간 배포 구성
   - 글로벌 로드 밸런싱 설정
   - 재해 복구 (DR) 전략 구현

2. **서버리스 아키텍처**
   - AWS Lambda로 일부 기능 마이그레이션
   - API Gateway와 통합
   - 서버리스 데이터베이스 연결 (DynamoDB)

3. **고급 CI/CD 파이프라인**
   - 카나리 배포 구현
   - A/B 테스트 인프라 구축
   - 자동 롤백 전략 고도화


