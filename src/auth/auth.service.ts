import {ConflictException, Injectable, InternalServerErrorException} from '@nestjs/common';
import {User, UserDocument} from "./user.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {LoginDto} from "./dtos/login.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";
import {JwtPayload} from "./jwt-payload.interface";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name)
                private userModel: Model<UserDocument>,
                private jwtService: JwtService) {}

    async signUp(user: User): Promise<User> {
        const newUser = new this.userModel(user);

        newUser.salt = await bcrypt.genSalt();
        newUser.password = await this.hashPassword(newUser.password, newUser.salt);

        try {
            return await newUser.save();
        } catch (e) {
            if (e.code === 11000) {
                throw new ConflictException('Email / Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async validateUser(loginDto: LoginDto): Promise<{ accessToken: string }> {
        const {email, password} = loginDto;
        const user = await this.userModel.findOne({email}).exec();


        if (user && await user.validatePassword(password)) {
            const payload: JwtPayload = {username: user.username};
            const accessToken = this.jwtService.sign(payload);
            return {accessToken};
        } else {
            return null;
        }


    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

}
