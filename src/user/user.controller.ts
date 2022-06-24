import { Body, Controller, Get, HttpStatus, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { VerifyToken } from "src/config/verifyToken";
import { User } from "src/models/user.model";
import { UserService } from "./user.service";
import * as jwt from 'jsonwebtoken';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("user")
export class UserController {
  constructor(private readonly userSevice: UserService) { }

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
    const result = await this.userSevice.createUser(user);
    return response.status(HttpStatus.CREATED).json({
      result: result,
      message: "Created Successfully!!!",
    })
  }

  @Post('/register')
  async register(@Res() response, @Body() user: User) {
    try {
      await this.userSevice.register(user);
      return response.status(HttpStatus.CREATED).json({
        message: 'Register Success! Please activate your email to start.'
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }

  @Post('/active')
  async activeEmail(@Res() response, @Body('active_token') active_token: string) {
    try {
      console.log(active_token);
      await this.userSevice.activeEmail(active_token);
      return response.status(HttpStatus.OK).json({
        message: 'Account has been activated.'
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error
      })
    }
  }

  @Post('/login')
  async login(@Res() response, @Body() body) {
    try {
      const { email, password } = body
      const result = await this.userSevice.login(email, password);

      response.cookie('refreshtoken', result, {
        httpOnly: true,
        path: '/user/refresh',
        maxAge: 1 * 24 * 60 * 60 * 1000
      })

      response.status(HttpStatus.OK).json({
        message: 'Login success!!!'
      })
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        error: error
      })
    }
  }

  @Post('/refresh')
  async refreshToken(@Res() response, @Req() request) {
    try {
      const rf_token = request.cookies.refreshtoken;
      console.log(request.cookies.refreshtoken);
      if (!rf_token) response.status(HttpStatus.BAD_REQUEST).json({
        error: "Login ddeeee"
      })
      const result = await this.userSevice.getAccessToken(rf_token);
      response.status(HttpStatus.OK).json({
        access_token: result
      })
    } catch (error) {
      response.status(HttpStatus.BAD_REQUEST).json({
        error: error.message
      })
    }
  }

  @Post('/forgot')
  async forgotPassword(@Res() response, @Body() body) {
    try {

      const { email } = body

      await this.userSevice.forgotPassword(email);

      response.status(HttpStatus.OK).json({
        message: "Re-send the password, please check your email."
      });

    } catch (error) {

      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message })

    }
  }

  @Post('/reset')
  async restPassword(@Res() response, @Req() request, @Body() body) {
    try {
      const { password } = body

      const token = request.headers.token;

      const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

      await this.userSevice.resetPassword(password, decoded.user.id);  
      response.status(HttpStatus.OK).json({
        message: "Password successfully changed."
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
    }
  }

  @Get('/logout')
  async logout(@Res() response, @Req() request) {
    try {
      response.clearCookie('refreshtoken', { path: '/user/refresh' })
      response.status(HttpStatus.OK).json({
        message: "Logged out."
      })
    } catch (error) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: error.message
      })
    }
  }
}
