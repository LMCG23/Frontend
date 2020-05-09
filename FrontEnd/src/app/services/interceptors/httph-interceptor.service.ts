// Angular
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

// Rxjs
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { UsuarioService } from '../usuario/usuario.service';

// Models
import { ApiResError } from 'src/app/models/model.index';

// SweetAlert
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttphInterceptorService implements HttpInterceptor {

  constructor(
    private usuarioService: UsuarioService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let reqAuth;

    if (this.usuarioService && this.usuarioService.isAuthenticated()) {
      const headers = new HttpHeaders({
        'Authorization': this.usuarioService.headerAuthorization() || ''
      });
  
      reqAuth = req.clone({
        headers
      });
    }
    else {
      reqAuth = req.clone();
    }

    return next.handle(reqAuth)
      .pipe(
        catchError(this.showError)
      );

  }

  showError(error: HttpErrorResponse) {
    let err: ApiResError = error.error.error;

    // Si es error por token, devuelve el usuario al login
    if (error.status === 401 && this.usuarioService) {
      this.usuarioService.logout();
    }

    Swal.fire(
      err.title || 'Error!',
      err.message || 'Ocurrió un error durante la transacción',
      'error',
      //  '#d33',
      //  'Aceptar'
    );

    if (err.data) {
      console.log('DATA ERROR', err.data);
    }

    return throwError(error);
  }

}
