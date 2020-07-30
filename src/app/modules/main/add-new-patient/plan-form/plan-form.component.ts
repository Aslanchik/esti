import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent {
  @Input() parentFormGroup: FormGroup;
  @Output() controlName = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  // GETTERS FOR FORM ARRAYS
  get medication(): FormArray {
    return this.parentFormGroup.get(
      'visit.medical.treatmentPlan.medication'
    ) as FormArray;
  }
  get procedures(): FormArray {
    return this.parentFormGroup.get(
      'visit.medical.treatmentPlan.tasks.procedures'
    ) as FormArray;
  }
  get tests(): FormArray {
    return this.parentFormGroup.get(
      'visit.medical.treatmentPlan.tasks.tests'
    ) as FormArray;
  }
  // METHODS TO MANIPULATE FORM ARRAYS
  addMedication() {
    this.medication.push(new FormControl());
  }
  deleteMedication(i) {
    this.medication.removeAt(i);
  }

  addProcedure() {
    this.procedures.push(this.fb.group({ title: '', isComplete: false }));
  }
  deleteProcedure(i) {
    this.procedures.removeAt(i);
  }

  addTest() {
    this.tests.push(this.fb.group({ title: '', isComplete: false }));
  }
  deleteTest(i) {
    this.tests.removeAt(i);
  }
}
