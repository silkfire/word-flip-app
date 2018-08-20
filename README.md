# WordFlip App
This is a client that communicates with Wordsmith's WordFlip API, giving the user the ability to flip sentences and then see them right away through a user-friendly UI.

# How to install

The easiest and quickest way to deploy the app along with the API is through a set of Docker containers with the help of Docker Compose.

Start by cloning the API and the client repositories into an empty directory:

```
$ git clone https://github.com/silkfire/WordFlip.Api.git
$ git clone https://github.com/silkfire/word-flip-app.git
```

The default address to the API from the app server container is `http://api:8080` but this can be tailored to suit your particular requirements in the `docker-compose.yml` file by changing the `API_URL` environment variable. 

Run the Composer to build the images of the web API, database and the client, respectively:

```
$ docker-compose -f word-flip-app/docker-compose.yml build
```

Start the containers:
```
$ docker-compose -f word-flip-app/docker-compose.yml up
```

It might be a good idea to wait around 20 seconds so that the database gets the necessary time to start up properly. 

The application is ready to be run. The default port is `3000` but this too can be adjusted as required in the Compose file by setting the environment variable `PORT`to a value of your choice.

To stop the service, run the following command:

```
$ docker-compose -f word-flip-app/docker-compose.yml stop
```

To restart the service, run the following command:

```
$ docker-compose -f word-flip-app/docker-compose.yml start
```

To delete the containers (in case you're rebuilding the project or just would like to reset the service), run the following command:

```
$ docker-compose -f word-flip-app/docker-compose.yml down
```

### Happy flipping!
