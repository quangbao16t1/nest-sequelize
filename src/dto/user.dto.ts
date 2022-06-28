import { IsEmail } from "class-validator"

export class CreateUserDto {
    firstName: string
    lastName: string
    gender: string;
    age: number;
    @IsEmail()
    email: string
    phoneNumber: string
    password: string
    createdAt: Date
}