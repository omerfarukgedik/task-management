import { Body, Controller, Get, Param, Post, Delete, Patch, Query } from '@nestjs/common';
import { CreateTaskDto, GetTasksFilterDto } from './dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) { }

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    // if we have any filters defined, call tasksService.getTasksWithFilters
    if (Object.keys(filterDto).length)
      return this.tasksService.getTasksWithFilters(filterDto)

    // otherwise, just get all tasks
    else
      return this.tasksService.getAllTasks()
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto
  ): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): string {
    return this.tasksService.deleteTaskById(id)
  }

  @Patch('/:id/status')
  updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }
}
