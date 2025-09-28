# back_usof

# USOF Project – Forum API with Admin Panel

## 📝 Short Description
This project is a **RESTful API** built with **Node.js, Express, and MySQL**.  
It is implementation of a forum-like system with authentication, user management, posts, categories, comments, likes, and an **AdminJS** dashboard for administrators.  

This API supports:
- User registration, login, logout, password reset, and email verification  
- CRUD operations for users, posts, categories, comments, and likes
- Likes/dislikes for posts and comments  
- Locking/unlocking posts and comments  
- Role-based access control (admin, author, authenticated user)  
- Avatars upload  

---

## ⚙️ Requirements and Dependencies

### Requirements
- [Node.js](https://nodejs.org/) (>= 18.x)
- [MySQL](https://www.mysql.com/) (>= 8.0)

### Dependencies
The main npm packages used in the project:
- **express** – Web framework  
- **mysql2** – Database driver  
- **knex** – Query builder (if used in your db.js)  
- **bcrypt** – Password hashing  
- **express-session** – Session handling
- **express-mysql-session** – MySQL-based session store for express-session
- **jsonwebtoken** – JSON Web Token (JWT) authentication and authorization
- **crypto** – Token generation  
- **nodemailer** – Sending emails  
- **multer** – File uploads (avatars)  
- **dotenv** – Environment configuration  
- **adminjs**, **@adminjs/express**, **@adminjs/sql** – Admin panel  

---

## 🚀 How to Run the Project

1. **Clone the repository**
   ```bash
   git clone [https://github.com/polittraaa/back_usof](https://github.com/polittraaa/back_usof)
   ```
   
   ```bash
   cd back_usof
   ```

2. **Install dependencies**
    ```bash
    npm install
    ```

3. **Configure environment variables**  
Create a .env file in the root folder with your database and session credentials:
    ```.env
    # SERVER_PORT=yourtPort

    # Secret for user sessions (use any long random string)
    TOKEN_SECRET=yourSecretKeyHere
    COOKIE_SECRET=yourCookieKey

    # Database configuration
    DATABASE_HOST=127.0.0.1
    DATABASE_PORT=3306
    DATABASE_USER=yourDbUser
    DATABASE_PASSWORD=yourDbPassword
    DATABASE_NAME=usof_db

    # Email configuration
    MAIL=yourEmail@example.com
    MAIL_PASS=yourAppPasswordOrToken
    ```

4. **Run the server**
    ```bash
    npm start
    ```
    The server will run on:  
    ```bash
    http://localhost:3001
    ```

5. **Access AdminJS panel**  
Navigate to:
    ```bash
    http://localhost:3001/admin
    ```

---

## 📖 API Overview

### Authentication module
- ```POST /api/auth/register``` – Register new user
- ```POST /api/auth/login``` – Login (email must be confirmed)
- ```POST /api/auth/logout``` – Logout
- ```POST /api/auth/password-reset``` – Request password reset
- ```POST /api/auth/password-reset/:token``` – Confirm password reset
- ```POST /api/auth/register/verify-email``` – Verify email

### User module
- ```GET /api/users``` – Get all users
- ```GET /api/users/:id``` – Get user by ID
- ```POST /api/users``` – Create user (admin only)
- ```PATCH /api/users/:id``` – Update user (admin or self)
- ```PATCH /api/users/avatar``` – Upload avatar
- ```DELETE /api/users/:id``` – Delete user (admin or self)

### Post module
- ```GET /api/posts``` – Get all posts (with pagination)
- ```GET /api/posts/:id``` – Get post by ID
- ```POST /api/posts``` – Create new post (auth required)
- ```PATCH /api/posts/:id``` – Update post (author or admin)
- ```DELETE /api/posts/:id``` – Delete post (author or admin)
- ```POST /api/posts/:id/like``` – Like post
- ```DELETE /api/posts/:id/like``` – Remove like

### Categories module
- ```GET /api/categories``` – Get all categories
- ```GET /api/categories/:id``` – Get category by ID
- ```GET /api/categories/:id/posts``` – Get posts by category
- ```POST /api/categories``` – Create category
- ```PATCH /api/categories/:id``` – Update category
- ```DELETE /api/categories/:id``` – Delete category

### Comments module
- ```GET /api/posts/:id/comments``` – Get comments for a post
- ```GET /api/comments/:id``` – Get comment by ID
- ```POST /api/posts/:id/comments``` – Create comment
- ```PATCH /api/comments/:id``` – Update comment
- ```DELETE /api/comments/:id``` – Delete comment
- ```POST /api/comments/:id/like``` – Like comment
- ```DELETE /api/comments/:id/like``` – Remove like

---

## 🔍 Documentation
For detailed documentation, see [DOCUMENTATION.md]().  