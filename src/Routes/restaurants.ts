import { Router } from "express";
import RestaurantsController from "../Controllers/RestaurantsController";
const router = Router();

router.get("/all", RestaurantsController.getAll);
router.get("/id/:id", RestaurantsController.getById);
router.post("/create", RestaurantsController.create);
router.patch("/update/:id", RestaurantsController.update);
router.delete("/delete/:id", RestaurantsController.deleteRest);

export { router };