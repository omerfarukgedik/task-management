import { TaskStatus } from "./task.model";
import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

export class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus

  @IsOptional()
  @IsString()
  search?: string
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus
}