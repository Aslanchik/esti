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
  private _addPatientUrl: string = '/api/new-patient';
  private _getActivePatientsUrl: string = '/api/patients/active';
  private _updateCompleteTaskUrl: string = '/api/patients/updateCompletedTask';
  private _updateStateUrl: string = '/api/patients/updateState';
  private _editVisitUrl: string = '/api/patients/editVisit';
  private _deleteUrl: string = '/api/patients/delete';

  constructor(private http: HttpClient, private swal: SwalService) {}

  // ADMIT NEW PATIENT INTO THE SYSTEM
  addNewPatient(value) {
    const patient: Patient = value;
    this.http.post(this._addPatientUrl, patient).subscribe((resp) => {
      this.swal.successSwal('New Patient Admitted Successfully!');
    });
  }
  // EDIT A CERTAIN VISIT
  editVisit(data) {
    this.http.patch(this._editVisitUrl, data).subscribe((resp) => {
      this.swal.successSwal('Changes Saved Successfully!');
    });
  }
  // EDIT AN ACTIVE PATIENTS STATE
  changeVisitState(stateData) {
    return this.http.patch(this._updateStateUrl, stateData);
  }
  // DELETE VISIT/PATIENT IF NO VISITS
  deleteVisit(visit) {
    return this.http.post(this._deleteUrl, visit);
  }
  // GET ALL PATIENTS THAT HAVE A VISIT THAT IS EITHER ACTIVE OR CRITICAL
  getActivePatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(this._getActivePatientsUrl);
  }

  // GET ALL TASKS THAT ARE NOT COMPLETE
  renderExistingTasks(patients: Patient[]) {
    const existingTasks: TaskItem[] = [];
    // LOOP THROUGH TASKS
    for (const patient of patients) {
      const { notes } = patient.visit[0].medical[0].treatmentPlan[0];
      // MAKE AN EXISTING TASKS ARRAY CONSISTING OF ALL PROCEDURES AND TESTS
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
    // RETURN ARRAY OF ALL NON COMPLETED TASKS WITH TYPES FOR RENDER
    return existingTasks;
  }
  // SEND TO SERVER THAT A TASK IS DONE
  completeTask(t: TaskItem) {
    this.http.patch(this._updateCompleteTaskUrl, t).subscribe();
  }
}
