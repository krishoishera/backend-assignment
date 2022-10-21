import { Module } from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {User, UserSchema} from "./user.schema";
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";



@Module({
  imports: [
      PassportModule.register({defaultStrategy: 'jwt'}),
      JwtModule.register({
            secret: 'secretNoOneCanGuess',
            signOptions: {
                expiresIn: 86400,
            }
      }),
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
