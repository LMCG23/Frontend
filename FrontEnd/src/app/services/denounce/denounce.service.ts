import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { ApiResponse, Ticket,Denounce} from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DenounceService {

     
constructor(private http: HttpClient)
{
}


  ObtenerTicket( tickete : Ticket ) { 
    let url = `${URL_SERVICE}/Denuncias/tikets/${tickete.Department_id}/${tickete.Ticketcol}`;
console.log(url);
    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }



  SaveDenounce(Denuncia:Denounce) {

    let url = `${URL_SERVICE}/Denuncias/NuevaDenuncia/${Denuncia}`;

    return this.http.post( url,Denuncia)
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Denuncia',  resp.message,  'success' ) )
      );

  }


  ListDenuncesbyId(User_id:number,desde:string,hasta:string,state:string,deparment:string) {
      if(desde == '') desde = '_ALL_'
      if(hasta == '') hasta = '_ALL_'

    let url = `${URL_SERVICE}/Denuncias/List/${User_id}/${desde}/${hasta}/${state}/${deparment} `;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }

  DeleteDenounce(denounce_id:number){

    let url = `${URL_SERVICE}/denounce/delete/${denounce_id}`;

    return this.http.delete( url )
      .pipe(
        map((resp: ApiResponse) => Swal.fire(  'Denuncia',  resp.message,  'success' ))
      );
  }

  ListDenuncesbyDepartment(Department_id:number,state:string,from:string,to:string) {

    if(from == ''){
      from = '_ALL_';
    }

    if(to == ''){
      to = '_ALL_';
    }

    let url = `${URL_SERVICE}/Denuncias/ListDenouncesbyDepartment/${Department_id}/${state}/${from}/${to}`;

    return this.http.get( url)
    .pipe(
        map((resp: ApiResponse) => resp.result)
      );
  }

  updatedenouncexadmin(Denounce:Denounce,Action:String) {

    let url = `${URL_SERVICE}/Denounce/UpdateDenouncebyAdmin/${Action}`;

    return this.http.post( url,Denounce)
      .pipe(
        map((resp: ApiResponse) => Swal.fire( 'Denuncia',  resp.message,  'success' ) )
      );

  }


}