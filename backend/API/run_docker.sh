docker build -t devtonym/meetme_be .
docker run --name meetme_be -p 5001:8080 --mount type=bind,source="$(pwd)"/data,target=/usr/src/app/data --network meetme_be devtonym/meetme_be