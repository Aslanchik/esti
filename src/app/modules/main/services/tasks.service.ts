import { Injectable } from '@angular/core';
import { TaskItem } from 'src/app/interfaces/task-item';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private tasks: TaskItem[] = [
    {
      patientId: '123456789',
      patientName: 'Dylan Moore',
      title: 'Schedule an MRI',
      description: 'Random description just for show',
      link: '',
      isComplete: false,
      isCollapsed: true,
    },
    {
      patientId: '987654321',
      patientName: 'Bratslan Bratalov',
      title: 'Schedule a Brat Exam',
      description: 'Random sdfawefdescription just for show',
      link: '',
      isComplete: false,
      isCollapsed: true,
    },
  ];

  addTask(task: TaskItem) {
    this.tasks.push(task);
  }

  completeTask(task: TaskItem) {
    task.isComplete = !task.isComplete;
  }

  deleteTask(task: TaskItem) {
    this.tasks = this.tasks.filter((t) => t.patientId !== task.patientId);
  }

  getTasks(): TaskItem[] {
    return this.tasks;
  }
}
