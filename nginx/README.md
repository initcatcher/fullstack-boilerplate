# Nginx 설정

프론트엔드와 백엔드 서비스를 위한 Nginx 리버스 프록시 설정입니다.

## 구조
```
nginx/
├── nginx.conf          # 메인 설정 파일
├── conf.d/            # 추가 설정 파일
│   └── default.conf   # 기본 서버 설정
└── ssl/               # SSL 인증서 (프로덕션 환경)
```

## 설정 방법

1. Nginx 설치:
```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install nginx

# CentOS/RHEL
sudo yum install nginx
```

2. 설정 파일 복사:
```bash
sudo cp nginx.conf /etc/nginx/nginx.conf
sudo cp conf.d/default.conf /etc/nginx/conf.d/default.conf
```

3. Nginx 시작:
```bash
sudo systemctl start nginx
```

## 기본 설정 설명

### 프록시 설정
- 프론트엔드 (React): `localhost:3000`
- 백엔드 (Spring Boot): `localhost:8080`

### SSL 설정 (프로덕션)
- SSL 인증서 위치: `/etc/nginx/ssl/`
- HTTPS 리다이렉션 활성화

### CORS 설정
- 허용된 오리진 설정
- 프리플라이트 요청 처리

## 모니터링

Nginx 상태 확인:
```bash
sudo systemctl status nginx
```

로그 확인:
```bash
# 액세스 로그
tail -f /var/log/nginx/access.log

# 에러 로그
tail -f /var/log/nginx/error.log
```

## 문제 해결

1. 502 Bad Gateway
   - 백엔드 서버 실행 여부 확인
   - 포트 설정 확인

2. 404 Not Found
   - 경로 설정 확인
   - 정적 파일 위치 확인

3. CORS 에러
   - CORS 헤더 설정 확인
   - 허용된 오리진 확인 