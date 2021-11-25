import { TaskStatus } from "./task.model";
import { IsEnum, IsNotEmpty } from "class-validator";

export class CreateTaskDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  description: string
}

export class GetTasksFilterDto {
  status?: TaskStatus
  search?: string
}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus
}