import {ApiProperty} from "@nestjs/swagger";

export class CreateTodoDto {
    @ApiProperty({type: String})
    user_id: string;

    @ApiProperty({type: String})
    todo_item: string;
}