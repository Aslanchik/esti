import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  constructor() {}
  // SUCCESS TOAST
  successToast(title) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: 'success',
      title: `${title}`,
    });
  }
  // SUCCESS SWAL WITH TIMER AND REDIRECT WITH RENDER
  successSwal(title) {
    let timerInterval;
    Swal.fire({
      title: `${title}`,
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
        window.location.replace('/main');
      },
    });
  }
}
