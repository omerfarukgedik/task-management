import { TaskStatus } from "./task.model";

export class CreateTaskDto {
  title: string
  description: string
}

export class GetTasksFilterDto {
  status?: TaskStatus
  search?: string
}