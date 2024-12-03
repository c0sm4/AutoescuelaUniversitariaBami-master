# Etapa 1: Construcción del backend y frontend
FROM maven:3.8.5-openjdk-17 AS backend-frontend-builder
WORKDIR /app

# Copiar todos los archivos necesarios para la construcción del backend y frontend
COPY pom.xml .
COPY sonar-project.properties .
COPY src ./src
COPY .mvn .mvn
COPY mvnw .

# Copiar también los archivos del frontend necesarios para que Maven pueda manejar las dependencias
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY webpack ./webpack

# Ejecutar Maven para construir el proyecto (incluye la instalación de dependencias del frontend)
RUN ./mvnw clean package -DskipTests

# Etapa 2: Imagen final
FROM openjdk:17
WORKDIR /app

# Copiar el archivo jar generado por el backend-builder
COPY --from=backend-frontend-builder /app/target/autoescuela-universitaria-0.0.1-SNAPSHOT.jar app.jar

# Copiar los archivos estáticos generados durante la construcción del frontend
COPY --from=backend-frontend-builder /app/target/classes/static ./public

# Exponer el puerto 8080 para la aplicación
EXPOSE 8080 

# Ejecutar la aplicación
CMD ["java", "-jar", "app.jar"]
