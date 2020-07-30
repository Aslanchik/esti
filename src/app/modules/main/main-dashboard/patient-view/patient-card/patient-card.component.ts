import { Component, Input, OnChanges } from '@angular/core';
import { Patient } from '../../../interfaces/patient';
import { PatientService } from '../../../services/patient.service';
import { HistoryService } from 'src/app/modules/history/services/history.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SwalService } from 'src/app/utils/swal.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.scss'],
})
export class PatientCardComponent implements OnChanges {
  @Input() activePatients: Patient[];
  @Input() searchText: string;
  @Input() sortParam: string;

  fetching: boolean = true;
  patients: Patient[] = [];

  constructor(
    private patientService: PatientService,
    private historyService: HistoryService,
    private router: Router,
    private swal: SwalService
  ) {}

  // GIVE CLASSES BY STATES
  setPatientClass(p: Patient) {
    if (p.visit[0].medical[0].state === 'active') {
      let state = {
        patientActive: true,
      };
      return state;
    } else if (p.visit[0].medical[0].state === 'critical') {
      let state = {
        patientCritical: true,
      };
      return state;
    } else if (p.visit[0].medical[0].state === 'discharged') {
      let state = {
        patientDischarged: true,
      };
      return state;
    } else {
      return false;
    }
  }

  // WHEN THIS COMPONENT GETS INPUT RENDER THE PATIENTS
  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }
  // CHANGE PATIENT STATE TO ACTIVE || CRITICAL || DISCHARGED METHODS
  async changeState(p: Patient) {
    const { value: state } = await Swal.fire({
      title: 'Change Patient State',
      input: 'select',
      inputOptions: {
        active: 'Active',
        critical: 'Critical',
        discharged: 'Discharged',
      },
      inputValidator: (state) => {
        if (!state) {
          return 'You have to choose something!';
        }
      },
      inputPlaceholder: 'States',
      confirmButtonText: `Confirm`,
      confirmButtonColor: '#57a773',
      showCancelButton: true,
      cancelButtonColor: '#de5468',
    });

    if (state) {
      Swal.fire({
        title: `Confirm State Change`,
        text: `Are you sure you want to update the patient's state to be ${state}?`,
        icon: 'warning',
        confirmButtonText: `Confirm`,
        confirmButtonColor: '#57a773',
        showCancelButton: true,
        cancelButtonColor: '#de5468',
      }).then((result) => {
        if (result.value) {
          const stateData = this.mapForStateChange(p, state);
          this.handleStateChange(stateData);
          this.swal.successToast(`State Changed Successfully!`);
        }
      });
    }
  }

  handleStateChange(stateData) {
    this.patientService.changeVisitState(stateData).subscribe(() => {
      window.location.replace('/main');
    });
  }

  mapForStateChange(patient, state) {
    return {
      govId: patient.govId,
      visitId: patient.visit[0]._id,
      newState: state,
    };
  }

  // METHOD TO DECLARE HISTORY PATIENT TO VIEW
  viewVisit(p: Patient) {
    const patientData = {
      currentPatient: p,
      currentVisit: p.visit[0],
    };
    this.historyService.declareCurrentPatientVisit(patientData);
    this.router.navigate(['/history/visit']);
  }
  // RENDER THE PATIENTS BASED ON INPUT
  renderActivePatients(): void {
    if (this.patients.length !== this.activePatients.length) {
      this.fetching = !this.fetching;
    }
    this.patients = this.activePatients;
  }
}
