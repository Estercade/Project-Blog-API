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
| ```/comments/:commentid``` | ```GET``` | <a href="#retrieve-comment">Retrieve comment by comment ID</a> |
| ```/comments/:commentid``` | ```PUT**``` | <a href="#update-comment">Update comment by comment ID</a> |
| ```/comments/:commentid``` | ```DELETE**``` | <a href="#delete-comment">Delete comment by comment ID</a> |
 
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
        "username": "kyle",
        "password": "password",
    }
    ```
* Example response:
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1M2ZhNzFkZC0zZDZhLTQzZTAtYWYyNC0yYTlhNDRiNTUxZmEiLCJyb2xlIjoiTUVNQkVSIiwiaWF0IjoxNzI1MDUwMDkxLCJleHAiOjE3MjUwNjA4OTF9.5_41sJ9JIjKcVQoX7AoPUN4CpGHNcxn6l10kfbL26fo",
        "currentUser": "kyle"
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
            "username": "kyle",
            "_count": {
                "posts": 4,
                "comments": 2
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
        "username": "kyle",
        "password": "password",
        "email": "kyle@example.com"
    }
    ```
* Example response:
    ```json
    {
        "username": "kyle",
        "email": "kyle@example.com",
        "role": "MEMBER"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific user's information<a name="retrieve-user"></a>
* Example request:
    
    ```GET``` ```https://blogger.adaptable.app/users/kyle```
* Example response:
    ```json
    {
        "username": "kyle",
        "posts": [
            {
                "id": "0acb7cee-c693-4ec3-af43-5e41df7c5fdf",
                "title": "Duis at efficitur tortor.",
                "content": "Vestibulum pulvinar orci felis, et accumsan lorem suscipit eget. Sed interdum sapien ac orci vehicula, in commodo tortor scelerisque.",
                "publishedAt": "2024-08-28T17:08:16.261Z",
                "lastEdited": null,
                "author": {
                    "username": "kyle"
                },
                "averageRating": null,
                "_count": {
                    "comments": 0
                }
            }
        ],
        "comments": [
            {
                "id": "c3589309-1ba1-4658-b14f-81554df4242d",
                "content": "Vestibulum euismod est nunc, quis iaculis felis sodales et.",
                "posted": "2024-08-28T16:41:31.552Z",
                "lastEdited": null,
                "author": {
                    "username": "kyle"
                },
                "post": {
                    "id": "b394201a-ad4f-4022-9aea-6efbd1c458f1",
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
        "username": "kyle",
        "password": "password123",
        "email": "kyle12@example.com"
    }
    ```
* Example response:
    ```json
    {
        "username": "kyle",
        "email": "kyle12@example.com",
        "role": "MEMBER"
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
    * ```date``` - sort by date published
    * ```title``` - sort alphabetically by title
    * ```rating``` - sort by rating
    * ```comments``` - sort by number of comments
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users/kyle/posts?sort=title&order=desc```
* Example response:
    ```json
    [
        {
            "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
            "title": "Phasellus eget lectus at sapien",
            "content": "Maecenas feugiat sagittis sollicitudin. Cras nisl ligula, egestas sit amet rutrum ac, porttitor at turpis.",
            "published": true,
            "publishedAt": "2024-08-30T20:40:24.468Z",
            "lastEdited": "2024-08-30T20:44:16.436Z",
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
            "ratingCount": 0,
            "_count": {
                "comments": 1
            }
        },
        {
            "id": "0acb7cee-c693-4ec3-af43-5e41df7c5fdf",
            "title": "Duis at efficitur tortor.",
            "content": "Vestibulum pulvinar orci felis, et accumsan lorem suscipit eget. Sed interdum sapien ac orci vehicula, in commodo tortor scelerisque.",
            "published": true,
            "publishedAt": "2024-08-28T17:08:16.261Z",
            "lastEdited": null,
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
            "ratingCount": 0,
            "_count": {
                "comments": 0
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

    ```GET``` ```https://blogger.adaptable.app/users/kyle/comments?sort=date&order=asc```
