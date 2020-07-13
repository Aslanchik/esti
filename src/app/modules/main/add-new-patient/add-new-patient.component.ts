import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../landing/services/login.service';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-add-new-patient',
  templateUrl: './add-new-patient.component.html',
  styleUrls: ['./add-new-patient.component.scss'],
})
export class AddNewPatientComponent implements OnInit {
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
        allergies: ['', [Validators.required, Validators.maxLength(255)]],
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

  progressValue: string = '0';
  state: string = 'general';

  message: {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginSer: LoginService,
    private patientSer: PatientService
  ) {}

  ngOnInit(): void {}

  onValidForm(): void {
    this.newPatientForm.valueChanges.subscribe((item) => {
      this.updateProgressBar();
    });
  }

  updateProgressBar() {
    if (this.progressValue === '0') this.progressValue = '33';
    else if (this.progressValue === '33') this.progressValue = '66';
    else if (this.progressValue === '66') this.progressValue = '100';
  }

  changeFormStateForward(changedState) {
    if (changedState === 'general') {
      this.state = 'medical';
      this.updateProgressBar();
    } else if (changedState === 'medical') {
      this.state = 'plan';
      this.updateProgressBar();
    }
  }

  changeFormStateBackward() {
    if (this.state === 'plan') this.state = 'medical';
    else if (this.state === 'medical') this.state = 'general';
    else this.router.navigate(['/main']);
  }

  toLowerCaseVal(val) {
    val.fname = val.fname.toLowerCase();
    val.lname = val.lname.toLowerCase();
  }

  onSubmit(value): void {
    if (this.newPatientForm.valid) {
      this.toLowerCaseVal(value);
      this.patientSer.addNewPatient(value);
      this.message = this.patientSer.getMessage();
    }
  }
}
