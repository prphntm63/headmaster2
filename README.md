# Headmaster II

Headmaster II is a full stack application catered toward managing students in a software development learning environment. Instructors are able to track student activity through [Github](https://github.com) commit data and keep tabs on individuals and their specific learning challenges through a timeline of feedback touchpoints.

## Installation - Local Development Setup

1. Ensure [PostgreSQL](https://www.postgresql.org/) has been installed on your machine

2. (Optional) Run the following commands in the PostgreSQL shell to create the `headmaster2` database and `testUser` role.
 
* `CREATE DATABASE headmaster2`
* `CREATE USER testUser WITH PASSWORD 'password'`
* `GRANT ALL PRIVILEGES ON DATABASE headmaster2 to testUser`
 
3. Clone the repository and run `npm install` in the root directory to install dependencies for server.

4. Install Knex globally by running `npm install knex -g`

5. If using different database credentials from 2 (default), modify `knexfile.js` to properly include your PostgreSQL connection settings

6. Use the start script `npm run initalize` to initialize a blank database 

7. If desired, use `npm run seedRandom` to initialize a database with random test data.

8. Add yourself as a superuser by running `npm run addSuperUser --github={your_github_username} --role=superadmin`. Other roles are also available - simply replace `--role=superadmin` with one of the following:

* `superadmin`: View and edit all cohorts, create new cohorts, create and edit students in any cohort, add touchpoints for any student
* `admin` : View and edit user assigned cohorts, create new cohorts, create and edit students in user assigned cohorts, add touchpoints for user assigned students
* `user` : View user assigned cohorts, edit students in user assigned cohorts, add touchpoints for user assigned students

8. Register a new [Github OAuth App](https://github.com/settings/applications/new) to allow authentication on the domain `http://localhost:3000`. The callback will be `http://localhost:3000/auth/callback`.

9. Fill out the relevant parameters in your .env file as per your Github App and other paremeters

9. Deploy locally using `npm run dev` to start application in [nodemon](https://www.npmjs.com/package/nodemon) or `npm start` to run application using NodeJS.

## Deployment

Currently Headmaster II may be deployed directly to Heroku by creating a new Heroku project with the `Heroku Postgres` add on attached from the `heroku-deploy` branch. You will also need to create a new [Github OAuth App](https://github.com/settings/applications/new) with your deployed domain name.

See the [instructions here](https://devcenter.heroku.com/articles/git) on how to deploy a Heroku app using the Heroku CLI.

## Usage

Headmaster is useful for tracking student activity and progress throughout a course.

### Login / Logout
Users must have a valid github account and be added in the database with a defined role in order to log in. Once logged in, the user may log out by clicking the User Menu on the right side of the Menu bar and selecting `Logout`

### Cohorts Page / Home Screen
This view will show all of an instructor's assigned cohorts. If the instructor has an `admin` or `superadmin` role, it also allows creation of new cohorts.

### Cohort Page
This page contains all cohort information and students.
#### Dashboard Tab
In this view, each card shows a concise summary of each student's information, current status, and activity. Users can quickly add touchpoints for multiple students from this view. Cards can be sorted or hidden by various criteria using the controls in the top right.
#### Students Tab
This view shows a list view of students. The list can be sorted by type by clicking on the headers. New students may be added by clickin the `+` icon in the upper right hand corner.
#### Settings Tab
In progress

### Students Page
In progress

### Admin Page
In progress

## Main Architecture

### Server Side
* [ExpressJS](https://expressjs.com/)
* [KnexJS](http://knexjs.org/)
* [Node-Postgres](https://node-postgres.com/)
* [PostgreSQL](https://www.postgresql.org/)

### Client Side
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React-Bootstrap](https://react-bootstrap.github.io/)

## To Do / Future Development

* New features will be tracked on the project [Kanban Board](https://github.com/prphntm63/headmaster2/projects/1)
* Bugs are tracked using the [Issue Tracker](https://github.com/prphntm63/headmaster2/issues)

This project is currently a work in progress and many features have not yet been implemented. If a critical feature is missing or not functioning properly, please open an [issue](https://github.com/prphntm63/headmaster2/issues).

## License
&copy; 2019

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
