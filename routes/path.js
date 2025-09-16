import { Router } from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../models/users.js";

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
//middle
import { requireLogin } from "../middlewares/session_auth.js";
import upload from '../middlewares/photo_upload.js'
const router = Router();
//auth
router.post('/auth/login', (req, res) => handleLogin(req, res, db, bcrypt, User));
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

export default router;
