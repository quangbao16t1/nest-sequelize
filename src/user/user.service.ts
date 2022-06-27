import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";
import * as bcrypt from "bcrypt";
import { generateAccessToken, generateActiveToken, generateRefreshToken } from "src/config/generateToken";
import sendEmail from "src/config/sendEmail";
import * as jwt from 'jsonwebtoken';
import { CreateUserDto } from "src/dto/user.dto";
import sequelize from "sequelize";


@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: typeof User,
  ) { }

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async createUser(user: CreateUserDto) {
    const newUser = await this.userRepository.findOne({
      where: { email: user.email },
    });
    if (newUser) {
      throw `Email ${user.email} is allready exits!`;
    }
    const userCreate = new User();

    Object.assign(userCreate, user);

    if (user.password) {
      userCreate.password = await bcrypt.hashSync(user.password, 8);
    }

    // await this.userRepository.create(userCreate);
    userCreate.save();
  }

  async updateAvatar(avt: string, id: number) {
    const userUpdate = await this.userRepository.findOne({ where: { id: id } });
    if (!userUpdate) throw new Error('User doesnt exists.')
    const result = userUpdate.update({ avatar: avt });
    if (!result) throw new Error("Cant update avatar!")
    return result;
  }

  async getAllUsers(lastName: string, size: number, offset: number) {
    const Op = sequelize.Op;
    // if(keyword === null) return await this.userRepository.findAll({});
   return await this.userRepository.findAndCountAll({
      where: {
        lastName: {
          [Op.like]: `%${lastName}%`
        }
      },
      limit: size,
      offset: offset
    });
  }

  async getUserById(id) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) throw new Error('not found');
    return user;
  }

  async register(user: User) {

    const newUser = await this.userRepository.findOne({ where: { email: user.email } });

    if (newUser) throw new Error(`Email ${user.email} already exists!!!`);

    if (user.password.length < 6) throw new Error(`Password must be at least 6 characters!!!`);

    if (user.password) {
      user.password = await bcrypt.hashSync(user.password, 8);
    }

    user.createdAt = new Date();
    user.updatedAt = null;

    const active_token = generateActiveToken(user);

    console.log('active_token: ', active_token);

    const CLIENT_URL = `${process.env.BASE_URL}`

    const url = `${CLIENT_URL}/active/${active_token}`;

    if (user.email) {
      try {
        sendEmail(user.email, url, `Verify your email address`);
      } catch (error) {
        throw error;
      }
    }

  }

  async activeEmail(active_token) {

    const user_decoded = jwt.verify(active_token, process.env.REFRESH_TOKEN_SECRET);
    console.log('sss');

    if (!user_decoded) throw `Invalid authentication!`;

    const userCreate = new User();

    Object.assign(userCreate, user_decoded);

    userCreate.save();

  }

  async login(email, password) {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });
      if (!user) throw new Error(`Email does not exists!!!`);

      const isMatch = await bcrypt.compareSync(password, user.password);

      if (!isMatch) throw new Error(`Password or Email isn't correct!!!`);

      const refresh_token = generateRefreshToken({ sub: user.id });

      return refresh_token;

    } catch (error) {
      return error;
    }
  }

  async getAccessToken(refresh_token) {
    try {

      let access_token = '';

      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {

        if (err) throw new Error("Please Login now!");
        console.log(user);
        access_token = generateAccessToken({ sub: user.id });

      });

      return access_token;

    } catch (error) {

      return error;

    }
  }

  async forgotPassword(email) {
    try {
      const user = await this.userRepository.findOne({ where: { email: email } });

      if (!user) throw new Error(`This email ${email} does not exist!!!`);

      const access_token = generateAccessToken({ user });

      const url = `${process.env.BASE_URL}/reset/${access_token}`

      console.log(access_token);

      sendEmail(email, url, 'Reset your password')

    } catch (error) {

      throw new Error(error);

    }
  }

  async resetPassword(password, id) {
    try {
      const passwordhash = await bcrypt.hashSync(password, 8);

      // const user_decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
      // console.log(user_decoded);

      const user = await this.userRepository.findOne({ where: { id: id } });

      user.password = passwordhash;

      user.save();

    } catch (error) {
      throw new Error(error);
    }
  }


}
