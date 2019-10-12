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

6. Use the start script `npm run initalize` to initialize a blank database or `npm run initializeData` to initialize a database with test data.

7. Deploy locally using `npm run dev` to start [nodemon]()) or `npm start` to use Node.

## Usage

Use it like a rented mule. Note to self: come back and update readme when not in the middle of a brew session

## Dependencies

* ExpressJS
* KnexJS
* Pug
* SQLite3

## Requirements
```
Chris Oakman 9:07 PM
- make a new template for the Cohorts page

- add a new route for Students /students/65 should render student with id = 65
- add a migration + seed for Assignments, link assignments to Students with a SQL JOIN (hard mode) (edited) 
- add new route + page for student assignments (hard mode)
- add startDate and endDate input elements for creating a cohort (hint: check out <input type="date">)
```