## Blog API Documentation <a name="top"></a>
### Usage<a name="usage"></a>
Make HTTP requests to API endpoints via the URL: ```https://blogger.adaptable.app/``` 

To access protected routes:
1. Send a ```POST``` request to ```/users``` with required username, password, and email keys in request body, which will return the created user
2. Send a ```POST``` request to ```/login``` using the user information for the created account, which will return a JWT as well as the name of the logged in user
3. Place the JWT into your headers with the following format ``` authorization : bearer {{JWT string}} ```

### API Endpoints
| Endpoint | Method | Description |
| --- | --- | --- |
| ```/login``` | ```POST``` |  <a href="#login">Log in to an existing account</a> |
| ```/users``` | ```GET``` | <a href="#retrieve-all-users">Retrieve all user accounts</a> |
| ```/users``` | ```POST``` | <a href="#create-user">Create a new user account</a> |
| ```/users/:username``` | ```GET``` | <a href="#retrieve-user">Retrieve user account information by username</a>
| ```/users/:username``` | ```PUT**``` | <a href="#update-user">Update user account information by username</a> |
| ```/users/:username``` | ```DELETE**``` | <a href="#delete-user">Delete user account by username</a> |
| ```/users/:username/posts``` | ```GET``` | <a href="#retrieve-user-posts">Retrieve posts by username</a> |
| ```/users/:username/comments``` | ```GET``` | <a href="#retrieve-user-comments">Retrieve comments by username</a> |
| ```/users/:username/drafts``` | ```GET**``` | <a href="#retrieve-user-drafts">Retrieve drafts by username</a> |
| ```/posts``` | ```GET``` | <a href="#retrieve-all-posts">Retrieve all published posts</a> |
| ```/posts``` | ```POST*``` | <a href="#create-post">Create a new post</a> |
| ```/posts/:postid``` | ```GET``` | <a href="#retrieve-post">Retrieve post by post ID</a> |
| ```/posts/:postid``` | ```PUT**``` | <a href="#update-post">Update post by post ID</a> |
| ```/posts/:postid``` | ```DELETE**``` | <a href="#delete-post">Delete post by post ID</a> |
| ```/posts/:postid/comments``` | ```GET``` | <a href="#retrieve-post-comments">Retrieve comments by post ID</a> |
| ```/posts/:postid/comments``` | ```POST*``` | <a href="#create-comment">Create a comment on post specified by post ID</a> |
| ```/posts/:postid/rating``` | ```POST*``` | <a href=#rate-post>Rate a post</a> |
| ```/posts/:postid/rating``` | ```PUT*``` | <a href=#update-post-rating>Update post rating</a> |
| ```/comments/:commentid``` | ```GET``` | <a href="#retrieve-comment">Retrieve comment by comment ID</a> |
| ```/comments/:commentid``` | ```PUT**``` | <a href="#update-comment">Update comment by comment ID</a> |
| ```/comments/:commentid``` | ```DELETE**``` | <a href="#delete-comment">Delete comment by comment ID</a> |
| ```/comments/:commentid/rating``` | ```POST*``` | <a href=#rate-comment>Rate a comment</a>
| ```/comments/:commentid/rating``` | ```PUT*``` | <a href=#update-comment-rating>Update comment rating</a>
 
 \* - indicates routes that require authorization
 
 \*\* - indicates routes that require both authorization and matching user ID

------------------------------------------------------------------------------------------
### HTTP Status Codes
| Status code | Description |
| --- | --- |
| 200 | OK - successful HTTP request |
| 204 | No content - specified resource successfully deleted |
| 400 | Bad request - required field missing from request body |
| 401 | Unauthorized - incorrect login information submitted |
| 403 | Forbidden - unauthorized access attempted |
| 404 | Not found - specified resource unable to be located |
------------------------------------------------------------------------------------------
### Log in<a name="login"></a>
Returns a JWT which expires after 3 hours and the username of the logged in user. JWT must be attached to authorization header to access protected routes. See <a href="#usage">Usage</a> for further instructions.
* Required fields: 
    * ```username: {{string}}```
    * ```password: {{string}}```
