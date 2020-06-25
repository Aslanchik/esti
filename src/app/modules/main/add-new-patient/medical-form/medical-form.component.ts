import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.scss'],
})
export class MedicalFormComponent {
  @Input() parentFormGroup: FormGroup;
  @Output() changedState: EventEmitter<string> = new EventEmitter<string>();

  constructor(private patientService: PatientService, private router: Router) {}
  isCollapsed = true;

  moveForward() {
    this.changedState.emit('medical');
  }
}
