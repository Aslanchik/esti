import { Component, OnInit } from '@angular/core';
import { Location, TitleCasePipe } from '@angular/common';
import Swal from 'sweetalert2';

import { HistoryService } from '../services/history.service';
import { HistoryPatient } from '../interfaces/history-patient';
import { PatientService } from '../../main/services/patient.service';

@Component({
  selector: 'app-history-visit',
  templateUrl: './history-visit.component.html',
  styleUrls: ['./history-visit.component.scss'],
})
export class HistoryVisitComponent implements OnInit {
  patient: HistoryPatient;
  fetching: boolean = true;
  state: string;

  isCollapsedTreat: boolean = true;
  isCollapsedNotes: boolean = true;

  constructor(
    private historySer: HistoryService,
    private patientSer: PatientService,
    private _location: Location
  ) {}

  setStateClass() {
    const { state } = this.patient.currentVisit.medical[0];
    if (state === 'active') return { active: true };
    else if (state === 'critical') return { critical: true };
    else return { discharged: true };
  }

  handleStateChange(stateData) {
    this.patientSer.changeVisitState(stateData).subscribe(() => {
      let timerInterval;
      Swal.fire({
        title: 'State Successfully Changed!',
        icon: 'success',
        html: 'I will automatically close in <b></b> milliseconds.',
        timer: 2000,
        timerProgressBar: true,
        onBeforeOpen: () => {
          Swal.showLoading();
          timerInterval = setInterval(() => {
            const content = Swal.getContent();
            if (content) {
              const b = content.querySelector('b');
              if (b) {
                b.innerHTML = Swal.getTimerLeft().toString();
              }
            }
          }, 100);
        },
        onClose: () => {
          clearInterval(timerInterval);
        },
      });
      window.location.replace('/main');
    });
  }

  async changeState() {
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
          const stateData = this.mapForStateChange(
            this.patient.currentPatient,
            state
          );
          this.handleStateChange(stateData);
        }
      });
    }
  }

  mapForStateChange(patient, state) {
    return {
      govId: patient.govId,
      visitId: patient.visit[0]._id,
      newState: state,
    };
  }

  getPatient() {
    this.patient = this.historySer.getCurrentPatientVisit();
    this.fetching = !this.fetching;
  }
  goBack() {
    this._location.back();
  }
  ngOnInit(): void {
    this.getPatient();
  }
}
