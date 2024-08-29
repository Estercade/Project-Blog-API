# Project-Blog-API

This project was made following the instructions and specifications for The Odin Project NodeJS Course [Blog API project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api).

## Description

The goal of this project is to create a RESTful blog API using Node.js and Express to create a web server, user authentication using JWT in combination with Passport.js, and PostgreSQL with Prisma ORM for database management.

### Features

- Support for CRUD operations for user accounts, posts, and comments
- User authentication and authorization with protected endpoints

### Usage
 1. Make HTTP requests to API endpoints via the URL: ```https://blogger.adaptable.app/``` 
 2. Send a ```POST``` request to ```/users``` with required username, password, and email keys in request body, which will return the created user
 2. Send a ```POST``` request to ```/login``` using the user information for the created account, which will return a JWT as well as the name of the logged in user
 3. Place the JWT into your headers with the following format ``` authorization : bearer {{JWT string}} ```

### API Endpoints
| Endpoint | Method | Description |
| --- | --- | --- |
| /login | POST | Log into an existing account, will return a JWT |
| /users | GET | Retrieve all user accounts |
| /users | PUT | Create a new user account |
| /users/:username | GET | Retrieve user account information by username, includes posts and comments |
| /users/:username | PUT** | Update user account information by username |
| /users/:username | DELETE** | Delete user account by username |
| /users/:username/posts | GET | Retrieve posts by username |
| /users/:username/comments | GET | Retrieve comments by username |
| /users/:username/drafts | GET** | Retrieve drafts by username |
| /posts | GET | Retrieve all published posts |
| /posts | POST* | Create a new post |
| /posts/:postid | GET | Retrieve post by post ID |
| /posts/:postid | PUT** | Update post by post ID |
| /posts/:postid | DELETE** | Delete post by post ID |
| /posts/:postid/comments | GET | Retrieve comments by post ID |
| /posts/:postid/comments | POST* | Create a comment on post specified by post ID |
| /comments/:commentid | GET | Retrieve comment by comment ID |
| /comments/:commentid | PUT** | Update comment by comment ID |
| /comments/:commentid | DELETE** | Delete comment by comment ID |
 
 \* - indicates routes that require authorization
 
 \*\* - indicates routes that require both authorization and matching user ID

###

## Built using

### Technologies

- HTML5
- JavaScript ES6
- Node 20.16.0
- PostgreSQL 14.12
- Express 4.19.2
- Prisma 5

### Tools

- Visual Studio Code
- Git and GitHub
- npm
- node-postgres
- Passport.js
- jsonwebtoken
- Bcrypt

## Author

Wilson Lee
- [Github](https://github.com/estercade)

## Credits

## Acknowledgments

* [The Odin Project](https://www.theodinproject.com/)
