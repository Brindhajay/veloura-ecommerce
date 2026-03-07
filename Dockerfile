FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

CMD ["sh", "-c", "java -jar target/veloura-0.0.1-SNAPSHOT.jar --server.port=$PORT"]