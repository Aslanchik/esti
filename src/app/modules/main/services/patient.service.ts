import { Injectable, TestabilityRegistry } from '@angular/core';
import { Patient } from '../interfaces/patient';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskItem } from '../interfaces/taskItem';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private activePatients: Patient[];
  private allPatients: Patient[];
  private tasks: TaskItem[] = [];

  private _addPatientUrl: string = 'http://localhost:3000/api/new-patient';
  private _getActivePatientsUrl: string =
    'http://localhost:3000/api/patients/active';
  private _updateCompleteTaskUrl: string =
    'http://localhost:3000/api/patients/updateCompletedTask';

  private message: {};

  constructor(private http: HttpClient) {}

  addNewPatient(value) {
    const patient: Patient = value;
    this.http.post(this._addPatientUrl, patient).subscribe((response) => {
      this.message = response;
    });
  }

  fetchActivePatients(): void {
    this.http
      .get<Patient[]>(this._getActivePatientsUrl)
      .subscribe((patientData) => {
        const activePatients = patientData.map((patient) => {
          return {
            ...patient,
            visit: patient.visit.filter(
              (visit) => visit.medical[0].state !== 'discharged'
            ),
          };
        });
        this.activePatients = activePatients;
        this.renderExistingTasks(this.activePatients);
      });
  }

  getActivePatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getActivePatientsUrl);
  }

  getMessage() {
    return this.message;
  }

  renderExistingTasks(patients: Patient[]) {
    const existingTasks: TaskItem[] = [];

    for (const patient of patients) {
      const { notes } = patient.visit[0].medical[0].treatmentPlan[0];

      patient.visit.map((visit) => {
        visit.medical[0].treatmentPlan[0].tasks[0].procedures.map(
          (procedure) => {
            if (procedure.hasOwnProperty('title') && !procedure.isComplete)
              existingTasks.push({
                govId: patient.govId,
                fname: patient.fname,
                lname: patient.lname,
                task: {
                  ...procedure,
                  type: 'procedure',
                },
                attendingNurse: patient.visit[0].attendingNurse,
                notes: notes,
                link: '',
                isCollapsed: true,
              });
          }
        );

        visit.medical[0].treatmentPlan[0].tasks[0].tests.map((test) => {
          if (test.hasOwnProperty('title') && !test.isComplete)
            existingTasks.push({
              govId: patient.govId,
              fname: patient.fname,
              lname: patient.lname,
              task: {
                ...test,
                type: 'test',
              },
              attendingNurse: patient.visit[0].attendingNurse,
              notes: notes,
              link: '',
              isCollapsed: true,
            });
        });
      });
    }

    this.tasks = existingTasks;
    return this.tasks;
  }

  /* createTask(patient, tasksType) {
    const {
      fname,
      govId,
      lname,
      visit: {
        attendingNurse,
        medical: {
          treatmentPlan: { notes },
        },
      },
    } = patient;
    for (let task of tasksType) {
      const taskItem: TaskItem = {
        govId: govId,
        fname: fname,
        lname: lname,
        task: task,
        attendingNurse: attendingNurse,
        notes: notes,
        link: '',
        isCollapsed: true,
      };
      this.tasks.push(taskItem);
    }
  }
  // TODO ---- TASKS
  addTasks(patient): void {
    const { procedures, tests } = patient.visit.medical.treatmentPlan.tasks;
    if (procedures.length) this.createTask(patient, procedures);
    if (tests.length) this.createTask(patient, tests);
  } */

  completeTask(t: TaskItem) {
    this.http.patch(this._updateCompleteTaskUrl, t).subscribe();
  }

  deleteTask(t: TaskItem) {
    this.tasks = this.tasks.filter(
      (task) => task.govId !== t.govId && task.task.title !== t.task.title
    );
  }

  getTasks(): TaskItem[] {
    return this.tasks;
  }
}
