import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TaskItem } from '../../../interfaces/taskItem';
import { PatientService } from '../../../services/patient.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() tasks: TaskItem[];
  @Output() deleteTask = new EventEmitter<TaskItem>();
  fetching: boolean = false;
  constructor(private patientSer: PatientService) {}
  // GET THIS TO WORK DUM DUM
  ngOnInit(): void {}

  setClasses(t: TaskItem) {
    let classes = {
      isComplete: t.task.isComplete,
    };
    return classes;
  }

  onDelete(t: TaskItem) {
    this.deleteTask.emit(t);
  }

  undo(t: TaskItem) {
    t.task.isComplete = !t.task.isComplete;
    this.patientSer.completeTask(t);
  }

  markComplete(t: TaskItem) {
    t.task.isComplete = !t.task.isComplete;
    this.patientSer.completeTask(t);
  }

  collapse(task: TaskItem) {
    task.isCollapsed = !task.isCollapsed;
  }
}
