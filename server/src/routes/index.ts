import { Router } from "express";
import usersRouter from "./users";
import pokemonApi from "./pokemon";

export const router = Router();

router.use("/users", usersRouter);
router.use("/pokemon", pokemonApi);

export default router;
