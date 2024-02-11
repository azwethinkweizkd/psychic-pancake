import { Router } from "express";
import usersRouter from "./users";
import pokemonApi from "./pokemon";
import pokemonTCGApi from "./pokemon-tcg";
import auth from "./auth/auth.routes";

export const router = Router();

router.use("/users", usersRouter);
router.use("/pokemon", pokemonApi);
router.use("/pokemon-tcg", pokemonTCGApi);
router.use("/auth", auth);

export default router;
