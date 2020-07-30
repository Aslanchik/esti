import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

import { HistoryService } from '../../services/history.service';
import { HistoryPatient } from '../../interfaces/history-patient';
import { PatientService } from '../../../main/services/patient.service';
import { SwalService } from 'src/app/utils/swal.service';

@Component({
  selector: 'app-history-edit-visit',
  templateUrl: './history-edit-visit.component.html',
  styleUrls: ['./history-edit-visit.component.scss'],
})
export class HistoryEditVisitComponent implements OnInit {
  patient: HistoryPatient;
  fetching: boolean = true;
  state: string;
  isCollapsedTreat: boolean = true;
  isCollapsedNotes: boolean = true;

  constructor(
    private historySer: HistoryService,
    private patientSer: PatientService,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder,
    private swal: SwalService
  ) {}

  // DECLARE REACTIVE FORM GROUP
  editPatientForm = this.fb.group({
    state: ['', Validators.required],
    allergies: ['None', [Validators.required, Validators.maxLength(255)]],
    habits: this.fb.group({
      smoking: [null, Validators.required],
      drinking: [null, Validators.required],
      drugs: [null, Validators.required],
      drugsDescription: ['', Validators.maxLength(255)],
    }),
    reasonOfVisit: ['', [Validators.required, Validators.maxLength(255)]],
    caseStory: [
      '',
      [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(255),
      ],
    ],
    symptoms: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(255)],
    ],
    hasHappenedBefore: this.fb.group({
      hasIt: ['', Validators.required],
      description: [''],
    }),
    history: this.fb.group({
      isThere: ['', Validators.required],
      description: [''],
    }),
    vitals: this.fb.group({
      pulse: [
        '',
        [
          Validators.required,
          Validators.max(200),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
      bp: [
        '',
        [Validators.required, Validators.pattern(`^[0-9]{1,3}\/[0-9]{1,3}$`)],
      ],
      temp: [
        '',
        [
          Validators.required,
          Validators.pattern('^([3-4][0-9]|[3-4][0-9][.][0-9])$'),
        ],
      ],
      weight: [
        '',
        [
          Validators.required,
          Validators.min(0),
          Validators.max(600),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
      bloodSugar: [
        '',
        [
          Validators.required,
          Validators.max(600),
          Validators.min(0),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
      respRate: [
        '',
        [
          Validators.required,
          Validators.max(60),
          Validators.pattern('^(0|[1-9][0-9]*)$'),
        ],
      ],
    }),
    treatmentPlan: this.fb.group({
      diagnosis: ['', [Validators.required, Validators.maxLength(255)]],
      medication: this.fb.array([]),
      tasks: this.fb.group({
        procedures: this.fb.array([]),
        tests: this.fb.array([]),
      }),
      notes: ['', Validators.maxLength(500)],
    }),
  });

  // GETTERS FOR FORM ARRAYS
  get medication(): FormArray {
    return this.editPatientForm.get('treatmentPlan.medication') as FormArray;
  }
  get procedures(): FormArray {
    return this.editPatientForm.get(
      'treatmentPlan.tasks.procedures'
    ) as FormArray;
  }
  get tests(): FormArray {
    return this.editPatientForm.get('treatmentPlan.tasks.tests') as FormArray;
  }
  // METHODS TO MANIPULATE FORM ARRAYS
  addMedication(med = ''): void {
    this.medication.push(new FormControl(med));
  }

  deleteMedication(i): void {
    this.medication.removeAt(i);
  }

  addProcedure(item = ''): void {
    this.procedures.push(this.fb.group({ title: item, isComplete: false }));
  }

  deleteProcedure(i): void {
    this.procedures.removeAt(i);
  }

  addTest(item = ''): void {
    this.tests.push(this.fb.group({ title: item, isComplete: false }));
  }

  deleteTest(i): void {
    this.tests.removeAt(i);
  }

  // SUBMIT EDITTED VISIT

  onSubmit(value, patient): void {
    if (this.editPatientForm.valid) {
      const {
        currentPatient: { govId },
        currentVisit: { _id },
      } = patient;
      const visitToEdit = {
        govId: govId,
        visitId: _id,
        medical: value,
      };
      this.patientSer.editVisit(visitToEdit);
    }
  }
  // SET CLASSES TO THE STATE FIELD
  setStateClass(patient) {
    const { state } = patient.currentVisit.medical[0];
    if (state === 'active') return { active: true };
    else if (state === 'critical') return { critical: true };
    else return { discharged: true };
  }
  // METHODS WHEN DISCHARGING
  dischargePatient(patient) {
    const {
      currentPatient: { fname, lname },
    } = patient;
    Swal.fire({
      icon: 'warning',
      title: `Discharge Patient`,
      text: `Are you sure you want to discharge ${fname} ${lname}?`,
      confirmButtonText: `Yes, Discharge ${fname}`,
      confirmButtonColor: '#57a773',
      showCancelButton: true,
      cancelButtonColor: '#de5468',
    }).then((result) => {
      if (result.value) {
        const state = 'discharged';
        const stateData = this.mapForStateChange(patient.currentPatient, state);
        this.handleDischarge(stateData);
      }
    });
  }

  mapForStateChange(patient, state) {
    return {
      govId: patient.govId,
      visitId: patient.visit[0]._id,
      newState: state,
    };
  }

  handleDischarge(stateData) {
    this.patientSer.changeVisitState(stateData).subscribe(() => {
      this.swal.successSwal('Patient Successfully Discharged!');
    });
  }

  //METHODS FOR DELETING VISIT
  deleteVisit(patient) {
    Swal.fire({
      icon: 'warning',
      title: `Delete This Visit?`,
      text: `Are you sure you would like to delete this visit?`,
      confirmButtonText: `Delete Visit`,
      confirmButtonColor: '#57a773',
      showCancelButton: true,
      cancelButtonColor: '#de5468',
    }).then((result) => {
      if (result.value) {
        const {
          currentPatient: { govId },
          currentVisit: { _id },
        } = patient;
        const visitToDelete = {
          govId: govId,
          visitId: _id,
        };
        this.handleDelete(visitToDelete);
      }
    });
  }

  handleDelete(visit) {
    this.patientSer.deleteVisit(visit).subscribe(() => {
      this.swal.successSwal('Visit Deleted Successfully!');
    });
  }

  // GET VISIT THAT WAS SELECTED
  getPatient() {
    this.patient = this.historySer.getCurrentPatientVisit();
    if (!this.patient) {
      this.router.navigate(['/main']);
    }
    this.assignDefaultValues(this.patient);
    this.fetching = !this.fetching;
  }
  // ASSIGN DEFAULT VALUES BASED ON THE PATIENTS INFO - REACTIVE FORM
  assignDefaultValues(patient) {
    const {
      currentVisit: {
        medical: [
          {
            state,
            allergies,
            habits: [{ smoking, drinking, drugs, drugsDescription }],
            reasonOfVisit,
            caseStory,
            symptoms,
            hasHappenedBefore: [{ hasIt, description: beforeDesc }],
            history: [{ isThere, description: historyDesc }],
            vitals: [{ pulse, bp, temp, bloodSugar, respRate, weight }],
            treatmentPlan: [
              {
                diagnosis,
                medication,
                tasks: [{ procedures, tests }],
                notes,
              },
            ],
          },
        ],
      },
    } = patient;
    // SET DEFAULT MEDICATION FORM ARRAY
    medication.map((med) => this.addMedication(med));
    // SET DEFAULT PROCEDURES FORM ARRAY
    procedures.map((procedure) => {
      this.addProcedure(procedure.title);
    });
    // SET DEFAULT TESTS FORM ARRAY
    tests.map((test) => {
      this.addTest(test.title);
    });
    // SET DEFAULT REST
    this.editPatientForm.patchValue({
      state: state,
      allergies: allergies,
      habits: {
        smoking: smoking,
        drinking: drinking,
        drugs: drugs,
        drugsDescription: drugsDescription,
      },
      reasonOfVisit: reasonOfVisit,
      caseStory: caseStory,
      symptoms: symptoms,
      hasHappenedBefore: { hasIt: hasIt, description: beforeDesc },
      history: { isThere: isThere, description: historyDesc },
      vitals: {
        pulse: pulse,
        bp: bp,
        temp: temp,
        bloodSugar: bloodSugar,
        respRate: respRate,
        weight: weight,
      },
      treatmentPlan: {
        diagnosis: diagnosis,
        medication: medication,
        notes: notes,
      },
    });
  }
  // GO BACK A PAGE
  goBack() {
    this._location.back();
  }

  ngOnInit(): void {
    this.getPatient();
  }
}
