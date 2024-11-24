import { Request, Response, Router } from "express";

const router = Router();

// main API routes
router.get("/", (_: Request, res: Response) => res.send("TestAPI OK"));

export default router;
