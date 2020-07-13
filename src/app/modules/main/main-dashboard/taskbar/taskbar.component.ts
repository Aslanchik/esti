import { Component, OnInit } from '@angular/core';

import { TaskItem } from '../../interfaces/taskItem';
import { PatientService } from '../../services/patient.service';
@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss'],
})
export class TaskbarComponent implements OnInit {
  tasks: TaskItem[] = [];
  fetching: boolean = true;
  constructor(private patientSer: PatientService) {}

  ngOnInit(): void {
    this.getActiveTasks();
  }

  getActiveTasks() {
    this.patientSer.getActivePatients().subscribe((patientData) => {
      this.tasks = [];
      const activePatients = patientData.map((patient) => {
        return {
          ...patient,
          visit: patient.visit.filter(
            (visit) => visit.medical[0].state !== 'discharged'
          ),
        };
      });
      this.tasks = this.patientSer.renderExistingTasks(activePatients);
      this.fetching = !this.fetching;
    });
  }

  deleteTask(task: TaskItem) {
    this.tasks = this.tasks.filter((t) => t.task.title !== task.task.title);
  }
}
