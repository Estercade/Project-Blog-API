# Project-Blog-API

This project was made following the instructions and specifications for The Odin Project NodeJS Course [Blog API project](https://www.theodinproject.com/lessons/node-path-nodejs-blog-api).

## Description

The goal of this project is to create a RESTful blog API using Node.js and Express to create a web server, user authentication using JWT in combination with Passport.js, and PostgreSQL with Prisma ORM for database management.

### Features

- Support for CRUD operations for user accounts, posts, and comments
- User authentication and authorization with protected endpoints

### Usage
A preview of this app can be access by making HTTP requests to API endpoints via the URL: ```https://blogger.adaptable.app/``` 

Refer to [documentation](DOCS.md) for further details.

### API Endpoints
| Endpoint | Method | Description |
| --- | --- | --- |
| ```/login``` | ```POST``` |  Log in to an existing account |
| ```/users``` | ```GET``` | Retrieve all user accounts |
| ```/users``` | ```POST``` | Create a new user account |
| ```/users/:username``` | ```GET``` | Retrieve user account information by username
| ```/users/:username``` | ```PUT**``` | Update user account information by username |
| ```/users/:username``` | ```DELETE**``` | Delete user account by username |
| ```/users/:username/posts``` | ```GET``` | Retrieve posts by username |
| ```/users/:username/comments``` | ```GET``` | Retrieve comments by username |
| ```/users/:username/drafts``` | ```GET**``` | Retrieve drafts by username |
| ```/posts``` | ```GET``` | Retrieve all published posts |
| ```/posts``` | ```POST*``` | Create a new post |
| ```/posts/:postid``` | ```GET``` | Retrieve post by post ID |
| ```/posts/:postid``` | ```PUT**``` | Update post by post ID |
| ```/posts/:postid``` | ```DELETE**``` | Delete post by post ID |
| ```/posts/:postid/comments``` | ```GET``` | Retrieve comments by post ID |
| ```/posts/:postid/rating``` | ```POST*``` | Rate a post |
| ```/posts/:postid/rating``` | ```PUT*``` | Update post rating |
| ```/posts/:postid/comments``` | ```POST*``` | Create a comment on post specified by post ID |
| ```/comments/:commentid``` | ```GET``` | Retrieve comment by comment ID |
| ```/comments/:commentid``` | ```PUT**``` | Update comment by comment ID |
| ```/comments/:commentid``` | ```DELETE**``` | Delete comment by comment ID |
| ```/comments/:commentid/rating``` | ```POST*``` | Rate a comment
| ```/comments/:commentid/rating``` | ```PUT*``` | Update comment rating
| ```/comments/:commentid/rating``` | ```POST*``` | Rate a comment
| ```/comments/:commentid/rating``` | ```PUT*``` | Update comment rating

 \* - indicates routes that require authorization
 
 \*\* - indicates routes that require both authorization and matching user ID

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
