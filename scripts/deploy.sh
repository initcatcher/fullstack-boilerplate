#!/bin/bash
set -e

# 로그 기록 함수
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1"
}

APP_NAME="fullstack-app"
DEPLOY_PATH="$HOME"
DOCKER_COMPOSE_FILE="$DEPLOY_PATH/docker-compose.yml"

log "배포 시작"

# Docker Compose 설치 확인
if ! command -v docker-compose &> /dev/null; then
  log "Docker Compose 설치 중..."
  sudo curl -L "https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
  sudo chmod +x /usr/local/bin/docker-compose
fi

# 애플리케이션 상태 확인
if docker-compose -f $DOCKER_COMPOSE_FILE ps | grep -q $APP_NAME; then
  log "기존 애플리케이션 실행 중"
fi

# 블루-그린 배포 준비
BLUE_PORT=8080
GREEN_PORT=8081
NGINX_PORT=80

# 현재 실행 중인 포트 확인 (블루가 실행 중이면 그린으로, 그렇지 않으면 블루로 배포)
CURRENT_PORT=$(docker-compose -f $DOCKER_COMPOSE_FILE config | grep -oP 'BACKEND_PORT=\K[0-9]+' || echo $BLUE_PORT)
TARGET_PORT=$BLUE_PORT

if [ "$CURRENT_PORT" == "$BLUE_PORT" ]; then
  TARGET_PORT=$GREEN_PORT
  log "그린 배포 시작 (포트: $TARGET_PORT)"
else
  log "블루 배포 시작 (포트: $TARGET_PORT)"
fi

# 배포할 환경의 docker-compose.yml 파일 수정
sed -i "s/BACKEND_PORT=.*/BACKEND_PORT=$TARGET_PORT/" $DOCKER_COMPOSE_FILE

# 이미지 업데이트 및 컨테이너 재시작
log "도커 컨테이너 빌드 및 시작"
cd $DEPLOY_PATH
docker-compose -f $DOCKER_COMPOSE_FILE build
docker-compose -f $DOCKER_COMPOSE_FILE up -d

# 새 서비스가 정상적으로 시작되었는지 확인
log "애플리케이션 상태 확인 중..."
for i in {1..30}; do
  if curl -s http://localhost:$TARGET_PORT/actuator/health | grep -q "UP"; then
    log "애플리케이션이 성공적으로 시작되었습니다."
    break
  fi
  
  if [ $i -eq 30 ]; then
    log "애플리케이션 시작 실패! 이전 상태로 롤백합니다."
    sed -i "s/BACKEND_PORT=.*/BACKEND_PORT=$CURRENT_PORT/" $DOCKER_COMPOSE_FILE
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
    exit 1
  fi
  
  log "애플리케이션 시작 대기 중... ($i/30)"
  sleep 2
done

# Nginx 설정 업데이트
log "Nginx 설정 업데이트"
NGINX_CONF_PATH="$DEPLOY_PATH/nginx/nginx.conf"
sed -i "s/proxy_pass http:\/\/localhost:[0-9]\+/proxy_pass http:\/\/localhost:$TARGET_PORT/" $NGINX_CONF_PATH

# Nginx 재시작
log "Nginx 재시작"
docker-compose -f $DOCKER_COMPOSE_FILE restart nginx

# 이전 버전 종료 (현재 포트가 TARGET_PORT와 다른 경우만)
if [ "$CURRENT_PORT" != "$TARGET_PORT" ]; then
  log "이전 버전 종료 중... (포트: $CURRENT_PORT)"
  OLD_CONTAINER=$(docker ps -qf "name=backend" -f "publish=$CURRENT_PORT")
  if [ ! -z "$OLD_CONTAINER" ]; then
    docker stop $OLD_CONTAINER
    docker rm $OLD_CONTAINER
  fi
fi

log "배포 완료" 