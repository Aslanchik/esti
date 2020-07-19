import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TaskItem } from '../../../interfaces/taskItem';
import { PatientService } from '../../../services/patient.service';
import { SwalService } from 'src/app/utils/swal.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
})
export class TaskItemComponent {
  @Input() tasks: TaskItem[];
  @Output() deleteTask = new EventEmitter<TaskItem>();
  fetching: boolean = false;
  constructor(private patientSer: PatientService, private swal: SwalService) {}

  ngOnInit(): void {}

  setClasses(t: TaskItem) {
    let classes = {
      isComplete: t.task.isComplete,
    };
    return classes;
  }

  onDelete(t: TaskItem) {
    this.deleteTask.emit(t);
    this.patientSer.completeTask(t);
    this.swal.successToast(`Task ${t.task.title} Completed!`);
  }

  undo(t: TaskItem) {
    t.task.isComplete = !t.task.isComplete;
    this.patientSer.completeTask(t);
  }

  markComplete(t: TaskItem) {
    t.task.isComplete = !t.task.isComplete;
  }

  collapse(task: TaskItem) {
    task.isCollapsed = !task.isCollapsed;
  }
}
