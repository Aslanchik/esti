import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    address: ['', [Validators.required, Validators.minLength(2)]],
    visit: this.fb.group({
      how: ['', [Validators.required, Validators.minLength(2)]],
      time: ['', Validators.required],
      medical: this.fb.group({
        state: ['', Validators.required],
        allergies: ['', Validators.required],
        habits: this.fb.group({
          smoking: [null, Validators.required],
          drinking: [null, Validators.required],
          drugs: [null, Validators.required],
          drugsDescription: [''],
        }),
        reasonOfVisit: ['', Validators.required],
        caseStory: ['', Validators.required],
        symptoms: ['', Validators.required],
        hasHappenedBefore: this.fb.group({
          hasIt: [null, Validators.required],
          description: [''],
        }),
        history: this.fb.group({
          isThere: [null, Validators.required],
          description: [''],
        }),
        vitals: this.fb.group({
          pulse: [null, Validators.required],
          bp: [null, Validators.required],
          temp: [null, Validators.required],
          weight: [null, Validators.required],
          bloodSugar: [null, Validators.required],
          respRate: [null, Validators.required],
        }),
        treatmentPlan: this.fb.group({
          diagnosis: ['', Validators.required],
          medication: ['', Validators.required],
          tasks: this.fb.group({
            procedures: ['', Validators.required],
            tests: ['', Validators.required],
          }),
          notes: [''],
        }),
      }),
    }),
  });

  state: string = 'general';

  constructor(private fb: FormBuilder, private router: Router) {}

  changeFormStateForward(changedState) {
    if (changedState === 'general') this.state = 'medical';
    else if (changedState === 'medical') this.state = 'plan';
  }

  changeFormStateBackward() {
    if (this.state === 'plan') this.state = 'medical';
    else if (this.state === 'medical') this.state = 'general';
    else this.router.navigate(['/main']);
  }
  ngOnInit(): void {}

  onSubmit() {
    console.log(this.newPatientForm.value);
  }
}
