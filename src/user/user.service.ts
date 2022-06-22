import { Inject, Injectable } from "@nestjs/common";
import { User } from "src/models/user.model";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @Inject("USER_REPOSITORY")
    private userRepository: typeof User
  ) {}

  async getAllUser(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }

  async createUser(user: User) {
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

    await userCreate.save();
  }
}
