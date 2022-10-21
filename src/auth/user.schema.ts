import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import * as bcrypt from 'bcrypt';
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export type UserDocument = User & Document;

export enum gender {
  'Male' = 'Male',
  'Female' = 'Female',
}

@Schema()
export class User {
    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @Prop({required: true})
    username: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @Prop({required: true, unique: true })
    email: string;

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @Prop({required: true, unique: true })
    phoneNumber: string

    @ApiProperty({
        type: String,
        description: 'This is a required property',
      })
    @Prop({required: true })
    password: string;

    @ApiPropertyOptional({
        type: String,
        description: 'This is not required property',
      })
    @Prop()
    address: string;

    @ApiPropertyOptional({
        type: String,
        description: 'Date format is YYYY-MM-DD',
      })
    @Prop()
    dateOfBirth: Date;
    @Prop()

    @ApiPropertyOptional({
        type: String,
        description: 'Male / Female',
      })
    gender: gender;
    @Prop()

    salt: string;

    validatePassword: Function;
    // async validatePassword(password: string): Promise<boolean> {
    //     const hash = await bcrypt.hash(password, this.salt);
    //     return hash === this.password;
    // }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.methods.validatePassword = async function(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
}

