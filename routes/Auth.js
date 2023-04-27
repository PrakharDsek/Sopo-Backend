import express from "express";
import { CreateUser } from "../controllers/Auth/Createuser.js";
import { Login } from "../controllers/Auth/Login.js";

const router=express.Router();

router.post("/createUser" ,CreateUser)
router.post("/login" ,Login)

export default router