* Example response:
    ```json
    [
        {
            "id": "c3589309-1ba1-4658-b14f-81554df4242d",
            "content": "Vestibulum euismod est nunc, quis iaculis felis sodales et.",
            "posted": "2024-08-28T16:41:31.552Z",
            "lastEdited": null,
            "author": {
                "username": "kyle"
            },
            "post": {
                "id": "b394201a-ad4f-4022-9aea-6efbd1c458f1",
                "title": "My first post"
            }
        },
        {
            "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
            "content": "Suspendisse auctor nulla eleifend semper aliquam.",
            "posted": "2024-08-30T20:42:25.363Z",
            "lastEdited": "2024-08-30T20:46:32.440Z",
            "author": {
                "username": "kyle"
            },
            "post": {
                "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
                "title": "Phasellus eget lectus at sapien"
            }
        }
    ]
     ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a user's drafts only<a name="retrieve-user-drafts"></a>
Requires user to be logged in and to match the specified user (drafts are hidden to the public)
* Sorting options (sorts drafts by date edited if sorting option is unspecified or invalid):
    * ```edited``` - sort by date last edited
    * ```created``` - sort by date created
* Ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending order
* Example request:

    ```GET``` ```https://blogger.adaptable.app/users/kyle/drafts?sort=created&order=asc```
* Example response:
    ```json
    [
        {
            "id": "02eb7078-ed5f-4b48-8925-320ced839d2c",
            "title": "My first post",
            "content": "Lorem ipsum dolor sit amet.",
            "published": false,
            "createdAt": "2024-08-28T16:41:30.970Z",
            "lastEdited": null,
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
            "ratingCount": 0,
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "7fff47ce-6ba0-4da1-b7a0-932b84037110",
            "title": "Donec commodo finibus luctus",
            "content": "Donec aliquet et dui in vehicula. Nullam hendrerit pretium lacus, quis ultrices ante tristique et.",
            "published": false,
            "createdAt": "2024-08-30T20:38:32.881Z",
            "lastEdited": null,
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
            "ratingCount": 0,
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
    * ```title``` - sort by alphabetically title
    * ```date``` - sort by date published
    * ```rating``` - sort by average rating
    * ```comments``` - sort by number of comments
    * ```username``` - sort alphabetically by author's username
* Available ordering options (ordering will only be performed if a sorting option is specified):
    * ```asc``` - ascending order (default order if ordering option is unspecified or invalid)
    * ```desc``` - descending
* Example request:

    ```GET``` ```https://blogger.adaptable.app/posts?sort=title&order=asc```
