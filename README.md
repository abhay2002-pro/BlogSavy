
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

## API Endpoints

Base URL - https://blogsavy.onrender.com/api/v1

* User Routes
  * POST - /register - Register a new user
  * POST - /login - Login 
  * POST - /logout - Logout
  * GET - /me - Get my profile
  * GET - /users/:id - Get user by user id
  * PUT - /users/:id - Update user by user id
  * DELETE - /users/:id - Delete user by user id

* Blog Routes
  * GET - /blog-posts - Get blog posts of current user
  * POST - /blog-posts - Create new blog post
  * GET - /blog-posts/:id - Get blog post by blog id
  * PUT - /blog-posts/:id - Update blog post by blog id
  * DELETE - /blog-posts/:id - Delete blog post by blog id

## Deploy to a cloud Hosting platform
Platform - Render
* Create a Render account if you haven't already done so.
* Create a new Web Service on Render by clicking on the "Create a new service" button on the dashboard.
* Select "Web Service" as the service type and choose "Node.js" as the environment.
* Connect your Git repository by selecting the repository provider and repository name.
* Set the build command to npm install and the start command to npm start.
* Set the environment variables in the "Environment" tab of the service settings. Make sure to include all the environment variables required by your application, such as database connection strings, API keys, and JWT secret.
* Click "Create Web Service" to deploy your application.
* Render will automatically build and deploy your application from your Git repository.
* Once the deployment is complete, you can access your application by clicking on the "Open App" button on the dashboard.


## Tech Stack

**Server:** Node, Express

**Database:** MongoDB

## Authors

- [@abhay2002-pro](https://github.com/abhay2002-pro)

