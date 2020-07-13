import { Component, OnChanges, OnInit, Input } from '@angular/core';

import { TaskItem } from '../../interfaces/taskItem';
import { Patient } from '../../interfaces/patient';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent implements OnInit, OnChanges {
  @Input() activePatients: Patient[];
  fetching: boolean = true;
  tasks: TaskItem[] = [];
  constructor(private patientSer: PatientService) {}

  ngOnInit(): void {
    this.getActiveTasks();
  }

  ngOnChanges() {
    if (this.activePatients) {
      this.getActiveTasks();
    }
  }

  getActiveTasks() {
    this.tasks = this.patientSer.renderExistingTasks(this.activePatients);
    this.fetching = !this.fetching;
  }

  deleteTask(task: TaskItem) {
    this.tasks = this.tasks.filter((t) => t.task.title !== task.task.title);
  }
}
