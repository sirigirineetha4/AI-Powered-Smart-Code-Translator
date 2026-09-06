import { Router } from "express";
import {
  translate,
  analyze,
  optimize,
  explain,
  debugCode,
  generateUnitTests,
} from "../controllers/code.controller.js";
import authenticate from "../middleware/auth.middleware.js";

const router = Router();

// All code routes need the user to be logged in
router.use(authenticate);

router.post("/translate", translate);
router.post("/analyze", analyze);
router.post("/optimize", optimize);
router.post("/explain", explain);
router.post("/debug", debugCode);
router.post("/generate-tests", generateUnitTests);

export default router;