## Blog API Documentation <a name="top"></a>
### Usage<a name="usage"></a>
Make HTTP requests to API endpoints via the URL: ```https://project-blog-api.onrender.com/``` 

To access protected routes:
1. Send a ```POST``` request to ```/users``` with required username, password, and email keys in request body, which will return the created user
    1a. Admin account can optionally be created by adding role to the request body with the value ```"ADMIN"``` in order to access admin-protected routes
2. Send a ```POST``` request to ```/login``` using the user information for the created account, which will return a JWT as well as the name of the logged in user
3. Place the JWT into your headers with the following format ``` authorization : bearer {{JWT string}} ```

### API Endpoints
| Endpoint | Method | Description |
| --- | --- | --- |
| ```/login``` | ```POST``` |  <a href="#login">Log in to an existing account</a> |
| ```/users``` | ```GET``` | <a href="#retrieve-all-users">Retrieve all user accounts</a> |
| ```/users``` | ```POST``` | <a href="#create-user">Create a new user account</a> |
| ```/users/:username``` | ```GET``` | <a href="#retrieve-user">Retrieve a user's account information</a> |
| ```/users/:username``` | ```PUT**``` | <a href="#update-user">Update user account information</a> |
| ```/users/:username``` | ```DELETE**``` | <a href="#delete-user">Delete a user account</a> |
| ```/users/:username/posts``` | ```GET``` | <a href="#retrieve-user-posts">Retrieve a user's posts</a> |
| ```/users/:username/comments``` | ```GET``` | <a href="#retrieve-user-comments">Retrieve a user's comments</a> |
| ```/users/:username/drafts``` | ```GET**``` | <a href="#retrieve-user-drafts">Retrieve a user's drafts</a> |
| ```/posts``` | ```GET``` | <a href="#retrieve-all-posts">Retrieve all published posts</a> |
| ```/posts``` | ```POST*``` | <a href="#create-post">Create a new post</a> |
| ```/posts/:postid``` | ```GET``` | <a href="#retrieve-post">Retrieve a post</a> |
| ```/posts/:postid``` | ```PUT**``` | <a href="#update-post">Update a post</a> |
| ```/posts/:postid``` | ```DELETE**``` | <a href="#delete-post">Delete a post</a> |
| ```/posts/:postid/comments``` | ```GET``` | <a href="#retrieve-post-comments">Retrieve a post's comments</a> |
| ```/posts/:postid/comments``` | ```POST*``` | <a href="#create-comment">Create a comment on a post</a> |
| ```/posts/:postid/ratings``` | ```POST*``` | <a href=#rate-post>Rate a post</a> |
| ```/posts/:postid/ratings``` | ```PUT*``` | <a href=#update-post-rating>Update a post rating</a> |
| ```/comments/:commentid``` | ```GET``` | <a href="#retrieve-comment">Retrieve a comment</a> |
| ```/comments/:commentid``` | ```PUT**``` | <a href="#update-comment">Update a comment</a> |
| ```/comments/:commentid``` | ```DELETE**``` | <a href="#delete-comment">Delete a comment</a> |
| ```/comments/:commentid/ratings``` | ```POST*``` | <a href=#rate-comment>Rate a comment</a>
| ```/comments/:commentid/ratings``` | ```PUT*``` | <a href=#update-comment-rating>Update a comment rating</a>
| ```/admin/users/``` | ```GET***``` | <a href="#admin-retrieve-all-users">Retrieve all user accounts (ADMIN)</a> |
| ```/admin/users/:username``` | ```GET***``` | <a href="#admin-retrieve-user">Retrieve a user's account information (ADMIN)</a> |
| ```/admin/users/:username``` | ```PUT***``` | <a href="#admin-update-user">Update user account information (ADMIN)</a> |
| ```/admin/users/:username``` | ```DELETE***``` | <a href="#admin-delete-user">Delete a user account (ADMIN)</a> |
| ```/admin/users/:username/posts``` | ```GET***``` | <a href="#admin-retrieve-user-posts">Retrieve a user's posts (ADMIN)</a> |
| ```/admin/users/:username/comments``` | ```GET***``` | <a href="#admin-retrieve-user-comments">Retrieve a user's comments (ADMIN)</a> |
| ```/admin/users/:username/drafts``` | ```GET***``` | <a href="#admin-retrieve-user-drafts">Retrieve a user's drafts (ADMIN)</a> |
| ```/admin/posts``` | ```GET***``` | <a href="#admin-retrieve-all-posts">Retrieve all posts (ADMIN)</a> |
| ```/admin/posts/:postid``` | ```GET***``` | <a href="#admin-retrieve-post">Retrieve a post (ADMIN)</a> |
| ```/admin/posts/:postid``` | ```DELETE***``` | <a href="#admin-delete-post">Delete a post (ADMIN)</a> |
| ```/admin/posts/:postid/comments``` | ```GET***``` | <a href="#admin-retrieve-post-comments">Retrieve a post's comments (ADMIN)</a> |
| ```/admin/comments/:commentid``` | ```GET***``` | <a href="#admin-retrieve-comment">Retrieve a comment (ADMIN)</a> |
| ```/admin/comments/:commentid``` | ```DELETE***``` | <a href="#admin-delete-comment">Delete a comment (ADMIN)</a> |

 
 \* - indicates routes that require authorization
 
 \*\* - indicates routes that require both authorization and matching user ID

 \*\*\* - indicates routes that require both authorization and ADMIN role

