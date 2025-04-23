# Backend

Spring Boot를 사용한 백엔드 애플리케이션입니다.

## 기술 스택
- Spring Boot 3.x
- Java 21
- Spring Data JPA
- Spring Security
- Maven
- MySQL
- JUnit 5

## 프로젝트 구조
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/
│   │   │       ├── config/      # 설정 파일
│   │   │       ├── controller/  # REST 컨트롤러
│   │   │       ├── service/     # 비즈니스 로직
│   │   │       ├── repository/  # 데이터 접근 계층
│   │   │       ├── domain/      # 엔티티 클래스
│   │   │       └── dto/         # 데이터 전송 객체
│   │   └── resources/
│   │       ├── application.yml  # 애플리케이션 설정
│   │       └── static/          # 정적 리소스
│   └── test/                    # 테스트 코드
└── pom.xml                      # Maven 빌드 설정
```

## 개발 환경 설정

1. JDK 21 설치
2. MySQL 설치 및 데이터베이스 생성
3. application.yml 설정

## 빌드 및 실행

- 프로젝트 빌드:
```bash
mvn clean install
```

- 애플리케이션 실행:
```bash
mvn spring-boot:run
```

- 테스트 실행:
```bash
mvn test
```

## 데이터베이스 설정

`application.yml` 파일에 다음 설정을 추가하세요:

```yaml
spring:
  datasource:
    url: jdbc:mysql://localhost:3306/your_database
    username: your_username
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
    show-sql: true
```

## API 문서

Swagger UI를 통해 API 문서를 확인할 수 있습니다:
```
http://localhost:8080/swagger-ui.html
```

## 코딩 컨벤션

- 클래스명은 PascalCase 사용
- 메서드명은 camelCase 사용
- REST API 엔드포인트는 복수형 명사 사용
- 패키지명은 소문자 사용
- 테스트 클래스는 Test로 끝나도록 명명 