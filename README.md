
# BlogSavy

BlogSavy is a backend application for managing blog posts. It provides REST APIs for creating, reading, updating and deleting blog posts. Each blog post has a title, content and timestamp, and is associated with a user account. Users can only create, read, update and delete their own blog posts.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGO_URI`

`JWT_SECRET`


## Run Locally

Clone this repository

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Add config.env in the config folder with environment variables
```bash
  MONGO_URI - mongo db url
  JWT_SECRET - any JWT secret string
```

Install dependencies by running

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

## Authors

- [@abhay2002-pro](https://github.com/abhay2002-pro)

