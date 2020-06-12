import { Component, OnInit } from '@angular/core';
import { TaskItem } from '../../../../interfaces/task-item';
import { TasksService } from '../../services/tasks.service';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent implements OnInit {
  tasks: TaskItem[];

  constructor(private taskService: TasksService) {
    this.tasks = taskService.getTasks();
  }

  ngOnInit(): void {}

  deleteTask(task: TaskItem) {
    this.tasks = this.tasks.filter((t) => t.patientId !== task.patientId);
  }
}
