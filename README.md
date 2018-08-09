# WordFlip App
This is a client that communicates with Wordsmith's WordFlip API, giving the user the ability to flip sentences and then see them right away through a user-friendly UI.

# How to install

The easiest and quickest way to deploy the app along with the API is through a set of Docker containers with the help of Docker Compose.

Start by cloning the API and the client repositories into an empty directory:

```
$ git clone https://github.com/silkfire/WordFlip.Api.git
$ git clone https://github.com/silkfire/word-flip-app.git
```

Copy the Compose file from the client repository into the current directory:
```
$ cp word-flip-app/docker-compose.yml ./
```

Create an `.env`file in the `word-flip-app`directory with the address of the API:
```
$ echo 'API_URL=localhost:8080' > './word-flip-app/.env'
```
This is the default address but can be tailored to suit your particular requirements. 

Run the Composer to build the respective images of the web API, database and the client:

```
$ docker-compose build
```

Start the containers:
```
$ docker-compose up -d
```

It might be a good idea to wait around 20 seconds so that the database will have time to startup properly. 

The application is ready to be run. The default port is 3000 but this too can be adjusted as required in the Compose file by setting the environment variable `PORT`to a value of your choice.

To stop the service, run the following command:

```
$ docker-compose stop
```

To restart the service, run the following command:

```
$ docker-compose start
```

To delete the containers (in case you're rebuilding the project or just would like to reset the service), run the following command:

```
$ docker-compose down
```

### Happy flipping!
