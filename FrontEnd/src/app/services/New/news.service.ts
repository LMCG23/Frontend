import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { URL_SERVICE } from 'src/app/config/config';
import { ApiResponse, News} from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NewService {

     
constructor(private http: HttpClient)
{
}



postFile(Noticia:News) {

    let url = `${URL_SERVICE}/New/agregarNoticia/${Noticia}`;

    return this.http.post( url,Noticia)
      .pipe(
        map((resp: ApiResponse) => 
        Swal.fire(  'Noticia',  resp.message, 'success' ) 
        )
      );

  }

  
  ObtenerNoticias() {
  let url = `${URL_SERVICE}/New/ObtenerNoticias`;
  return this.http.get( url)
  .pipe(
      map((resp: ApiResponse) => resp.result)
    );
}

ObtenerNoticiasFiltro(expired:string,filter:string) {
  if(expired == ''){
    expired = '_ALL_'
  }
  if(filter == ''){
    filter = '_ALL_'
  }


  let url = `${URL_SERVICE}/News/getnewsfilter/${expired}/${filter}`;

  console.log(url);
  

  return this.http.get( url)
  .pipe(
      map((resp: ApiResponse) => resp.result)
    );
}



Delete(news_id:number){

  let url = `${URL_SERVICE}/news/delete/${news_id}`;

  return this.http.delete( url )
    .pipe(
      map((resp: ApiResponse) => Swal.fire( 'Noticia',  resp.message,  'success' ))
    );


}

CardData(){
  let url = `${URL_SERVICE}/Carddata/Carddata`;
  return this.http.get( url)
  .pipe(
      map((resp: ApiResponse) => resp.result)
    );

}





}