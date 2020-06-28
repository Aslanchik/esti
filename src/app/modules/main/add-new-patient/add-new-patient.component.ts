import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, MaxLengthValidator } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../landing/services/login.service';
import { Patient } from '../interfaces/patient';
import { PatientService } from '../services/patient.service';

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
          pulse: [null, [Validators.required, Validators.max(300)]],
          bp: ['', [Validators.required, Validators.maxLength(7)]],
          temp: [null, [Validators.required, Validators.max(80)]],
          weight: [null, [Validators.required, Validators.max(600)]],
          bloodSugar: [null, [Validators.required, Validators.max(600)]],
          respRate: [null, [Validators.required, Validators.max(60)]],
        }),
        treatmentPlan: this.fb.group({
          diagnosis: ['', [Validators.required, Validators.maxLength(255)]],
          medication: ['', Validators.maxLength(255)],
          tasks: this.fb.group({
            procedures: ['', Validators.maxLength(255)],
            tests: ['', Validators.maxLength(255)],
          }),
          notes: ['', Validators.maxLength(500)],
        }),
      }),
    }),
  });

  state: string = 'general';

  message: {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginSer: LoginService,
    private patientSer: PatientService
  ) {}

  ngOnInit(): void {}

  changeFormStateForward(changedState) {
    if (changedState === 'general') this.state = 'medical';
    else if (changedState === 'medical') this.state = 'plan';
  }

  changeFormStateBackward() {
    if (this.state === 'plan') this.state = 'medical';
    else if (this.state === 'medical') this.state = 'general';
    else this.router.navigate(['/main']);
  }

  onSubmit(value): void {
    if (this.newPatientForm.valid) {
      this.patientSer.addNewPatient(value);
      this.message = this.patientSer.getMessage();
      this.router.navigate(['/main']);
      /* setTimeout(() => {
        this.router.navigate(['/main']);
      }, 2000); */
    }
  }
}
