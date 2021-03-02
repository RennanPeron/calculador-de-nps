import {Router} from 'express'
import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveyController'
import { SendMailController } from './controllers/SendMailController'
import { DeleteUserController } from './controllers/DeleteUserController'

const router = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()
const deleteUserController = new DeleteUserController()

router.post("/users", userController.create)

router.get("/surveys", surveyController.show)
router.post("/surveys", surveyController.create)

router.delete("/deleteUser", deleteUserController.delete)

router.post("/sendMail", sendMailController.execute)

export {router}