import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { carValidations } from "./car.validation";
import { carControllers } from "./car.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(carValidations.createCarValidationSchema),
  carControllers.addNewCar
);

router.get("/", carControllers.getAllCars);

router.get("/:id", carControllers.getSingleCar);

router.delete("/:id", carControllers.deleteSingleCar);

router.put(
  "/:id",
  validateRequest(carValidations.updateCarValidationSchema),
  carControllers.updateSingleCar
);

export const CarRoutes = router;
