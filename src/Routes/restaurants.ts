import { Router } from "express";
import RestaurantsController from "../Controllers/RestaurantsController";
const router = Router();

router.get("/getAll", RestaurantsController.getAll);

export { router };