------------------------------------------------------------------------------------------
### HTTP Status Codes
| Status code | Description |
| --- | --- |
| 200 | OK - successful HTTP request |
| 204 | No content - specified resource successfully deleted |
| 400 | Bad request - invalid value or missing required field from request body |
| 401 | Unauthorized - incorrect login information submitted |
| 403 | Forbidden - unauthorized access attempted |
| 404 | Not found - specified resource unable to be located |
| 409 | Conflict - specified field that must be unique contains a non-unique value |
------------------------------------------------------------------------------------------
### Log in<a name="login"></a>
Returns a JWT which expires after 3 hours and the username of the logged in user. JWT must be attached to authorization header to access protected routes. See <a href="#usage">Usage</a> for further instructions.
* Required fields: 
    * ```username: {{string}}```
    * ```password: {{string}}```
* Example request:

    ```POST``` ```https://project-blog-api.onrender.com/login```
    ```json
    {
        "username": "rick",
        "password": "password",
        "email": "rick@example.com"
    }
    ```
* Example response:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjNjM4ZTEzYi0yNTdkLTQwOTQtYjBlOC0xNjYxMmVlMDk4YmEiLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzI0OTYxNzEwLCJleHAiOjE3MjQ5NzI1MTB9.ja4zfGiGa6aldqJXShwtous1BhKLK50BAQnon79wz60",
        "currentUser": "rick"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve all users<a name="retrieve-all-users"></a>
