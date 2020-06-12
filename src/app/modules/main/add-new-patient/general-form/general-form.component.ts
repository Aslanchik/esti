import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Patient } from '../../../../interfaces/patient';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-general-form',
  templateUrl: './general-form.component.html',
  styleUrls: ['./general-form.component.scss'],
})
export class GeneralFormComponent {
  constructor(private patientService: PatientService, private router: Router) {}
  form = {
    id: '',
    fname: '',
    lname: '',
    age: null,
    phone: '',
    email: '',
    address: '',
    visit: {
      admissionTime: '',
      wayOfAdmission: '',
    },
  };

  resetForm(form: NgForm) {
    form.reset({
      id: '',
      fname: '',
      lname: '',
      age: null,
      phone: '',
      email: '',
      address: '',
    });
  }

  onSubmit() {}
}
