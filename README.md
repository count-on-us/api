

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">

## Installation

You can run this project locally, But you will need a PostgresSQL instance running for you. Here are the steps for you to setup the project in your machine.

Copy the `.env.example` file to `.env`:

```bash
$ cp .env.example .env
```

By default the server will run on port `3000`. The debug service can be accessed on the port `9229`.

Change the variables as you please.

Install de dependencies.

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

Alternatively you can run this project in a Docker environment. You will need [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/).

To do this you simple run the following commands:

```bash
# build the image - this may take several minutes
$ docker-compose build

# run the environment
$ docker-compose up
```

I recommend you to not run in detached mode, the NestJS logs are very helpful when you are debugging.

You can still install the JavaScript dependencies in your machine, but you will need to rebuild the image running the following command:

```bash
$ docker-compose build -V
```

That will install the dependencies inside the container.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
