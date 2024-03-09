FROM openjdk:17-jdk-slim
ARG JAR_FILE=target/lookingProf-0.0.1.jar
COPY ${JAR_FILE} app_looking.jar
ENTRYPOINT ["java", "-jar", "app_looking.jar"]