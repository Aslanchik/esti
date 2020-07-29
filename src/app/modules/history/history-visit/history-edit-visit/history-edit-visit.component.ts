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

  constructor(
    private historySer: HistoryService,
    private patientSer: PatientService,
    private _location: Location,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

  addMedication(): void {
    this.medication.push(new FormControl());
  }

  deleteMedication(i): void {
    this.medication.removeAt(i);
  }

  addProcedure(): void {
    this.procedures.push(this.fb.group({ title: '', isComplete: false }));
  }

  deleteProcedure(i): void {
    this.procedures.removeAt(i);
  }

  addTest(): void {
    this.tests.push(this.fb.group({ title: '', isComplete: false }));
  }

  deleteTest(i): void {
    this.tests.removeAt(i);
  }

  onSubmit(value): void {
    if (this.editPatientForm.valid) {
      this.patientSer.editVisit(value);
    }
  }

  setStateClass(patient) {
    const { state } = patient.currentVisit.medical[0];
    if (state === 'active') return { active: true };
    else if (state === 'critical') return { critical: true };
    else return { discharged: true };
  }

  handleStateChange(stateData) {
    this.patientSer.changeVisitState(stateData).subscribe(() => {
      let timerInterval;
      Swal.fire({
        title: 'State Successfully Changed!',
        icon: 'success',
        html: 'I will automatically close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector('b');
              if (b) {
                b.innerHTML = Swal.getTimerLeft().toString();
              }
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      });
      window.location.replace('/main');
    });
  }

  handleDelete(visit) {
    this.patientSer.deleteVisit(visit).subscribe(() => {
      let timerInterval;
      Swal.fire({
        title: 'Visit Successfully Deleted!',
        icon: 'success',
        html: 'I will automatically close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector('b');
              if (b) {
                b.innerHTML = Swal.getTimerLeft().toString();
              }
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      });
      window.location.replace('/main');
    });
  }

  async changeState() {
    const { value: state } = await Swal.fire({
      title: 'Change Patient State',
      input: 'select',
      inputOptions: {
        active: 'Active',
        critical: 'Critical',
        discharged: 'Discharged',
      },
      inputValidator: (state) => {
        if (!state) {
          return 'You have to choose something!';
        }
      },
      inputPlaceholder: 'States',
      confirmButtonText: `Confirm`,
      confirmButtonColor: '#57a773',
      showCancelButton: true,
      cancelButtonColor: '#de5468',
    });

    if (state) {
      Swal.fire({
        title: `Confirm State Change`,
        text: `Are you sure you want to update the patient's state to be ${state}?`,
        icon: 'warning',
        confirmButtonText: `Confirm`,
        confirmButtonColor: '#57a773',
        showCancelButton: true,
        cancelButtonColor: '#de5468',
      }).then((result) => {
        if (result.value) {
          const stateData = this.mapForStateChange(
            this.patient.currentPatient,
            state
          );
          this.handleStateChange(stateData);
        }
      });
    }
  }

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
        this.handleStateChange(stateData);
      }
    });
  }

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

  mapForStateChange(patient, state) {
    return {
      govId: patient.govId,
      visitId: patient.visit[0]._id,
      newState: state,
    };
  }

  getPatient() {
    this.patient = this.historySer.getCurrentPatientVisit();
    if (!this.patient) {
      this.router.navigate(['/main']);
    }
    this.assignDefaultValues(this.patient);
    this.fetching = !this.fetching;
  }

  assignDefaultValues(patient) {
    console.log(patient);
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
        tasks: { procedures: procedures, tests: tests },
        notes: notes,
      },
    });
  }

  goBack() {
    this._location.back();
  }
  ngOnInit(): void {
    this.getPatient();
  }
}
