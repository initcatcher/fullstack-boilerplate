# JDK 21 베이스 이미지 사용
FROM eclipse-temurin:21-jdk-alpine

# 작업 디렉토리 설정
WORKDIR /app

# Maven 래퍼와 pom.xml 복사
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Maven 래퍼에 실행 권한 부여
RUN chmod +x ./mvnw

# 의존성 다운로드
RUN ./mvnw dependency:go-offline

# 소스 코드 복사
COPY src ./src

# 애플리케이션 빌드
RUN ./mvnw package -DskipTests

# 특정 JAR 파일명으로 실행 (버전 포함)
CMD ["java", "-jar", "target/demo-0.0.1-SNAPSHOT.jar"]

# 포트 노출
EXPOSE 8080 