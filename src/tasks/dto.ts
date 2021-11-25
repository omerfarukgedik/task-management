import { TaskStatus } from "./task.model";
import { IsNotEmpty, isNotEmpty } from "class-validator";

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