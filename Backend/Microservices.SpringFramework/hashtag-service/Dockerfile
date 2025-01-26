FROM openjdk:23-jdk-slim AS build
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM openjdk:23-jdk-slim
WORKDIR /app
COPY --from=build /app/target/hashtag-service-v1-0-0.jar hashtag-service-v1-0-0.jar
# CMD ["java", "-jar", "hashtag-service-v1-0-0.jar"]
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
ENTRYPOINT ["java", "-jar", "hashtag-service-v1-0-0.jar"]