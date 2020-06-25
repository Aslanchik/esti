import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent {
  @Input() parentFormGroup: FormGroup;
  @Output() changedState: EventEmitter<string> = new EventEmitter<string>();

  constructor(private patientService: PatientService, private router: Router) {}

  moveForward() {
    this.changedState.emit('general');
  }
}
