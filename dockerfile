FROM ubuntu
RUN apt-get update && \
    apt-get install -y build-essential pip net-tools iputils-ping iproute2 curl

RUN curl -fsSLhttps://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g watchify

EXPOSE 3000
EXPOSE 2000-2020
EXPOSE 10000-10100
