import { verifyToken } from "../utils/jwt";
import { createNewUser, logIn } from "../controllers/authControllers";
import { Router } from "express";

const router: Router = Router();

router.post("/signup", createNewUser);
router.post("/login", logIn);

router.get("/:token", (req, res) => {
  const { token } = req.params;

  if (verifyToken(token)) {
    res.send({ message: "token valid :D" });
  } else {
    res.send({ message: "token invalid :(" });
  }
});

export default router;
