# Headmaster II

Headmaster II is a full stack application catered toward managing your ~~little shits~~ **students**.

## Installation
 
Clone the repository and  

Use the start script `npm setup` to initialize a blank database or `npm test` to initialize a database with test data.

Currently the database is set up to run as SQLite 3, but can be changed to use any Knex compatible database by modifying the declaration in `index.js`.

Deploy locally (using a package such as [serve]() or [nodemon]()) or to a provider of your choice.

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