* Example request:

    ```POST``` ```https://blogger.adaptable.app/login```
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
    * ```username``` - sort alphabetically by author's username
    * ```posts``` - sort by number of posts
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users?sort=comments&order=desc```
* Example response:
    ```json
    [
        {
            "username": "rick",
            "_count": {
                "posts": 6,
                "comments": 4
            },
            "role": "MEMBER"
        },
        {
            "username": "kyle",
            "_count": {
                "posts": 1,
                "comments": 1
            },
            "role": "MEMBER"
        },
        {
            "username": "bob",
            "_count": {
                "posts": 1,
                "comments": 0
            },
            "role": "MEMBER"
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Create a new user account<a name="create-user"></a>
* Required fields: 
    * ```username: {{string}}```
    * ```password: {{string}}```
    * ```email: {{string}}```
* Example request:
    
    ```POST``` ```https://blogger.adaptable.app/users```

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
    
    ```GET``` ```https://blogger.adaptable.app/users/rick```
* Example response:
    ```json
    {
        "username": "rick",
        "posts": [
            {
                "id": "674997d3-b1f1-4eb7-bbf5-19f96d461e2a",
                "averageRating": null,
                "title": "Maecenas sapien augue",
                "content": "Suspendisse eleifend, libero ac condimentum scelerisque, mauris felis vulputate mi, et semper lorem nulla eleifend sapien. Integer blandit convallis tincidunt.",
                "publishedAt": "2024-08-28T22:59:08.926Z",
                "lastEdited": null,
                "author": {
                    "username": "rick"
                },
                "_count": {
                    "comments": 2
                }
            }
        ],
        "comments": [
            {
                "id": "feaede6f-41d9-4b7d-8ac4-13822ea967ce",
                "content": "Maecenas ac tincidunt arcu. Aliquam non metus ipsum.",
                "posted": "2024-08-28T21:46:03.512Z",
                "lastEdited": "2024-08-28T22:01:01.814Z",
                "author": {
                    "username": "rick"
                },
                "post": {
                    "id": "d3b06afd-081d-4546-b7d2-3b3649f2884f",
                    "title": "My first post"
                }
            }
        ]
    }
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a user's information<a name="update-user"></a>
Requires user to be logged in and to match the specified user
* Required fields: 
    * ```username (must be unique): {{string}}```
    * ```password: {{string}}```
    * ```email: {{string}}```
* Example request:
    ```PUT``` ```https://blogger.adaptable.app/users/:username```

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
        "email": "rick92@example.com"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a user account<a name="delete-user"></a>
Requires user to be logged in and to match the specified user
* Example request:

    ```DELETE``` ```https://blogger.adaptable.app/users/jared```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's posts only<a name="retrieve-user-posts"></a>
* Sorting options (sorts posts by date published if sorting option is unspecified or invalid):
    * ```rating``` - sort by rating
    * ```title``` - sort alphabetically by title
    * ```date``` - sort by date published
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users/rick/posts?sort=title&order=desc```
* Example response:
    ```json
    [
        {
            "id": "f1cf9b5d-3ccc-4f7c-a2d6-5348808e83b0",
            "averageRating": null,
            "title": "Ut cursus elit sit amet sem scelerisque interdum",
            "content": "Vestibulum ultricies dui a velit finibus molestie. Vivamus et ornare nibh, ut consequat quam. Vivamus non aliquet justo, et volutpat dui. Donec luctus vitae elit sed molestie.",
            "published": true,
            "publishedAt": "2024-08-28T18:52:56.296Z",
            "lastEdited": null,
            "author": {
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "b607265a-19ab-4ac4-a603-c2ff640839e5",
            "averageRating": null,
            "title": "Nunc tortor dui, semper vitae",
            "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
            "published": true,
            "publishedAt": "2024-08-30T14:36:46.192Z",
            "lastEdited": "2024-08-30T17:40:00.927Z",
            "author": {
                "username": "rick"
            },
            "_count": {
                "comments": 1
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's comments only<a name="retrieve-user-comments"></a>
* Sorting options (sorts comments by date posted if sorting option is unspecified or invalid):
    * ```date``` - sort by date posted
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users/rick/comments?sort=date&order=asc```
* Example response:
    ```json
    [
        {
            "id": "ca1477b6-84da-49f1-8535-b1897ce5f4a7",
            "content": "Vellentesque elementum maximus augue ullamcorper semper.",
            "posted": "2024-08-28T23:11:14.502Z",
            "lastEdited": null,
            "author": {
                "username": "rick"
            },
            "post": {
                "id": "674997d3-b1f1-4eb7-bbf5-19f96d461e2a",
                "title": "Maecenas sapien augue"
            }
        },
        {
            "id": "097dab0f-e454-4d0d-b700-620bb3ada4d5",
            "content": "Morbi molestie dui porttitor tortor tempor, ac pulvinar sapien aliquet.",
            "posted": "2024-08-30T16:56:00.810Z",
            "lastEdited": null,
            "author": {
                "username": "rick"
            },
            "post": {
                "id": "674997d3-b1f1-4eb7-bbf5-19f96d461e2a",
                "title": "Maecenas sapien augue"
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's drafts only<a name="retrieve-user-drafts"></a>
Requires user to be logged in and to match the specified user (drafts are hidden to the public)
* Sorting options (sorts drafts by date edited if sorting option is unspecified or invalid):
    * ```date``` - sort by date last edited
    * ```created``` - sort by date created
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users/rick/drafts```
* Example response:
    ```json
    [
        {
            "id": "d3e32420-7667-4e63-957d-7988e2ea9298",
            "averageRating": null,
            "title": "Cras ac massa orci",
            "content": "Suspendisse sit amet ultricies ex, non imperdiet urna. Ut feugiat ultricies purus a varius. Curabitur tempor est sed enim euismod, id euismod tortor dictum.",
            "published": false,
            "createdAt": "2024-08-28T19:05:56.120Z",
            "lastEdited": "2024-08-28T19:06:21.881Z",
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
    * ```username``` - sort alphabetically by author's username
    * ```comments``` - sort by number of comments
* Available ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending
* Example request:

    ```GET``` ```https://blogger.adaptable.app/posts?sort=title&order=asc```
* Output example:
    ```json
    [
        {
            "id": "937aec0d-ba95-4550-8ea7-8f6d96529379",
            "averageRating": null,
            "title": "Cras ut ligula dui",
            "content": "Nam sapien metus, mollis ac viverra ut, rhoncus ac metus. Duis dapibus, ligula eu pellentesque volutpat, eros tellus dignissim orci, fringilla lacinia dolor metus ut odio.",
            "published": true,
            "publishedAt": "2024-08-29T02:30:34.303Z",
            "lastEdited": null,
            "author": {
                "username": "rick"
            },
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "b607265a-19ab-4ac4-a603-c2ff640839e5",
            "averageRating": null,
            "title": "Etiam porttitor, dui in egestas fermentum",
            "content": "Curabitur ornare tortor mauris, et vehicula turpis condimentum vitae. Quisque rhoncus justo in lectus feugiat tempus. Sed laoreet tortor elit. Maecenas eros quam, tempus et nulla eget, scelerisque accumsan magna.",
            "published": true,
            "publishedAt": "2024-08-30T14:36:46.192Z",
            "lastEdited": "2024-08-30T14:41:00.211Z",
            "author": {
                "username": "rick"
            },
            "_count": {
                "comments": 1
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
 
    ```POST``` ```https://blogger.adaptable.app/posts```
    ```
    {
        "title": "Etiam porttitor, dui in egestas fermentum",
        "content": "Curabitur ornare tortor mauris, et vehicula turpis condimentum vitae. Quisque rhoncus justo in lectus feugiat tempus. Sed laoreet tortor elit. Maecenas eros quam, tempus et nulla eget, scelerisque accumsan magna.",
        "published": true
    }
    ```
* Example response:
    ```json
    {
        "id": "ec1cd846-5f5b-4d6e-b382-cf9319216d1a",
        "averageRating": null,
        "title": "Etiam porttitor, dui in egestas fermentum",
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "published": true,
        "publishedAt": "2024-08-30T17:34:44.228Z",
        "lastEdited": null,
        "author": {
            "username": "rick"
        },
        "comments": []
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific post<a name="retrieve-post"></a>
* Example request:
    
    ```GET``` ```https://blogger.adaptable.app/posts/b607265a-19ab-4ac4-a603-c2ff640839e5```
* Example response:
    ```json
    {
        "id": "b607265a-19ab-4ac4-a603-c2ff640839e5",
        "averageRating": null,
        "title": "Etiam porttitor, dui in egestas fermentum",
        "content": "Curabitur ornare tortor mauris, et vehicula turpis condimentum vitae. Quisque rhoncus justo in lectus feugiat tempus. Sed laoreet tortor elit. Maecenas eros quam, tempus et nulla eget, scelerisque accumsan magna.",
        "published": true,
        "publishedAt": "2024-08-30T14:36:46.192Z",
        "lastEdited": "2024-08-30T14:41:00.211Z",
        "author": {
            "username": "rick"
        },
        "comments": [
            {
                "id": "ce491536-8c12-4228-aead-a7c34a7f1a02",
                "content": "Suspendisse auctor nulla eleifend semper aliquam.",
                "author": {
                    "username": "rick"
                },
                "posted": "2024-08-30T16:56:43.804Z",
                "lastEdited": "2024-08-30T17:10:53.553Z"
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
    
    ```PUT``` ```https://blogger.adaptable.app/posts/b607265a-19ab-4ac4-a603-c2ff640839e5```
    ```json
    {
        "title": "Nunc tortor dui, semper vitae",
        "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor."
    }
    ```
* Example response:
    ```json
    {
        "id": "b607265a-19ab-4ac4-a603-c2ff640839e5",
        "title": "Nunc tortor dui, semper vitae",
        "averageRating": null,
        "content": "Morbi vitae sem pharetra, suscipit diam in, vestibulum metus. Phasellus ultricies elementum enim, quis interdum tortor.",
        "published": true,
        "publishedAt": "2024-08-30T14:36:46.192Z",
        "lastEdited": "2024-08-30T17:40:00.927Z",
        "author": {
            "username": "rick"
        },
        "_count": {
            "comments": 1
        }
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a post<a name="delete-post"></a>
Requires user to be logged in and to match the post's author
* Example request:
    
    ```DELETE```  ```https://blogger.adaptable.app/posts/f4a06acf-1ec8-4c7f-8b32-6287c74dd467```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a post's comments<a name="retrieve-post-comments"></a>
* Example request:
    
    ```GET```  ```https://blogger.adaptable.app/posts/674997d3-b1f1-4eb7-bbf5-19f96d461e2a/comments```
* Example response:
 
    ```
    [
        {
            "id": "ca1477b6-84da-49f1-8535-b1897ce5f4a7",
            "content": "Vellentesque elementum maximus augue ullamcorper semper.",
            "author": {
                "username": "rick"
            },
            "posted": "2024-08-28T23:11:14.502Z",
            "lastEdited": null
        },
        {
            "id": "097dab0f-e454-4d0d-b700-620bb3ada4d5",
            "content": "Morbi molestie dui porttitor tortor tempor, ac pulvinar sapien aliquet.",
            "author": {
                "username": "rick"
            },
            "posted": "2024-08-30T16:56:00.810Z",
            "lastEdited": null
        }
    ]
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Rate a post<a name="rate-post"></a>
Requires user to be logged in, , will update previous rating if found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```POST``` ```https://blogger.adaptable.app/posts/f32b3b52-2a65-4c1d-9e2d-9e109436bffa/rating```
    ```json
    {
        "rating": 1
    }
    ```
* Example response:
    ```json
    {
        "id": "f32b3b52-2a65-4c1d-9e2d-9e109436bffa",
        "totalRating": 1,
        "title": "Lorem ipsum dolor sit amet",
        "content": "Vestibulum metus tortor, gravida id ultricies eu, convallis in turpis. Ut eget augue egestas, venenatis sapien id, faucibus urna.",
        "createdAt": "2024-08-30T21:53:11.473Z",
        "published": true,
        "publishedAt": "2024-08-30T21:58:29.986Z",
        "lastEditedAt": null,
        "authorId": "0ce714e8-f3d1-41ba-8d3b-699b6ecc8510"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update post rating<a name="update-post-rating"></a>
Requires user to be logged in, will create a new rating if no previous rating is found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```PUT``` ```https://blogger.adaptable.app/posts/f32b3b52-2a65-4c1d-9e2d-9e109436bffa/rating```
    ```json
    {
        "rating": -1
    }
    ```
* Example response:
    ```json
    {
        "id": "f32b3b52-2a65-4c1d-9e2d-9e109436bffa",
        "totalRating": -1,
        "title": "Lorem ipsum dolor sit amet",
        "content": "Vestibulum metus tortor, gravida id ultricies eu, convallis in turpis. Ut eget augue egestas, venenatis sapien id, faucibus urna.",
        "createdAt": "2024-08-30T21:53:11.473Z",
        "published": true,
        "publishedAt": "2024-08-30T21:58:29.986Z",
        "lastEditedAt": null,
        "authorId": "0ce714e8-f3d1-41ba-8d3b-699b6ecc8510"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Create a new comment<a name="create-comment"></a>
Requires user to be logged in
* Required fields: 
    * ```content: {{string}}```
* Example request:
    
    ```POST``` ```https://blogger.adaptable.app/posts/b607265a-19ab-4ac4-a603-c2ff640839e5```
    
* Example response:
    ```json
    {
        "id": "ce491536-8c12-4228-aead-a7c34a7f1a02",
        "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
        "author": {
            "username": "rick"
        },
        "posted": "2024-08-30T16:56:43.804Z",
        "lastEdited": null,
        "postId": "b607265a-19ab-4ac4-a603-c2ff640839e5"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a comment<a name="retrieve-comment"></a>
* Example request:
    
    ```GET``` ```https://blogger.adaptable.app/comments/ce491536-8c12-4228-aead-a7c34a7f1a02```
    
* Example response:
    ```json
    {
        "id": "ce491536-8c12-4228-aead-a7c34a7f1a02",
        "content": "Vivamus ullamcorper fringilla mauris, et scelerisque turpis rutrum nec.",
        "author": {
            "username": "rick"
        },
        "posted": "2024-08-30T16:56:43.804Z",
        "lastEdited": null,
        "postId": "b607265a-19ab-4ac4-a603-c2ff640839e5"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update a comment<a name="update-comment"></a>
Requires user to be logged in and to match the comment's author
* Required fields: 
    * ```content: {{string}}```
* Example request:

    ```PUT``` ```https://blogger.adaptable.app/comments/ce491536-8c12-4228-aead-a7c34a7f1a02```
    ```json
    {
        "content": "Suspendisse auctor nulla eleifend semper aliquam."
    }
    ```
* Example response:
    ```json
    {
        "id": "ce491536-8c12-4228-aead-a7c34a7f1a02",
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "author": {
            "username": "rick"
        },
        "posted": "2024-08-30T16:56:43.804Z",
        "lastEdited": "2024-08-30T17:10:53.553Z",
        "postId": "b607265a-19ab-4ac4-a603-c2ff640839e5"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Delete a comment<a name="delete-comment"></a>
Requires user to be logged in and to match the comment's author
* Example request:

    ```DELETE``` ```https://blogger.adaptable.app/comments/ce491536-8c12-4228-aead-a7c34a7f1a02```
* Example response:
 
    ```204 No Content```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Rate a comment<a name="rate-comment"></a>
Requires user to be logged in, will update previous rating if found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```POST``` ```https://blogger.adaptable.app/comments/f7d6779b-38e2-4f89-91eb-f6d79bc68b39/rating```
    ```json
    {
        "rating": 1
    }
    ```
* Example response:
    ```json
    {
        "id": "f7d6779b-38e2-4f89-91eb-f6d79bc68b39",
        "totalRating": 1,
        "content": "Class aptent taciti sociosqu ad litora torquent.",
        "author": {
            "username": "rick"
        },
        "postedAt": "2024-08-30T23:26:51.912Z",
        "lastEditedAt": null,
        "postId": "f32b3b52-2a65-4c1d-9e2d-9e109436bffa"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Update comment rating<a name="update-comment-rating"></a>
Requires user to be logged in, will create a new rating if no previous rating is found
* Required fields: 
    * ```rating (value must be -1, 0, or 1): {{int}}```
* Example request:
    
    ```PUT``` ```https://blogger.adaptable.app/comments/f7d6779b-38e2-4f89-91eb-f6d79bc68b39/rating```
    ```json
    {
        "rating": -1
    }
    ```
* Example response:
    ```json
    {
        "id": "f7d6779b-38e2-4f89-91eb-f6d79bc68b39",
        "totalRating": -1,
        "content": "Class aptent taciti sociosqu ad litora torquent.",
        "author": {
            "username": "rick"
        },
        "postedAt": "2024-08-30T23:26:51.912Z",
        "lastEditedAt": null,
        "postId": "f32b3b52-2a65-4c1d-9e2d-9e109436bffa"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------