import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";


class AnswerController {

    // Router Params -> localhost:3333/answer/10/...  
    // O 10 equivale à localhost/:value <- Parâmetro de Rota.

    // Query Params -> seguido do ? ...?u=111111.12
    // O u é um dos query params, sendo u = 11111.12
    async execute(req: Request, res: Response) {
        const {value} = req.params
        const {u} = req.query

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        })

        if(!surveyUser) {
            throw new AppError("Survey user does not exists")
        }

        surveyUser.value = Number(value)

        await surveysUsersRepository.save(surveyUser)

        return res.json(surveyUser)
    }
}

export { AnswerController }