FROM postgres:16-alpine

ENV POSTGRES_USER=app_user
ENV POSTGRES_PASSWORD=app_password
ENV POSTGRES_DB=marketplace_db

COPY init.sql /docker-entrypoint-initdb.d/