import { Component, Input } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-plan-form',
  templateUrl: './plan-form.component.html',
  styleUrls: ['./plan-form.component.scss'],
})
export class PlanFormComponent {
  @Input() parentFormGroup: FormGroup;
  constructor(private patientService: PatientService, private router: Router) {}
}
