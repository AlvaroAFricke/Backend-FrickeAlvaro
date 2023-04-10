import Router from "koa-router";
import { register, login, logout } from "../controller/userController.js";

const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.get("/register", async (ctx) => {
  await ctx.render("register");
});

router.get("/login", async (ctx) => {
  await ctx.render("login");
});

export default router;
