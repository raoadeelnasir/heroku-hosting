import express from "express";
import {
  deleteUser,
  dropIncrease,
  getAllTheUser,
  getOneUser,
  userCreate,
  geth
} from "../controller/User.js";
import { authProtection } from "../midlleware/auth.js";
const router = express.Router();

router.get("/", authProtection, getAllTheUser);

router.post("/create", userCreate);

router.get("/geth", geth);

router.post("/one", authProtection, getOneUser);

router.delete("/delete", authProtection, deleteUser);

router.patch("/drop", authProtection, dropIncrease);

export default router;
