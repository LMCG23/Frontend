import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { ApiResponse, Department,Complain} from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ComplainService {

     
constructor(private http: HttpClient)
{
}


ListaDepartamentos() {
    let url = `${URL_SERVICE}/queja/lista`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }

  complaintsFilter(desde:string,hasta:string,state:string,department:string) {

    if(desde == ''){
      desde = '_ALL_'
    }

    if(hasta == ''){
      hasta = '_ALL_'
    }

    if(state == '-1'){
      state = '_ALL_'
    }

    if(department == '-1'){
      department = '_ALL_'
    }

    let url = `${URL_SERVICE}/complaints/list/${desde}/${hasta}/${state}/${department}`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }


  ListaFuncionarios(depSeleccion:string) {
    let url = `${URL_SERVICE}/Funcionario/listaFuncionarios/${depSeleccion}`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }


  allfuncionary() {
    let url = `${URL_SERVICE}/Funcionario/allfuncionary/`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }



  GuardarQueja( queja:Complain) {

    let url = `${URL_SERVICE}/queja/GuardarQueja/${queja}`;

    return this.http.post( url,queja)
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'insercion de queja',  resp.message,  'success' ) )
      );

  }
  ListComplainsbyId(User_id:number) {
    let url = `${URL_SERVICE}/Complain/List/${User_id}`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }


  UpdateComplain( complain:Complain) {

    let url = `${URL_SERVICE}/complain/Update/${complain}`;

    return this.http.post( url,complain)
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Queja actualizada',  resp.message,  'success' ) )
      );

  }
  DeleteComplain(Complain_id:number){

    let url = `${URL_SERVICE}/complain/delete/${Complain_id}`;

    return this.http.delete( url )
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Queja',  resp.message,  'success' ))
      );

  
  }


  AllComplains(from:string,to:string,state:string) {

    if(from == ''){
      from = '_ALL_';
    }

    if(to == ''){
      to = '_ALL_';
    }
    let url = `${URL_SERVICE}/Complain/AllComplains/${state}/${from}/${to}`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }


  UpdateComplainbyAdmin( queja:Complain) {

    let url = `${URL_SERVICE}/complain/UpdateComplainbyAdmin/`;

    return this.http.post( url,queja)
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Se ha actualizado la queja',  resp.message,  'success' ) )
      );

  }




}