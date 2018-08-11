# id Software RealTime Chat (Node)

## Initial Setup of Project

### Config Docker

_You must have Docker for Mac/Windows, and Yarn installed and configured before doing any of this._

Clone this repository via Git

```
git clone TO_DO
cd id_software_realtime_chat
cp .env.example .env
yarn docker-install && make
```

The listening tcp port definition can be changed if necessary to avoid any local conflicts with other projects.

### .env file setup

To run a basic, default setup the example file should work out of the box.
Edit the `.env` file with values that correspond to your local environment as necessary.

## Running Project

Assuming you have already completed the initial setup above, running the project is very easy. Simply run:

```
yarn start
```

Changes to files will automatically reload the server within the Docker container.

By default the application will be available on http://localhost:3000

## Project Architecture

Most application code lives in the `/src` directory. The entry point to the app is `/src/server/index.js`. The following are subdirectories of `/src`:

- `/server` - GraphQL server code
- `/client` - GraphQL client code

Test code lives in the `/test` directory. The `/test` directory is structured like `/src`. Tests should be nested the same way in both `/test` and `/src`.

## Commands

See the `scripts` section of `package.json` for a complete list of all the commands available to you.

## API Doc
The entire GraphQL API can be explored from http://localhost:3005/graphql once you start the server up.
Note that the port may be different if you changed the env configuration.
