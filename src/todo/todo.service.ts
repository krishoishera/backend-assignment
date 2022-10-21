import { Injectable } from '@nestjs/common';
import {Todo, TodoDocument, TodoStatus} from "./todo.schema";
import * as uuid from 'uuid';
import {CreateTodoDto} from "./dtos/create-todo.dto";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

    async GetAllTodos(): Promise<Todo[]> {
        return await this.todoModel.find().populate('user_id').exec();
    }

    async GetTodoById(id): Promise<Todo> {
        return await this.todoModel.findById(id).populate('user_id').exec();
    }

    async CreateTodo(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new this.todoModel({...createTodoDto, status: TodoStatus.Pending});
        return todo.save();
    }

    async DeleteTodoById(id): Promise<void> {
        await this.todoModel.findByIdAndDelete(id).exec();
    }

    async UpdateTodoById(id, status: TodoStatus): Promise<Todo> {
        return await this.todoModel.findByIdAndUpdate(id, {status}, {new: true}).exec();
    }
}


