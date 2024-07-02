import express from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { carValidations } from "./car.validation";
import { carControllers } from "./car.controller";
import auth from "../../utils/auth";
import { USER_ROLE } from "../User/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(carValidations.createCarValidationSchema),
  carControllers.addNewCar
);

router.get("/", carControllers.getAllCars);
router.get("/:id", carControllers.getSingleCar);

router.delete("/:id", auth(USER_ROLE.admin), carControllers.deleteSingleCar);

router.put("/return", auth(USER_ROLE.admin), carControllers.carReturn);
router.put("/:id", auth(USER_ROLE.admin), validateRequest(carValidations.updateCarValidationSchema), carControllers.updateSingleCar);

export const CarRoutes = router;


