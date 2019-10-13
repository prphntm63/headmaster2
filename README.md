# Headmaster II

Headmaster II is a full stack application catered toward managing your ~~little shits~~ **students**.

## Installation

1. Ensure [PostgreSQL](https://www.postgresql.org/) has been installed on your machine

2. (Optional) Run the following commands in the PostgreSQL shell to create the `headmaster2` database and `testUser` role.
 
* `CREATE DATABASE headmaster2`
* `CREATE USER testUser WITH PASSWORD 'password'`
* `GRANT ALL PRIVILEGES ON DATABASE headmaster2 to testUser`
 
3. Clone the repository and run `npm install` to install dependencies.

4. Install Knex globally by running `npm install knex -g`

5. If using different database settings from 2, modify `knexfile.js` to properly include your PostgreSQL connection settings

6. Use the start script `npm run initalize` to initialize a blank database 

7. If desired, use `npm run seedRandom` to initialize a database with random test data.

8. Deploy locally using `npm run dev` to start [nodemon]()) or `npm start` to use Node.

## Usage

Use it like a rented mule. Note to self: come back and update readme when not in the middle of a brew session

## Dependencies

* [ExpressJS](https://expressjs.com/)
* [KnexJS](http://knexjs.org/)
* [Pug](https://pugjs.org/)
* [Node-Postgres](https://node-postgres.com/)
* [PostgreSQL](https://www.postgresql.org/)

## To Do

* Add user sign in capability with Github
* Create personalized nav page for each users cohorts
* Create cohort page
* Create student page