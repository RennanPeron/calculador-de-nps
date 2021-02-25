import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import sendMailService from '../services/sendMailService'


class SendMailController {

    async execute(req: Request, res: Response){
        const {email, survey_id} = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const userAlreadyExists = await usersRepository.findOne({email})

        if(!userAlreadyExists){
            return res.status(400).json({error: "Users does not exists"})
        }

        const survey = await surveysRepository.findOne({id: survey_id})

        if(!survey){
            return res.status(400).json({error: "Survey does not exists"})
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser)

        await sendMailService.execute(email, survey.title, survey.description)

        return res.json(surveyUser)
    }
}

export {SendMailController}