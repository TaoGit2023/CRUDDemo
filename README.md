# Tution Courses CRUD Simulation

A simulation of a tuition courses management system with CRUD operations. The project uses HTML, CSS, JavaScript for the frontend, and ExpressJS, MongoDB, and Mongoose for the backend.

## Features

- Add new courses
- View the list of courses
- Delete existing courses
- Modify course details

## Technologies Used

- Frontend: HTML, CSS, JavaScript
- Backend: ExpressJS, MongoDB, Mongoose
- Additional Packages: CORS, Json parsing

## Installation

1. Clone the repository:

   git clone https://github.com/TaoGit2023/CRUDDemo.git
2. Install dependencies:
cd CRUDDemo
npm install


## Usage
Open the index.html in live server.
in db.js , set password: KzqSynOPI1jMPyem, const db = "mongodb+srv://xutao5661990:<password>@coursecrud.xslbayt.mongodb.net/"; 
run npx nodemon server.js in terminal



## Use the provided interface to:
Add new courses
View the list of courses
Delete existing courses
Modify course details
The backend is powered by ExpressJS and MongoDB, providing a seamless communication experience between the frontend and backend.

## API Endpoints
GET /courses: Get the list of all courses.
POST /courses: Add a new course.
DELETE /courses/:id: Delete a course by ID.
PUT /courses/:id: Modify course details by ID.
## Data Validation
The backend uses Mongoose schema to validate the data structure, ensuring that only valid data is accepted. If the data does not match the schema, an error message is returned.
