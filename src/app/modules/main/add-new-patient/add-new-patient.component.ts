import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from '../../landing/services/login.service';

import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss'],
})
export class AddNewPatientComponent {
  // DECLARE REACTIVE FORM
  newPatientForm = this.fb.group({
    govId: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(9)],
    ],
    fname: ['', [Validators.required, Validators.minLength(2)]],
    lname: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    birthYear: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
    ],
    phone: [
      '',
      [Validators.required, Validators.minLength(9), Validators.maxLength(10)],
    ],
    address: [
      '',
      [Validators.required, Validators.minLength(2), Validators.maxLength(255)],
    ],
    visit: this.fb.group({
      how: ['', [Validators.required, Validators.minLength(2)]],
      time: ['', Validators.required],
      attendingNurse: [this.loginSer.getCurrentlyLoggedIn()],
      medical: this.fb.group({
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
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(255),
          ],
        ],
        hasHappenedBefore: this.fb.group({
          hasIt: [null, Validators.required],
          description: [''],
        }),
        history: this.fb.group({
          isThere: [null, Validators.required],
          description: [''],
        }),
        vitals: this.fb.group({
          pulse: [
            null,
            [
              Validators.required,
              Validators.max(200),
              Validators.pattern('^(0|[1-9][0-9]*)$'),
            ],
          ],
          bp: [
            '',
            [
              Validators.required,
              Validators.pattern(`^[0-9]{1,3}\/[0-9]{1,3}$`),
            ],
          ],
          temp: [
            null,
            [
              Validators.required,
              Validators.pattern('^([3-4][0-9]|[3-4][0-9][.][0-9])$'),
            ],
          ],
          weight: [
            null,
            [
              Validators.required,
              Validators.min(0),
              Validators.max(600),
              Validators.pattern('^(0|[1-9][0-9]*)$'),
            ],
          ],
          bloodSugar: [
            null,
            [
              Validators.required,
              Validators.max(600),
              Validators.min(0),
              Validators.pattern('^(0|[1-9][0-9]*)$'),
            ],
          ],
          respRate: [
            null,
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
      }),
    }),
  });
  // PROPERTY THAT TRACKS THE PROGRESS ON THE FORM
  progressValue: string = '0';

  // PROPERTY THAT TRACKS WHICH FORM TO SHOW
  state: string = 'general';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginSer: LoginService,
    private patientSer: PatientService
  ) {}

  // UPDATE PROGRESS BAR AS YOU PROGRESS IN THE FORM
  updateProgressBar() {
    if (this.progressValue === '0') this.progressValue = '33';
    else if (this.progressValue === '33') this.progressValue = '66';
    else if (this.progressValue === '66') this.progressValue = '100';
  }
  // MOVE USER TO NEXT FORM
  changeFormStateForward(changedState) {
    if (changedState === 'general') {
      this.state = 'medical';
      this.updateProgressBar();
    } else if (changedState === 'medical') {
      this.state = 'plan';
      this.updateProgressBar();
    }
  }
  // MOVE USER BACKWARDS
  changeFormStateBackward() {
    if (this.state === 'plan') this.state = 'medical';
    else if (this.state === 'medical') this.state = 'general';
    else this.router.navigate(['/main']);
  }
  // BEFORE SUBMITTING MAKE NAME LOWERCASE
  toLowerCaseVal(val) {
    val.fname = val.fname.toLowerCase();
    val.lname = val.lname.toLowerCase();
  }
  // SUBMIT FORM AND CREATE NEW PATIENT
  onSubmit(value): void {
    if (this.newPatientForm.valid) {
      this.updateProgressBar();
      this.toLowerCaseVal(value);
      this.patientSer.addNewPatient(value);
    }
  }
}
