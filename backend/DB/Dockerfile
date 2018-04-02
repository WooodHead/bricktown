FROM postgres:9.6.7-alpine
COPY ./db_setup.sql /docker-entrypoint-initdb.d/
COPY ./populate.sql /docker-entrypoint-initdb.d/
