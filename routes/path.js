import { Router } from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/users.js";
import Post from "../models/posts.js";

//auth
import handleLogin from '../controllers/auth/login.js';
import handleRegister from '../controllers/auth/register.js';
import handleLogout from '../controllers/auth/logout.js';
import handleConfirm from '../controllers/auth/confirm_pass.js';
import handleReset from '../controllers/auth/reset_pass.js';
import handleEmailConfirm from "../controllers/auth/confirm_email.js";

//user
import getUsers from '../controllers/users/get_users.js';
import getUser from '../controllers/users/get_user_id.js';
import handleAvatar from '../controllers/users/upload_photo.js';
import handleUpdate from '../controllers/users/update_user.js';
import handleDelete from '../controllers/users/del_user.js';

//posts
import { getPosts } from '../controllers/post/get_posts.js';
import { getPost } from '../controllers/post/get_post.js';
import { getComments } from '../controllers/post/get_comment.js';
import { handleComment } from '../controllers/post/create_comment.js';
import { handleGetCategories } from '../controllers/post/get_category.js';
import { handleGetLikes } from '../controllers/post/get_likes.js';
import { handlePost } from '../controllers/post/create_post.js';
import { handleLikes } from '../controllers/post/create_like.js';

//middleware
import { emailCheck } from '../middlewares/email_check.js';
import { requireLogin } from "../middlewares/session_auth.js";
import upload from '../middlewares/photo_upload.js';
import { roleCheck } from '../middlewares/role_check.js';

const router = Router();
//auth
router.post('/auth/login', emailCheck(db, User), (req, res) => handleLogin(req, res, db, bcrypt, User));
router.post('/auth/register', (req, res) => handleRegister(req, res, db, bcrypt, jwt, User));
router.post('/auth/logout', (req, res) => handleLogout(req, res));
router.post('/auth/password-reset', (req, res) => handleReset(req, res, jwt));
router.post('/auth/password-reset/:confirm_token', (req, res) => handleConfirm(req, res, db, jwt, bcrypt, User));
//
router.get('/auth/confirm/:token', (req, res) => handleEmailConfirm(req, res, db, jwt, User));
//user
router.get('/users', (req, res) => getUsers(req, res, db, User));
router.get('/users/:user_id', (req, res) => getUser(req, res, db, User));
router.patch('/users/avatar', requireLogin, upload.single("avatar"), (req, res) => handleAvatar(req, res, db, User));
router.patch('/users/:user_id', requireLogin, (req, res) => handleUpdate(req, res, db, User));
router.delete('/users/:user_id', requireLogin, (req, res) => handleDelete(req, res, db, User));
//posts
router.get('/posts', roleCheck(db, Post), (req, res) => getPosts(req, res, db, Post));
router.get('/posts/:post_id', roleCheck(db, Post), (req, res) => getPost(req, res, db, Post));
router.get('/posts/:post_id/comments', roleCheck(db, Post), (req, res) => getComments(req, res, db, Post));
router.get('/posts/:post_id/like', roleCheck(db, Post), (req, res) => handleGetLikes(req, res, db, Post));
router.get('/posts/:post_id/categories', (req, res) => handleGetCategories(req, res, db, Post));
router.post('/posts/:post_id/comments', requireLogin, (req, res) => handleComment(req, res, db, Post));
router.post('/posts/', requireLogin, (req, res) => handlePost(req, res, db, Post));
router.post('/posts/:post_id/like', requireLogin, (req, res) => handleLikes(req, res, db, Post));

export default router;
