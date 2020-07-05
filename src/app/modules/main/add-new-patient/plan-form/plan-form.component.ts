import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormArray,
  Validators,
  FormBuilder,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  @Output() controlName = new EventEmitter();
  constructor(
    private patientService: PatientService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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

  addMedication() {
    this.medication.push(new FormControl());
    console.log(this.medication);
  }
  deleteMedication(i) {
    this.medication.removeAt(i);
  }

  addProcedure() {
    this.procedures.push(new FormControl());
  }
  deleteProcedure(i) {
    this.procedures.removeAt(i);
  }

  addTest() {
    this.tests.push(new FormControl());
  }
  deleteTest(i) {
    this.tests.removeAt(i);
  }

  ngOnInit() {}
}
