# ====================================
# Multi-stage Docker build for Spring Boot
# ====================================

# Stage 1: Build stage
FROM maven:3.9.8-amazoncorretto-17 AS build

WORKDIR /app

# Copy pom.xml first for better layer caching
COPY pom.xml .

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Runtime stage
FROM amazoncorretto:17-alpine-jdk

# Install necessary packages and create non-root user
RUN apk add --no-cache tzdata curl && \
    addgroup -g 1001 appgroup && \
    adduser -u 1001 -G appgroup -s /bin/sh -D appuser

# Set timezone
ENV TZ=Asia/Ho_Chi_Minh

WORKDIR /app

# Copy the JAR file from build stage
COPY --from=build /app/target/tripook-backend-*.jar app.jar

# Change ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=60s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Environment variables with defaults
ENV JAVA_OPTS="-Xmx512m -Xms256m" \
    SPRING_PROFILES_ACTIVE=prod \
    SERVER_PORT=8080

# Run the application
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]