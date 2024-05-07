import express from "express";
import memberController from "./controllers/member.controller";
const router = express.Router();

router.get("/", memberController.goHome);
router
  .get("/login", memberController.getLogin)
  .post("/login", memberController.login);

router
  .get("/signup", memberController.getSignup)
  .post("/signup", memberController.signup);

export default router;
