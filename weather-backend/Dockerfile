# ---- Stage 1: Build ----
FROM eclipse-temurin:21-jdk AS builder

WORKDIR /app

# Install Maven inside container since mvnw is missing
RUN apt-get update && apt-get install -y maven

# Copy project files
COPY pom.xml .
COPY src ./src

# Build spring boot project
RUN mvn clean package -DskipTests

# ---- Stage 2: Run ----
FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8099

ENTRYPOINT ["java", "-jar", "app.jar"]
