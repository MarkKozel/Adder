# Adder

Just a silly proof-of-concept for a docker server that listens on port 3123

The server.js is run in the container, listening for keywords
 * time - returns the system time of the server
 * hi, bye, and goodbye - return silly text
 * math - starts a cycle between server and client to perform basic math function. Server will prompt client for info to enter. Sending **stop** and anytime will exit math cycle

Update ```client-cli-docker.js``` ws ip address to match docker ip. Don't forget to export port 3123

## Docker Info

```sudo docker build -t markkozel/adder:<some tag> .``` to build local image

```sudo docker login```

```sudo docker push markkozel/adder:<some tag>``` to push to Dockerhub