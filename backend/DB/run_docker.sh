docker run -it --name meetme_db -v meetme_db:/var/lib/postgresql/data -e POSTGRES_PASSWORD=mythuperthecretpath --network meetme_be postgres:9.6.8-alpine