* Sorting options (sorts users by username if sorting option is unspecified or invalid):
    * ```username``` - sort alphabetically by username
    * ```posts``` - sort by number of posts
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/users?sort=comments&order=desc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "username": "admin",
            "_count": {
                "posts": 1,
                "comments": 1
            },
            "role": "ADMIN"
        },
        {
            "username": "rick",
            "_count": {
                "posts": 1,
                "comments": 1
            },
            "role": "USER"
        },
        {
            "username": "kyle",
            "_count": {
                "posts": 2,
                "comments": 0
            },
            "role": "USER"
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Create a new user account<a name="create-user"></a>
* Required fields: 
    * ```username: {{string}}```
    * ```password (must be at least 5 characters long): {{string}}```
    * ```email: {{string}}```
* Optional fields: 
    * ```role: {{ADMIN/USER}}```
* Example request:
    
    ```POST``` ```https://project-blog-api.onrender.com/users```

    ```json
    {
        "username": "rick",
        "password": "password",
        "email": "rick@example.com"
    }
    ```
* Example response:
    ```json
    {
        "username": "rick",
        "email": "rick@example.com",
        "role": "MEMBER"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific user's information<a name="retrieve-user"></a>
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/users/kyle```
* Example response:
    ```json
    {
        "username": "kyle",
        "_count": {
            "posts": 2,
            "comments": 0
        },
        "posts": [
            {
                "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                "totalRating": 2,
                "title": "Pellentesque dolor risus",
                "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                "publishedAt": "2024-09-12T17:37:36.433Z",
                "lastEditedAt": "2024-09-12T17:38:03.308Z",
                "author": {
                    "username": "kyle"
                },
                "_count": {
                    "comments": 1
                }
            },
            {
                "id": "b43e63ce-d2c6-4dc5-a431-3b78c83dd2d8",
                "totalRating": -1,
                "title": "Suspendisse vitae augue ac dui",
                "content": "Pellentesque lobortis sagittis neque, et consequat nulla finibus at. Nam massa justo, hendrerit id lacus ac, dictum viverra erat. Proin et auctor tortor.",
                "publishedAt": "2024-09-12T17:51:51.704Z",
                "lastEditedAt": null,
                "author": {
                    "username": "kyle"
                },
                "_count": {
                    "comments": 0
                }
            }
        ],
        "comments": []
    }
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a user's information<a name="update-user"></a>
Requires user to be logged in and to match the specified user
* Required fields: 
    * ```username (must be unique): {{string}}```
    * ```password (must be at least 5 characters long): {{string}}```
    * ```email: {{string}}```
* Example request:
    ```PUT``` ```https://project-blog-api.onrender.com/users/:username```

    ```json
    {
        "username": "ricky",
        "password": "password123",
        "email": "rick92@example.com"
    }
    ```
* Example response:
    ```json
    {
        "username": "ricky",
        "password": "password123",
        "email": "rick92@example.com",
        "role": "USER"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a user account<a name="delete-user"></a>
Requires user to be logged in and to match the specified user
* Example request:

    ```DELETE``` ```https://project-blog-api.onrender.com/users/jared```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's posts<a name="retrieve-user-posts"></a>
* Sorting options (sorts posts by date published if sorting option is unspecified or invalid):
    * ```rating``` - sort by rating
    * ```title``` - sort alphabetically by title
    * ```date``` - sort by date published
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/users/kyle/posts?sort=title&order=desc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "b43e63ce-d2c6-4dc5-a431-3b78c83dd2d8",
            "totalRating": -1,
            "title": "Suspendisse vitae augue ac dui",
            "content": "Pellentesque lobortis sagittis neque, et consequat nulla finibus at. Nam massa justo, hendrerit id lacus ac, dictum viverra erat. Proin et auctor tortor.",
            "published": true,
            "publishedAt": "2024-09-12T17:51:51.704Z",
            "lastEditedAt": null,
            "author": {
                "username": "kyle"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
            "totalRating": 2,
            "title": "Pellentesque dolor risus",
            "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "published": true,
            "publishedAt": "2024-09-12T17:37:36.433Z",
            "lastEditedAt": "2024-09-12T17:38:03.308Z",
            "author": {
                "username": "kyle"
            },
            "_count": {
                "comments": 1
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's comments<a name="retrieve-user-comments"></a>
* Sorting options (sorts comments by date posted if sorting option is unspecified or invalid):
    * ```date``` - sort by date posted
    * ```rating``` - sort by date rating
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/users/kyle/comments?sort=date&order=asc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "87d11735-3ed9-46ce-a921-258824b56379",
            "totalRating": 0,
            "content": "Praesent orci libero, sodales sit amet convallis in, malesuada vel tortor.",
            "postedAt": "2024-09-12T18:00:16.346Z",
            "lastEditedAt": null,
            "author": {
                "username": "kyle"
            },
            "post": {
                "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                "title": "Pellentesque dolor risus"
            }
        },
        {
            "id": "eafe76ba-7c6b-4cc1-9524-1ab6ee4ac005",
            "totalRating": 0,
            "content": "Phasellus quis tellus eu nisi tempor auctor. ",
            "postedAt": "2024-09-12T18:00:39.809Z",
            "lastEditedAt": null,
            "author": {
                "username": "kyle"
            },
            "post": {
                "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                "title": "Pellentesque dolor risus"
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's drafts<a name="retrieve-user-drafts"></a>
Requires user to be logged in and to match the specified user (drafts are hidden to the public)
* Sorting options (sorts drafts by date edited if sorting option is unspecified or invalid):
    * ```date``` - sort by date last edited
    * ```created``` - sort by date created
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/users/rick/drafts?sort=date&order=asc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "e2950951-26c6-4730-80b8-f68cbc39654f",
            "totalRating": 0,
            "title": "Nam id mi eu libero suscipit feugiat in vel sem",
            "content": "Curabitur at eros auctor massa imperdiet rhoncus ut sed diam. Donec ac efficitur eros.",
            "published": false,
            "createdAt": "2024-09-12T17:51:06.386Z",
            "lastEditedAt": null,
            "author": {
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve all posts<a name="retrieve-all-posts"></a>
* Available sorting options (sorts draftsposts by date posted if sorting option is unspecified or invalid):
    * ```rating``` - sort by average rating
    * ```title``` - sort by alphabetically title
    * ```date``` - sort by date published
    * ```comments``` - sort by number of comments
* Available ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/posts?sort=title&order=asc&limit=5&page=1```
* Output example:
    ```json
    [
        {
            "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
            "totalRating": 0,
            "title": "Nunc tortor dui, semper vitae",
            "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
            "published": true,
            "publishedAt": "2024-09-12T13:32:56.875Z",
            "lastEditedAt": null,
            "author": {
                "username": "admin"
            },
            "_count": {
                "comments": 1
            }
        },
        {
            "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
            "totalRating": 2,
            "title": "Pellentesque dolor risus",
            "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "published": true,
            "publishedAt": "2024-09-12T17:37:36.433Z",
            "lastEditedAt": "2024-09-12T17:38:03.308Z",
            "author": {
                "username": "kyle"
            },
            "_count": {
                "comments": 3
            }
        },
        {
            "id": "b43e63ce-d2c6-4dc5-a431-3b78c83dd2d8",
            "totalRating": -1,
            "title": "Suspendisse vitae augue ac dui",
            "content": "Pellentesque lobortis sagittis neque, et consequat nulla finibus at. Nam massa justo, hendrerit id lacus ac, dictum viverra erat. Proin et auctor tortor.",
            "published": true,
            "publishedAt": "2024-09-12T17:51:51.704Z",
            "lastEditedAt": null,
            "author": {
                "username": "kyle"
            },
            "_count": {
                "comments": 0
            }
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Create a new post<a name="create-post"></a>
Requires user to be logged in
* Required fields: 

    * ```title: {{string}}```
    * ```content: {{string}}```
* Optional fields:
    * ```published: {{boolean}}```
* Example request:
 
    ```POST``` ```https://project-blog-api.onrender.com/posts```
    ```
    {
        "title": "Nunc tortor dui, semper vitae",
        "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
        "published": true
    }
    ```
* Example response:
    ```json
    {
        "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
        "totalRating": 0,
        "title": "Nunc tortor dui, semper vitae",
        "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
        "published": true,
        "publishedAt": "2024-09-12T13:32:56.875Z",
        "lastEditedAt": null,
        "author": {
            "username": "admin"
        },
        "comments": []
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific post<a name="retrieve-post"></a>
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/posts/e4041898-8ab3-4394-a40e-1bea1116ce2d```
* Example response:
    ```json
    {
        "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
        "totalRating": 0,
        "title": "Nunc tortor dui, semper vitae",
        "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
        "published": true,
        "publishedAt": "2024-09-12T13:32:56.875Z",
        "lastEditedAt": null,
        "author": {
            "username": "admin"
        },
        "comments": [
            {
                "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
                "content": "Suspendisse semper justo facilisis luctus tempor.",
                "author": {
                    "username": "admin"
                },
                "postedAt": "2024-09-12T13:33:20.112Z",
                "lastEditedAt": null
            }
        ]
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a post<a name="update-post"></a>
Requires user to be logged in and to match the post's author
* Required fields: 
    * ```title: {{string}}```
    * ```content: {{string}}```
* Optional fields:
    * ```published: {{boolean}}``` (previously published posts cannot be unpublished)
* Example request:
    
    ```PUT``` ```https://project-blog-api.onrender.com/posts/b607265a-19ab-4ac4-a603-c2ff640839e5```
    ```json
    {
        "title": "Nunc tortor dui, semper vitae",
        "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
    }
    ```
* Example response:
    ```json
    {
        "id": "e2950951-26c6-4730-80b8-f68cbc39654f",
        "totalRating": 0,
        "title": "Nunc tortor dui, semper vitae",
        "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
        "published": true,
        "publishedAt": "2024-09-12T18:05:11.262Z",
        "lastEditedAt": null,
        "author": {
            "username": "rick"
        },
        "_count": {
            "comments": 0
        }
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a post<a name="delete-post"></a>
Requires user to be logged in and to match the post's author
* Example request:
    
    ```DELETE```  ```https://project-blog-api.onrender.com/posts/f4a06acf-1ec8-4c7f-8b32-6287c74dd467```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a post's comments<a name="retrieve-post-comments"></a>
* Sorting options (sorts posts by date published if sorting option is unspecified or invalid):
    * ```rating``` - sort by rating
    * ```date``` - sort by date published
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:
    
    ```GET```  ```https://project-blog-api.onrender.com/posts/9834d824-04d4-44c5-9c82-95d829efcaa2/comments?sort=rating&order=desc&limit=5&page=1```
* Example response:
 
    ```json
    [
        {
            "id": "87d11735-3ed9-46ce-a921-258824b56379",
            "totalRating": 0,
            "content": "Praesent orci libero, sodales sit amet convallis in, malesuada vel tortor.",
            "author": {
                "username": "kyle"
            },
            "postedAt": "2024-09-12T18:00:16.346Z",
            "lastEditedAt": null
        },
        {
            "id": "eafe76ba-7c6b-4cc1-9524-1ab6ee4ac005",
            "totalRating": 0,
            "content": "Phasellus quis tellus eu nisi tempor auctor. ",
            "author": {
                "username": "kyle"
            },
            "postedAt": "2024-09-12T18:00:39.809Z",
            "lastEditedAt": null
        },
        {
            "id": "42071463-e881-49dd-b773-739e3ff31777",
            "totalRating": -1,
            "content": "Curabitur at eros auctor massa imperdiet rhoncus ut sed diam. Donec ac efficitur eros.",
            "author": {
                "username": "rick"
            },
            "postedAt": "2024-09-12T17:49:57.340Z",
            "lastEditedAt": "2024-09-12T18:00:58.181Z"
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Create a new comment<a name="create-comment"></a>
Requires user to be logged in
* Required fields: 
    * ```content: {{string}}```
* Example request:
    
    ```POST``` ```https://project-blog-api.onrender.com/posts/e4041898-8ab3-4394-a40e-1bea1116ce2d/comments/```
    ```json
    {
        "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec."
    }
    ```
* Example response:
    ```json
    {
        "id": "9a2d5337-c7fa-49ae-b975-173e2db47d4e",
        "totalRating": 0,
        "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
        "author": {
            "username": "kyle"
        },
        "postedAt": "2024-09-12T18:09:55.916Z",
        "lastEditedAt": null,
        "postId": "e4041898-8ab3-4394-a40e-1bea1116ce2d"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Rate a post<a name="rate-post"></a>
Requires user to be logged in, , will update previous rating if found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```POST``` ```https://project-blog-api.onrender.com/posts/e4041898-8ab3-4394-a40e-1bea1116ce2d/ratings```
    ```json
    {
        "rating": -1
    }
    ```
* Example response:
    ```json
    {
        "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
        "totalRating": -1,
        "title": "Nunc tortor dui, semper vitae",
        "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
        "published": true,
        "publishedAt": "2024-09-12T13:32:56.875Z",
        "lastEditedAt": null,
        "author": {
            "username": "admin"
        },
        "comments": [
            {
                "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
                "totalRating": 0,
                "content": "Suspendisse semper justo facilisis luctus tempor.",
                "author": {
                    "username": "admin"
                },
                "postedAt": "2024-09-12T13:33:20.112Z",
                "lastEditedAt": null
            },
            {
                "id": "9a2d5337-c7fa-49ae-b975-173e2db47d4e",
                "totalRating": 0,
                "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
                "author": {
                    "username": "kyle"
                },
                "postedAt": "2024-09-12T18:09:55.916Z",
                "lastEditedAt": null
            }
        ]
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update post rating<a name="update-post-rating"></a>
Requires user to be logged in, will create a new rating if no previous rating is found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```PUT``` ```https://project-blog-api.onrender.com/posts/e4041898-8ab3-4394-a40e-1bea1116ce2d/ratings```
    ```json
    {
        "rating": 1
    }
    ```
* Example response:
    ```json
    {
        "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
        "totalRating": 1,
        "title": "Nunc tortor dui, semper vitae",
        "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
        "published": true,
        "publishedAt": "2024-09-12T13:32:56.875Z",
        "lastEditedAt": null,
        "author": {
            "username": "admin"
        },
        "comments": [
            {
                "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
                "totalRating": 0,
                "content": "Suspendisse semper justo facilisis luctus tempor.",
                "author": {
                    "username": "admin"
                },
                "postedAt": "2024-09-12T13:33:20.112Z",
                "lastEditedAt": null
            },
            {
                "id": "9a2d5337-c7fa-49ae-b975-173e2db47d4e",
                "totalRating": 0,
                "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
                "author": {
                    "username": "kyle"
                },
                "postedAt": "2024-09-12T18:09:55.916Z",
                "lastEditedAt": null
            }
        ]
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a comment<a name="retrieve-comment"></a>
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/comments/449a0cee-86a6-47df-bf1a-e7a9f66c9df7```
    
* Example response:
    ```json
    {
        "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
        "totalRating": 0,
        "content": "Suspendisse semper justo facilisis luctus tempor.",
        "author": {
            "username": "admin"
        },
        "postedAt": "2024-09-12T13:33:20.112Z",
        "lastEditedAt": null,
        "postId": "e4041898-8ab3-4394-a40e-1bea1116ce2d"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a comment<a name="update-comment"></a>
Requires user to be logged in and to match the comment's author
* Required fields: 
    * ```content: {{string}}```
* Example request:

    ```PUT``` ```https://project-blog-api.onrender.com/comments/449a0cee-86a6-47df-bf1a-e7a9f66c9df7```
    ```json
    {
        "content": "Suspendisse auctor nulla eleifend semper aliquam."
    }
    ```
* Example response:
    ```json
    {
        "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
        "totalRating": 0,
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "author": {
            "username": "admin"
        },
        "postedAt": "2024-09-12T13:33:20.112Z",
        "lastEditedAt": "2024-09-12T18:17:21.745Z",
        "postId": "e4041898-8ab3-4394-a40e-1bea1116ce2d"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a comment<a name="delete-comment"></a>
Requires user to be logged in and to match the comment's author
* Example request:

    ```DELETE``` ```https://project-blog-api.onrender.com/comments/ce491536-8c12-4228-aead-a7c34a7f1a02```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Rate a comment<a name="rate-comment"></a>
Requires user to be logged in, will update previous rating if found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```POST``` ```https://project-blog-api.onrender.com/comments/449a0cee-86a6-47df-bf1a-e7a9f66c9df7/ratings```
    ```json
    {
        "rating": 1
    }
    ```
* Example response:
    ```json
    {
        "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
        "totalRating": 1,
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "author": {
            "username": "admin"
        },
        "postedAt": "2024-09-12T13:33:20.112Z",
        "lastEditedAt": "2024-09-12T18:17:21.745Z",
        "postId": "e4041898-8ab3-4394-a40e-1bea1116ce2d"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update comment rating<a name="update-comment-rating"></a>
Requires user to be logged in, will create a new rating if no previous rating is found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```PUT``` ```https://project-blog-api.onrender.com/comments/449a0cee-86a6-47df-bf1a-e7a9f66c9df7/ratings```
    ```json
    {
        "rating": -1
    }
    ```
* Example response:
    ```json
    {
        "id": "449a0cee-86a6-47df-bf1a-e7a9f66c9df7",
        "totalRating": -1,
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "author": {
            "username": "admin"
        },
        "postedAt": "2024-09-12T13:33:20.112Z",
        "lastEditedAt": "2024-09-12T18:17:21.745Z",
        "postId": "e4041898-8ab3-4394-a40e-1bea1116ce2d"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve all users (ADMIN)<a name="admin-retrieve-all-users"></a>
Requires user to be logged in and have ADMIN role
* Sorting options (sorts users by username if sorting option is unspecified or invalid):
    * ```username``` - sort alphabetically by username
    * ```posts``` - sort by number of posts
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/admin/users?sort=comments&order=desc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
            "username": "rick",
            "email": "rick@example.com",
            "_count": {
                "posts": 1,
                "comments": 1
            },
            "role": "USER"
        },
        {
            "id": "a27939b8-48f9-43b8-b19c-9f5f6c184760",
            "username": "admin",
            "email": "admin@example.com",
            "_count": {
                "posts": 1,
                "comments": 1
            },
            "role": "ADMIN"
        },
        {
            "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
            "username": "kyle",
            "email": "kyle@example.com",
            "_count": {
                "posts": 2,
                "comments": 3
            },
            "role": "USER"
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
-----------------------------------------------------------------------------------------
-
### Retrieve a specific user's information (ADMIN)<a name="admin-retrieve-user"></a>
Requires user to be logged in and have ADMIN role
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/admin/users/rick```
* Example response:
    ```json
    {
        "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
        "username": "rick",
        "_count": {
            "posts": 1,
            "comments": 1
        },
        "email": "rick@example.com",
        "posts": [
            {
                "id": "e2950951-26c6-4730-80b8-f68cbc39654f",
                "totalRating": 0,
                "title": "Nunc tortor dui, semper vitae",
                "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
                "published": true,
                "publishedAt": "2024-09-12T18:05:11.262Z",
                "lastEditedAt": null,
                "author": {
                    "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                    "username": "rick"
                },
                "_count": {
                    "comments": 0
                }
            }
        ],
        "comments": [
            {
                "id": "42071463-e881-49dd-b773-739e3ff31777",
                "content": "Curabitur at eros auctor massa imperdiet rhoncus ut sed diam. Donec ac efficitur eros.",
                "postedAt": "2024-09-12T17:49:57.340Z",
                "lastEditedAt": "2024-09-12T18:00:58.181Z",
                "author": {
                    "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                    "username": "rick"
                },
                "post": {
                    "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                    "title": "Pellentesque dolor risus"
                }
            }
        ]
    }
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a user's information (ADMIN)<a name="admin-update-user"></a>
Requires user to be logged in and have ADMIN role
* Optional fields:
    * ```username (must be unique): {{string}}```
    * ```password (must be at least 5 characters long): {{string}}```
    * ```email: {{string}}```
    * ```role: {{ADMIN/USER}}```
* Example request:
    ```PUT``` ```https://project-blog-api.onrender.com/users/rick```

    ```json
    {
        "username": "ricky",
        "password": "password123",
        "email": "rick92@example.com",
        "role": "ADMIN"
    }
    ```
* Example response:
    ```json
    {
        "id": "0ce714e8-f3d1-41ba-8d3b-699b6ecc8510",
        "username": "ricky",
        "password": "password123",
        "email": "rick92@example.com",
        "role": "ADMIN"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a user account (ADMIN)<a name="admin-delete-user"></a>
Requires user to be logged in and have ADMIN role
* Example request:

    ```DELETE``` ```https://project-blog-api.onrender.com/admin/users/jared```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's posts (ADMIN)<a name="admin-retrieve-user-posts"></a>
Requires user to be logged in and have ADMIN role
* Sorting options (sorts posts by date published if sorting option is unspecified or invalid):
    * ```rating``` - sort by rating
    * ```title``` - sort alphabetically by title
    * ```date``` - sort by date published
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/admin/users/kyle/posts?sort=title&order=desc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "b43e63ce-d2c6-4dc5-a431-3b78c83dd2d8",
            "totalRating": -1,
            "title": "Suspendisse vitae augue ac dui",
            "content": "Pellentesque lobortis sagittis neque, et consequat nulla finibus at. Nam massa justo, hendrerit id lacus ac, dictum viverra erat. Proin et auctor tortor.",
            "published": true,
            "publishedAt": "2024-09-12T17:51:51.704Z",
            "lastEditedAt": null,
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
            "totalRating": 2,
            "title": "Pellentesque dolor risus",
            "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "published": true,
            "publishedAt": "2024-09-12T17:37:36.433Z",
            "lastEditedAt": "2024-09-12T17:38:03.308Z",
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "_count": {
                "comments": 3
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's comments (ADMIN)<a name="admin-retrieve-user-comments"></a>
Requires user to be logged in and have ADMIN role
* Sorting options (sorts comments by date posted if sorting option is unspecified or invalid):
    * ```date``` - sort by date posted
    * ```rating``` - sort by date rating
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/admin/users/kyle/comments?sort=date&order=asc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "87d11735-3ed9-46ce-a921-258824b56379",
            "totalRating": 0,
            "content": "Praesent orci libero, sodales sit amet convallis in, malesuada vel tortor.",
            "postedAt": "2024-09-12T18:00:16.346Z",
            "lastEditedAt": null,
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "post": {
                "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                "title": "Pellentesque dolor risus"
            }
        },
        {
            "id": "eafe76ba-7c6b-4cc1-9524-1ab6ee4ac005",
            "totalRating": 0,
            "content": "Phasellus quis tellus eu nisi tempor auctor. ",
            "postedAt": "2024-09-12T18:00:39.809Z",
            "lastEditedAt": null,
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "post": {
                "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
                "title": "Pellentesque dolor risus"
            }
        },
        {
            "id": "9a2d5337-c7fa-49ae-b975-173e2db47d4e",
            "totalRating": 0,
            "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
            "postedAt": "2024-09-12T18:09:55.916Z",
            "lastEditedAt": null,
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "post": {
                "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
                "title": "Nunc tortor dui, semper vitae"
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's drafts (ADMIN)<a name="admin-retrieve-user-drafts"></a>
Requires user to be logged in and have ADMIN role
* Sorting options (sorts drafts by date edited if sorting option is unspecified or invalid):
    * ```date``` - sort by date last edited
    * ```created``` - sort by date created
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/admin/users/rick/drafts?sort=date&order=asc&limit=5&page=1```
* Example response:
    ```json
    [
        {
            "id": "be7d8b14-a71e-46bf-86a9-eda2a418f21c",
            "totalRating": 0,
            "title": "Sed sit amet pulvinar neque, ut imperdiet nisi",
            "content": "Aenean commodo, risus in eleifend finibus, nulla quam lacinia magna, et dapibus nulla lorem vitae sapien. Maecenas at interdum augue. Suspendisse eu placerat nibh.",
            "published": false,
            "publishedAt": null,
            "lastEditedAt": null,
            "author": {
                "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve all posts (ADMIN)<a name="admin-retrieve-all-posts"></a>
Requires user to be logged in and have ADMIN role, includes drafts
* Available sorting options (sorts draftsposts by date posted if sorting option is unspecified or invalid):
    * ```rating``` - sort by average rating
    * ```title``` - sort by alphabetically title
    * ```date``` - sort by date published
    * ```comments``` - sort by number of comments
    * ```published``` - sort by published/draft status
* Available ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:

    ```GET``` ```https://project-blog-api.onrender.com/admin/posts?sort=title&order=asc&limit=5&page=1```
* Output example:
    ```json
    [
        {
            "id": "e2950951-26c6-4730-80b8-f68cbc39654f",
            "totalRating": 0,
            "title": "Nunc tortor dui, semper vitae",
            "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
            "published": true,
            "publishedAt": "2024-09-12T18:05:11.262Z",
            "lastEditedAt": null,
            "author": {
                "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "e4041898-8ab3-4394-a40e-1bea1116ce2d",
            "totalRating": 1,
            "title": "Nunc tortor dui, semper vitae",
            "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
            "published": true,
            "publishedAt": "2024-09-12T13:32:56.875Z",
            "lastEditedAt": null,
            "author": {
                "id": "a27939b8-48f9-43b8-b19c-9f5f6c184760",
                "username": "admin"
            },
            "_count": {
                "comments": 2
            }
        },
        {
            "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
            "totalRating": 2,
            "title": "Pellentesque dolor risus",
            "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "published": true,
            "publishedAt": "2024-09-12T17:37:36.433Z",
            "lastEditedAt": "2024-09-12T17:38:03.308Z",
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "_count": {
                "comments": 3
            }
        },
        {
            "id": "be7d8b14-a71e-46bf-86a9-eda2a418f21c",
            "totalRating": 0,
            "title": "Sed sit amet pulvinar neque, ut imperdiet nisi",
            "content": "Aenean commodo, risus in eleifend finibus, nulla quam lacinia magna, et dapibus nulla lorem vitae sapien. Maecenas at interdum augue. Suspendisse eu placerat nibh.",
            "published": false,
            "publishedAt": null,
            "lastEditedAt": null,
            "author": {
                "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "b43e63ce-d2c6-4dc5-a431-3b78c83dd2d8",
            "totalRating": -1,
            "title": "Suspendisse vitae augue ac dui",
            "content": "Pellentesque lobortis sagittis neque, et consequat nulla finibus at. Nam massa justo, hendrerit id lacus ac, dictum viverra erat. Proin et auctor tortor.",
            "published": true,
            "publishedAt": "2024-09-12T17:51:51.704Z",
            "lastEditedAt": null,
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "_count": {
                "comments": 0
            }
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific post (ADMIN)<a name="admin-retrieve-post"></a>
Requires user to be logged in and have ADMIN role
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/admin/posts/9834d824-04d4-44c5-9c82-95d829efcaa2```
* Example response:
    ```json
    {
        "id": "9834d824-04d4-44c5-9c82-95d829efcaa2",
        "totalRating": 2,
        "title": "Pellentesque dolor risus",
        "content": "Etiam gravida vestibulum turpis, quis aliquam tellus dictum id. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
        "published": true,
        "publishedAt": "2024-09-12T17:37:36.433Z",
        "lastEditedAt": "2024-09-12T17:38:03.308Z",
        "author": {
            "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
            "username": "kyle"
        },
        "comments": [
            {
                "id": "87d11735-3ed9-46ce-a921-258824b56379",
                "content": "Praesent orci libero, sodales sit amet convallis in, malesuada vel tortor.",
                "author": {
                    "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                    "username": "kyle"
                },
                "postedAt": "2024-09-12T18:00:16.346Z",
                "lastEditedAt": null
            },
            {
                "id": "eafe76ba-7c6b-4cc1-9524-1ab6ee4ac005",
                "content": "Phasellus quis tellus eu nisi tempor auctor. ",
                "author": {
                    "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                    "username": "kyle"
                },
                "postedAt": "2024-09-12T18:00:39.809Z",
                "lastEditedAt": null
            },
            {
                "id": "42071463-e881-49dd-b773-739e3ff31777",
                "content": "Curabitur at eros auctor massa imperdiet rhoncus ut sed diam. Donec ac efficitur eros.",
                "author": {
                    "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                    "username": "rick"
                },
                "postedAt": "2024-09-12T17:49:57.340Z",
                "lastEditedAt": "2024-09-12T18:00:58.181Z"
            }
        ]
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a post (ADMIN)<a name="admin-delete-post"></a>
Requires user to be logged in and have ADMIN role
* Example request:
    
    ```DELETE```  ```https://project-blog-api.onrender.com/posts/f4a06acf-1ec8-4c7f-8b32-6287c74dd467```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a post's comments (ADMIN)<a name="admin-retrieve-post-comments"></a>
Requires user to be logged in and have ADMIN role
* Sorting options (sorts posts by date published if sorting option is unspecified or invalid):
    * ```rating``` - sort by rating
    * ```date``` - sort by date published
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Pagination options: 
    * ```limit``` - number of results to return (defaults to 10 if unspecified)
    * ```page``` - specifies which page of results to view
* Example request:
    
    ```GET```  ```https://project-blog-api.onrender.com/admin/posts/f32b3b52-2a65-4c1d-9e2d-9e109436bffa/comments?sort=rating&order=desc&limit=5&page=1```
* Example response:
 
    ```
    [
        {
            "id": "f7d6779b-38e2-4f89-91eb-f6d79bc68b39",
            "totalRating": -1,
            "content": "Class aptent taciti sociosqu ad litora torquent.",
            "author": {
                "id": "0ce714e8-f3d1-41ba-8d3b-699b6ecc8510",
                "username": "rick"
            },
            "postedAt": "2024-08-30T23:26:51.912Z",
            "lastEditedAt": null
        },
        {
            "id": "73d992df-7757-49cc-88b8-fd471bf31b44",
            "totalRating": 0,
            "content": "Aenean sed massa sed ex suscipit lacinia. Praesent imperdiet ac justo lobortis accumsan.",
            "author": {
                "id": "a7c53100-6061-457f-ac56-cb5f02c791d2",
                "username": "kyle"
            },
            "postedAt": "2024-09-03T16:08:51.217Z",
            "lastEditedAt": null
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a comment (ADMIN)<a name="admin-retrieve-comment"></a>
Requires user to be logged in and have ADMIN role
* Example request:
    
    ```GET``` ```https://project-blog-api.onrender.com/admin/comments/5bcb615e-182e-4f09-acea-de4bee21c03f```
    
* Example response:
    ```json
    [
        {
            "id": "87d11735-3ed9-46ce-a921-258824b56379",
            "totalRating": 0,
            "content": "Praesent orci libero, sodales sit amet convallis in, malesuada vel tortor.",
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "postedAt": "2024-09-12T18:00:16.346Z",
            "lastEditedAt": null
        },
        {
            "id": "eafe76ba-7c6b-4cc1-9524-1ab6ee4ac005",
            "totalRating": 0,
            "content": "Phasellus quis tellus eu nisi tempor auctor. ",
            "author": {
                "id": "f04424a0-2914-4a52-8e5f-5786e1950efa",
                "username": "kyle"
            },
            "postedAt": "2024-09-12T18:00:39.809Z",
            "lastEditedAt": null
        },
        {
            "id": "42071463-e881-49dd-b773-739e3ff31777",
            "totalRating": -1,
            "content": "Curabitur at eros auctor massa imperdiet rhoncus ut sed diam. Donec ac efficitur eros.",
            "author": {
                "id": "955179b6-fb33-4f55-a73f-4ccacc422c69",
                "username": "rick"
            },
            "postedAt": "2024-09-12T17:49:57.340Z",
            "lastEditedAt": "2024-09-12T18:00:58.181Z"
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a comment (ADMIN)<a name="admin-delete-comment"></a>
Requires user to be logged in and have ADMIN role
* Example request:

    ```DELETE``` ```https://project-blog-api.onrender.com/admin/comments/ce491536-8c12-4228-aead-a7c34a7f1a02```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
