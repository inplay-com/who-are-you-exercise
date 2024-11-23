# Use the official MongoDB image as a base
FROM mongo:6.0.19

ENV MONGO_INITDB_ROOT_USERNAME=root
ENV MONGO_INITDB_ROOT_PASSWORD=password
ENV MONGO_INITDB_DATABASE=staging

COPY docker-entrypoint-initdb.d /docker-entrypoint-initdb.d
COPY initial-data /initial-data

EXPOSE 27017


CMD ["mongod"]
