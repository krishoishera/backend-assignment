import {Body, Controller, Get, Post, UnauthorizedException} from '@nestjs/common';
import {User} from "./user.schema";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dtos/login.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async SignUp(@Body() user: User): Promise<User> {
        return await this.authService.signUp(user);
    }

    @Post('/signin')
    async SignIn(@Body() loginDto: LoginDto): Promise<{accessToken: string}> {
        const token = await this.authService.validateUser(loginDto);

        if (!token) {
            throw new UnauthorizedException('Invalid credentials');
        } else {
            return token;
        }


    }
}
