import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent {
  constructor(private patientService: PatientService, private router: Router) {}
  form = {
    diagnosis: '',
    treatment: { medication: '', painkillers: '' },
    tasks: { tests: '', procedures: '' },
    notes: '',
  };

  onSubmit(planForm) {}
}
