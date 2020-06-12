import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem } from 'src/app/interfaces/task-item';
import { TasksService } from '../../../services/tasks.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() task: TaskItem;

  @Output() deleteTask: EventEmitter<TaskItem> = new EventEmitter();

  constructor(private taskService: TasksService) {}

  ngOnInit(): void {}

  setClasses(t: TaskItem) {
    let classes = {
      isComplete: t.isComplete,
    };
    return classes;
  }
  onDelete(t: TaskItem) {
    this.deleteTask.emit(t);
  }
  undo(t: TaskItem) {
    this.taskService.completeTask(t);
  }
  markComplete(t: TaskItem) {
    this.taskService.completeTask(t);
  }

  collapse(task: TaskItem) {
    this.task.isCollapsed = !this.task.isCollapsed;
  }
}
