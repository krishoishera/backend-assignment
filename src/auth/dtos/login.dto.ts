// User login dto
// Compare this snippet from src\auth\dtos\login.dto.ts:
// import {IsEmail, IsNotEmpty, IsString} from "class-validator";
//
import {ApiProperty} from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    email: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    password: string;
}