import { Router } from "express"
import { PayableController } from "../controllers/PayableController"

const payableController = new PayableController()

export const payableRouter = Router()

payableRouter.get('/', payableController.getBalance)