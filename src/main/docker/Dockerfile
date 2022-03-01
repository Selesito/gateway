FROM maven:3.6.3-openjdk-11
RUN mkdir gateway
WORKDIR gateway
COPY . .
RUN mvn package -Dmaven.test.skip=true
EXPOSE 8080
CMD ["java", "-jar", "target/gateway-0.0.1-SNAPSHOT.jar"]
