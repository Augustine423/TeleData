# Stage 1: Build the Spring Boot application
FROM maven:3.9.9-eclipse-temurin-21 AS builder
WORKDIR /app
COPY . .
RUN chmod +x mvnw
RUN ./mvnw dependency:resolve
COPY src/ ./src/
RUN ./mvnw clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

# Expose HTTP port (8080) and UDP ports (14555-14559)
EXPOSE 8080
EXPOSE 14555/udp
EXPOSE 14556/udp
EXPOSE 14557/udp
EXPOSE 14558/udp
EXPOSE 14559/udp

ENTRYPOINT ["java", "-jar", "app.jar"]