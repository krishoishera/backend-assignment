import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import { TodoService } from './todo.service';
import {Todo, TodoStatus} from "./todo.schema";
import {CreateTodoDto} from "./dtos/create-todo.dto";
import * as Path from "path";
import {
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse, ApiNotFoundResponse,
  ApiOkResponse, ApiParam, ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@ApiTags('Todo')
@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @ApiOkResponse({ description: 'The Data were returned successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    async GetAllTodos(): Promise<Todo[]> {
        return await this.todoService.GetAllTodos();
    }

  @Get('/:id')
  @ApiOkResponse({ description: 'The Data were returned successfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiParam({ name: 'id' })
    async GetTodoById(@Param('id') id: string): Promise<Todo> {
      return await this.todoService.GetTodoById(id);
    }

  @Post()
  @ApiCreatedResponse({ description: 'Created Succesfully' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
    async CreateTodo(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
      return this.todoService.CreateTodo(createTodoDto);
    }

  @Delete('/:id')
  @ApiOkResponse({ description: 'The Data was deleted successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
    async DeleteTodoById(@Param('id') id: string): Promise<void> {
      await this.todoService.DeleteTodoById(id);
    }

  @Patch('/:id/status')
  @ApiOkResponse({ description: 'The Data was updated successfully' })
  @ApiNotFoundResponse({ description: 'Data not found' })
  @ApiUnprocessableEntityResponse({ description: 'Bad Request' })
  @ApiParam({ name: 'id' })
  @ApiBody({type: String, description: 'The new task description', enum: ['Pending', 'InProgress', 'Completed'], schema: {example: {"status": "InProgress"}}})
    async UpdateTodoById(@Param('id') id: string, @Body('status') status: TodoStatus): Promise<Todo> {
      return await this.todoService.UpdateTodoById(id, status);
    }

}
