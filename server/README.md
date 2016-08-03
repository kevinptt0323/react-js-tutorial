# Server
## Introduction
This server example is based on [koa](http://koajs.com/) and [MongoDB](https://www.mongodb.com/).

## Installation
1. install mongodb and start
  - Mac OS X
    - `brew install mongodb`
    - `brew services start mongodb`
2. `npm install`

## Start
`npm run server`

# API

## Models

### User
```{
	"_id": "<random ID>",
	"username": "user1",
	"password": "user1"
}
```

### Post
```{
	"_id": "<random ID>",
	"pid": 1,
	"uid": "<reference to a user ID>",
	"content": "something",
	"created_at":"2016-08-03T08:17:58.584Z"
}
```

### Friend Relation
(todo)

## Routes

### GET `/api/u/`
Get a list of users

### POST `/api/u/`
Create a new user

### GET `/api/u/<username>`
Get a user by `<username>`

### DELETE `/api/u/<username>`
Delete a user by `<username>`

### GET `/api/posts/`
Get a list of posts

### POST `/api/posts/`
Create a new post

### GET `/api/posts/<pid>`
Get a post by `<pid>`

### Delete `/api/posts/<pid>`
Delete a post by `<pid>`

### Get `/api/u/<username>/posts/`
Get a list of user's posts by `<username>`

