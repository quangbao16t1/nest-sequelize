import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userSevice: UserService) {}

    @Get()
    async getAllUser(@Res() response) {
        const listUser = await this.userSevice.getAllUser();
        return response.status(HttpStatus.OK).json({
            result: listUser,
            message: "Successfully!!!"
        })
    }
}
