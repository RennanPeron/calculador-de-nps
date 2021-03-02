import {Request, Response} from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveyRepository } from '../repositories/SurveyRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository'
import sendMailService from '../services/sendMailService'
import {resolve} from 'path'

class SendMailController {

    async execute(req: Request, res: Response){
        const {email, survey_id} = req.body

        const usersRepository = getCustomRepository(UsersRepository)
        const surveysRepository = getCustomRepository(SurveyRepository)
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const user = await usersRepository.findOne({email})

        if(!user){
            return res.status(400).json({error: "Users does not exists"})
        }

        const survey = await surveysRepository.findOne({id: survey_id})

        if(!survey){
            return res.status(400).json({error: "Survey does not exists"})
        }

        const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
            where: [{user_id: user.id, value: null}],
            relations: ["user", "survey"]
        })

        const variables = {
            name: user.name,
            title: survey.title,
            description: survey.description,
            user_id: user.id,
            link: process.env.URL_MAIL
        }

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")

        if(surveyUserAlreadyExists) {
            await sendMailService.execute(email, survey.title, variables, npsPath)
            return res.status(200).json(surveyUserAlreadyExists)
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: user.id,
            survey_id
        })

        await surveysUsersRepository.save(surveyUser) 

        await sendMailService.execute(email, survey.title, variables, npsPath)

        return res.json(surveyUser)
    }
}

export {SendMailController}