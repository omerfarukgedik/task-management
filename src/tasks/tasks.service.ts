import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto, GetTasksFilterDto } from './dto';
import { filter } from 'rxjs';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto

    // define a temp array to hold the result
    let result = this.getAllTasks()

    // do something with status
    if (status) {
      result = result.filter(task => task.status === status)
    }

    // do something with search
    if (search) {
      result = result.filter(task => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true
        }

        return false
      })
    }

    // return final result
    return result
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id)
    if (!found) throw new NotFoundException(`Task with ID "${id}" not found`)
    return found
  }

  deleteTaskById(id: string): string {
    const task = this.getTaskById(id)
    this.tasks = this.tasks.filter(task => task.id !== id)
    return `${task.title} deleted successfully`
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id)
    task.status = status
    return task
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN
    }

    this.tasks.push(task)
    return task
  }
}
