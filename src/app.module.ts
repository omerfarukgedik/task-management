import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module';
import { DatabaseModule } from './database.module';

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({}),
    DatabaseModule
  ]
})
export class AppModule { }
