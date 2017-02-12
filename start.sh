
#!/usr/bin/env bash

#docker stop $(docker ps -a -q)
#docker rm -f $(docker ps -a -q)
#docker rmi -f $(docker images -q)


cd app-hyperledger
. setenv.sh
#docker-compose -f single-peer-ca.yaml up -d
docker-compose -f four-peer-ca.yaml up -d

cd ../app-webservice
#cd app-webservice
docker build -t ccpe/ws .

docker network connect bridge dockerhyperledger_vp_1
docker network connect bridge dockerhyperledger_vp_2
docker network connect bridge dockerhyperledger_vp_3
docker network connect bridge dockerhyperledger_vp_4

#docker run -p 9999:3000 -d ccpe/ws
docker run --name ccpe_node --net=bridge -p 9999:3000 ccpe/ws