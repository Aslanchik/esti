import { Component } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MedicalForm } from 'src/app/interfaces/medical-form';

@Component({
  selector: 'app-medical-form',
  templateUrl: './medical-form.component.html',
  styleUrls: ['./medical-form.component.scss'],
})
export class MedicalFormComponent {
  constructor(private patientService: PatientService, private router: Router) {}
  isCollapsed = true;
  form = {
    visit: {
      state: '',
      allergies: '',
      habits: {
        smoking: false,
        drinking: false,
        drugs: false,
        whichDrugs: '',
        vegan: false,
      },
      reasonOfVisit: '',
      caseStory: '',
      symptoms: '',
      hasHappenedBefore: { hasIt: false, description: '' },
      familyHistory: { isThere: false, description: '' },
      vitals: {
        pulse: '',
        bp: '',
        temp: '',
        weight: '',
        bloodSugar: '',
        respRate: '',
      },
    },
  };

  onSubmit(MedicalForm) {}
}
