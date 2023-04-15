import { Router } from "express";
import { validateAuth } from "../middlewares/validateAuth";
import { getHistory } from "../controllers/history-controller";

const historyRouter = Router()

historyRouter.get('/history', validateAuth, getHistory)

export default historyRouter