* Output example:
    ```json
    [
        {
            "id": "0acb7cee-c693-4ec3-af43-5e41df7c5fdf",
            "title": "Duis at efficitur tortor.",
            "content": "Vestibulum pulvinar orci felis, et accumsan lorem suscipit eget. Sed interdum sapien ac orci vehicula, in commodo tortor scelerisque.",
            "published": true,
            "publishedAt": "2024-08-28T17:08:16.261Z",
            "lastEdited": null,
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
            "_count": {
                "comments": 0
            }
        },
        {
            "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
            "title": "Phasellus eget lectus at sapien",
            "content": "Maecenas feugiat sagittis sollicitudin. Cras nisl ligula, egestas sit amet rutrum ac, porttitor at turpis.",
            "published": true,
            "publishedAt": "2024-08-30T20:40:24.468Z",
            "lastEdited": "2024-08-30T20:44:16.436Z",
            "author": {
                "username": "kyle"
            },
            "averageRating": null,
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
    ```json
    {
        "title": "Aenean mauris diam",
        "content": "Vivamus porta risus in porttitor lacinia. Mauris a diam in arcu ullamcorper placerat dignissim sit amet orci. Curabitur luctus justo urna, a suscipit urna semper sit amet.",
        "published": true
    }
    ```
* Example response:
    ```json
    {
        "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
        "title": "Aenean mauris diam",
        "content": "Vivamus porta risus in porttitor lacinia. Mauris a diam in arcu ullamcorper placerat dignissim sit amet orci. Curabitur luctus justo urna, a suscipit urna semper sit amet.",
        "published": true,
        "publishedAt": "2024-08-30T20:40:24.468Z",
        "lastEdited": null,
        "author": {
            "username": "kyle"
        },
        "averageRating": null,
        "ratingCount": 0,
        "comments": []
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a specific post<a name="retrieve-post"></a>
* Example request:
    
    ```GET``` ```https://blogger.adaptable.app/posts/976a7d02-48c5-4614-be61-38ee6b738b5b/```
* Example response:
    ```json
    {
        "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
        "title": "Aenean mauris diam",
        "content": "Vivamus porta risus in porttitor lacinia. Mauris a diam in arcu ullamcorper placerat dignissim sit amet orci. Curabitur luctus justo urna, a suscipit urna semper sit amet.",
        "published": true,
        "publishedAt": "2024-08-30T20:40:24.468Z",
        "lastEdited": null,
        "author": {
            "username": "kyle"
        },
        "averageRating": null,
        "ratingCount": 0,
        "comments": [
            {
                "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
                "content": "Donec aliquet et dui in vehicula.",
                "author": {
                    "username": "kyle"
                },
                "posted": "2024-08-30T20:42:25.363Z",
                "lastEdited": null
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
    
    ```PUT``` ```https://blogger.adaptable.app/posts/976a7d02-48c5-4614-be61-38ee6b738b5b/```
    ```json
    {
        "title": "Phasellus eget lectus at sapien",
        "content": "Maecenas feugiat sagittis sollicitudin. Cras nisl ligula, egestas sit amet rutrum ac, porttitor at turpis."
    }
    ```
* Example response:
    ```json
    {
        "id": "976a7d02-48c5-4614-be61-38ee6b738b5b",
        "title": "Phasellus eget lectus at sapien",
        "content": "Maecenas feugiat sagittis sollicitudin. Cras nisl ligula, egestas sit amet rutrum ac, porttitor at turpis.",
        "published": true,
        "publishedAt": "2024-08-30T20:40:24.468Z",
        "lastEdited": "2024-08-30T20:44:16.436Z",
        "author": {
            "username": "kyle"
        },
        "averageRating": null,
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
    
    ```GET```  ```https://blogger.adaptable.app/posts/976a7d02-48c5-4614-be61-38ee6b738b5b/comments```
* Example response:
 
    ```
    [
        {
            "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
            "content": "Donec aliquet et dui in vehicula.",
            "author": {
                "username": "kyle"
            },
            "posted": "2024-08-30T20:42:25.363Z",
            "lastEdited": null
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
    
    ```POST``` ```https://blogger.adaptable.app/posts/976a7d02-48c5-4614-be61-38ee6b738b5b/comments```
    
* Example response:
    ```json
    {
        "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
        "content": "Donec aliquet et dui in vehicula.",
        "author": {
            "username": "kyle"
        },
        "posted": "2024-08-30T20:42:25.363Z",
        "lastEdited": null,
        "postId": "976a7d02-48c5-4614-be61-38ee6b738b5b"
    }
    ```
##### <a href="#top"> Return to top</a>
------------------------------------------------------------------------------------------
### Retrieve a comment<a name="retrieve-comment"></a>
* Example request:
    
    ```GET``` ```https://blogger.adaptable.app/comments/790b1c85-437c-41dc-919a-22a4adb0d078```
    
* Example response:
    ```json
    {
        "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
        "content": "Donec aliquet et dui in vehicula.",
        "author": {
            "username": "kyle"
        },
        "posted": "2024-08-30T20:42:25.363Z",
        "lastEdited": null,
        "postId": "976a7d02-48c5-4614-be61-38ee6b738b5b"
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
        "id": "790b1c85-437c-41dc-919a-22a4adb0d078",
        "content": "Suspendisse auctor nulla eleifend semper aliquam.",
        "author": {
            "username": "kyle"
        },
        "posted": "2024-08-30T20:42:25.363Z",
        "lastEdited": "2024-08-30T20:46:32.440Z",
        "postId": "976a7d02-48c5-4614-be61-38ee6b738b5b"
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