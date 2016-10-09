## Things we use:

* node 4.x - current LTS version. You may want to install via nvm if you have many projects with different requirements
* Angular 2
* Typescript 2
* rxjs
* bluebird (for Promises)
* db-migrate - I prefer to have the schema versioned together with the code, and I prefer the sql mode enabled.
* jade/pug
* stylus
* webpack
* EditorConfig

## Style guides:
* https://github.com/johnpapa/angular-styleguide

* Prefer use of common modules/libraries like bluebird and lodash versus hand rolled implementations.
* Prefer implementing methods that are more functional in nature: they should take input, and return output. As opposed to methods that modify global state or variables that are passed in. This allows the effects of a function to be more isolated and makes it easier for developers to understand and reason the cause and effects of a function. It also makes it easier to write automated tests.
* In general, console.log() statements should be removed and not committed.



## Setting up:

    > npm install
    > npm install -g db-migrate

Inside psql:

    > CREATE DATABASE project;
    > CREATE USER project_user WITH PASSWORD 'password';
    > GRANT ALL PRIVILEGES ON DATABASE "project" TO project_user;
    > CREATE EXTENSION citext;
    > CREATE DATABASE project_test;
    > CREATE USER project_test_user WITH PASSWORD 'password_test';
    > GRANT ALL PRIVILEGES ON DATABASE "project_test" TO project_test_user;
    > CREATE EXTENSION citext;

Then update:

* database.json - used by db-migrate
* server/src/datasources.*.json - used by loopback to connect to the different databases


## npm run scripts:

* npm run build - builds production version of client (slower to build) and then builds server
* npm run build:development - builds development version of client and then server
* npm run buid:server - only build server

* npm run test - runs pretests (linters) and then runs the server tests (clients tests coming)
* npm run test:server - just runs the server tests

* npm start - runs the server, needs to be built prior. In development, server will watch for client changes and rebuild. So you do not need to build the client before starting the server.
* npm run watch - watches the server - rebuilds, restarts the server as necessary. And since the server also watches the client while in development, most of the time you can just run this.


## Directory structure:

    /client     - Angular2 stuff goes in here
      /build    - Webpack build artifacts (from npm run build)
      /src      - your ng2 Typescript code
    /config     - Webpack configuration
    /coverage   - Istanbul coverage reports from tests
    /migrations - db-migrate consumes migrations from this directory
    /node_modules
    /server     - loopback stuff goes in here
      /build    - Typescript compilers output for server side goes here
      /src      - your loopback Typescript code and supporting .json files


## TODO:

* Set up Karma for ng2 side testing
* add a top level common directory, primarily for sharing model interfaces between the server and the client codebase
