import { Component, OnInit, Input, OnChanges } from '@angular/core';
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
export class PatientCardComponent implements OnInit, OnChanges {
  patients: Patient[] = [];
  @Input() activePatients: Patient[];
  @Input() searchText: string;
  @Input() sortParam: string;
  fetching: boolean = true;

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

  constructor(
    private patientService: PatientService,
    private historyService: HistoryService,
    private router: Router,
    private swal: SwalService
  ) {}

  ngOnInit(): void {}

  ngOnChanges() {
    if (this.activePatients) {
      this.renderActivePatients();
    }
  }

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

  viewVisit(p: Patient) {
    const patientData = {
      currentPatient: p,
      currentVisit: p.visit[0],
    };
    this.historyService.declareCurrentPatientVisit(patientData);
  }

  renderActivePatients(): void {
    if (this.patients.length !== this.activePatients.length) {
      this.fetching = !this.fetching;
    }
    this.patients = this.activePatients;
  }
}
