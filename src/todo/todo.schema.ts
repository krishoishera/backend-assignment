import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document} from "mongoose";
import {ApiProperty} from "@nestjs/swagger";
import * as mongoose from "mongoose";
import {User} from "../auth/user.schema";

export type TodoDocument = Todo & Document;

export enum TodoStatus {
  'Pending' = 'Pending',
  'InProgress' = 'InProgress',
  'Completed' = 'Completed',
}

@Schema()
export class Todo {
    @Prop()
    id: number;

    @ApiProperty({
        type: Number,
        description: 'The id of the user who created the todo',
      })
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user_id: User;

    @ApiProperty({
        type: String,
        description: 'Task description',
      })
    @Prop()
    todo_item: string;

    @ApiProperty({ enum: ['Pending', 'InProgress', 'Completed']})
    @Prop()
    status: TodoStatus;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);