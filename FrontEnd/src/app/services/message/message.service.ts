import { Injectable } from '@angular/core';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  // constructor() { }

  // showError( message: string, title?: string ) {

  //   if ( !message || message.trim() === '' ) {
  //     return;
  //   }

  //   Swal.fire({
  //     title: title || 'Error',
  //     text: message,
  //     type: 'error',
  //     confirmButtonColor: '#d33',
  //     confirmButtonText: 'Aceptar'
  //   });

  // }

  // showAlertQuestion( title: string, question: string ): Promise<SweetAlertResult> {

  //   return Swal.fire({
  //     title: title,
  //     text: question,
  //     type: 'warning',
  //     showCancelButton: true,
  //     cancelButtonText: 'Cancelar',
  //     confirmButtonColor: '#d33',
  //     confirmButtonText: 'Aceptar'
  //   });

  // }

}
