import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Patient } from '../interfaces/patient';
import { TaskItem } from '../interfaces/taskItem';
import { SwalService } from 'src/app/utils/swal.service';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  private _addPatientUrl: string = 'http://localhost:3000/api/new-patient';
  private _getActivePatientsUrl: string =
    'http://localhost:3000/api/patients/active';
  private _updateCompleteTaskUrl: string =
    'http://localhost:3000/api/patients/updateCompletedTask';
  private _updateStateUrl: string =
    'http://localhost:3000/api/patients/updateState';
  private _deleteUrl: string = 'http://localhost:3000/api/patients/delete';

  private message: {};

  constructor(private http: HttpClient, private swal: SwalService) {}

  addNewPatient(value) {
    const patient: Patient = value;
    this.http.post(this._addPatientUrl, patient).subscribe((response) => {
      this.swal.successSwal('New Patient Admitted Successfully!');
    });
  }

  editVisit(data) {
    this.http.post(this._editVisitUrl, data).subscribe((resp) => {
      this.swal.successSwal('Changes Saved Successfully!');
    });
  }

  changeVisitState(stateData) {
    return this.http.patch(this._updateStateUrl, stateData);
  }

  deleteVisit(visit) {
    return this.http.post(this._deleteUrl, visit);
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

    return existingTasks;
  }

  completeTask(t: TaskItem) {
    this.http.patch(this._updateCompleteTaskUrl, t).subscribe();
  }
}
