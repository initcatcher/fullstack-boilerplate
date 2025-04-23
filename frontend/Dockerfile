FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# 개발 서버 시작 (host 설정이 0.0.0.0인 것 확인)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

EXPOSE 3000