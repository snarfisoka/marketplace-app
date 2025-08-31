CREATE DATABASE marketplace_db;

CREATE USER app_user WITH PASSWORD 'app_password';

GRANT ALL PRIVILEGES ON DATABASE marketplace_db TO app_user;

CREATE SCHEMA IF NOT EXISTS marketplace;
ALTER USER app_user SET search_path TO marketplace, public;