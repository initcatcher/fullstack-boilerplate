# Nginx 베이스 이미지 사용
FROM nginx:alpine

# 기본 Nginx 설정 제거
RUN rm /etc/nginx/conf.d/default.conf

# 커스텀 Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/

# 포트 노출
EXPOSE 80 