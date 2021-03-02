import {Router} from 'express'
import { UserController } from './controllers/UserController'
import { SurveysController } from './controllers/SurveyController'
import { SendMailController } from './controllers/SendMailController'
import { DeleteUserController } from './controllers/DeleteUserController'
import { AnswerController } from './controllers/AnswerController'
import { NpsController } from './controllers/npsController'

const router = Router()

const userController = new UserController()
const surveyController = new SurveysController()
const sendMailController = new SendMailController()
const deleteUserController = new DeleteUserController()
const answerController = new AnswerController()
const npsController = new NpsController()

router.post("/users", userController.create)

router.get("/surveys", surveyController.show)
router.post("/surveys", surveyController.create)

router.delete("/deleteUser", deleteUserController.delete)

router.post("/sendMail", sendMailController.execute)

router.get("/answers/:value", answerController.execute)

router.get("/nps/:survey_id", npsController.execute)

export {router}