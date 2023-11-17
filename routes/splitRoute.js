import { Router } from "express";
import { splitCompute } from "../controllers/splitController.js";

const router = Router();

router.post("/compute", splitCompute);

export default router;
