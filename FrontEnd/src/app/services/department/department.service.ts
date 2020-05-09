import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { Usuario,Departamento,Persona, ApiResponse, Department } from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  Guardar(Department:Department) {

    let url = `${URL_SERVICE}/department/guardar/`;

    return this.http.post( url,Department)
      .pipe(
        map((resp: ApiResponse) => Swal.fire(  'Departamento',  resp.message,  'success' ) )
      );

  }

  DeleteDenounce(department_id:number){

    let url = `${URL_SERVICE}/department/delete/${department_id}`;
    console.log(url);
    
    return this.http.delete( url )
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Departamento',  resp.message,  'success' ))
      );

  
  }


}
