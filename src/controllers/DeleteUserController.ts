import { Request, Response } from "express"
import { getCustomRepository } from "typeorm"
import { UsersRepository } from "../repositories/UsersRepository"



class DeleteUserController {
    async delete (req: Request, res: Response) {
        const {id} = req.body

        const userRepository = await getCustomRepository(UsersRepository)

        const user = await userRepository.findOne(id)

        if(!user) {
            return res.status(401).json({
                error: 'User not found'
            })
        }

        userRepository.remove(user)

        return res.status(200).json({success: "user deleted"})
    }
}

export {DeleteUserController}