#!/usr/bin/env bash

docker stop $(docker ps -a -q)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)


cd ../app-webservice
docker build -t ccpe/web-serv

docker run -p 9999:3000 ccpe/web-serv