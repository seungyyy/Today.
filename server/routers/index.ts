import { Router } from "express";
import { userRouter } from "./user";

const router = Router();

/* ROUTE */
router.use("/user", userRouter);

export default router;