import { Body, Controller, Get, HttpStatus, Post, Res } from "@nestjs/common";
import { response } from "express";
import { User } from "src/models/user.model";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userSevice: UserService) {}

  @Get()
  async getAllUser(@Res() response) {
    const listUser = await this.userSevice.getAllUser();
    return response.status(HttpStatus.OK).json({
      result: listUser,
      message: "Successfully!!!",
    });
  }

  @Post('/new')
  async createUser(@Res() response, @Body() user: User) {
    const result =  await this.userSevice.createUser(user);
    return response.status(HttpStatus.CREATED).json({
      result: result,
      message: "Created Successfully!!!",
    })
  }
}
