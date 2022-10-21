import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
  imports: [TodoModule, AuthModule, MongooseModule.forRoot('mongodb+srv://j43fer:rjSJHWBZg4vYN3gk@cluster0.gjeh6y4.mongodb.net/?retryWrites=true&w=majority')],
  controllers: [],
  providers: [],
})
export class AppModule {}
