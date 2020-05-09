import { Component, OnInit } from '@angular/core';
import { News} from 'src/app/models/model.index';
import { NgForm } from '@angular/forms';
import {  NewService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  closeResult: string;


  url: string = 'http://placehold.it/180';
  Noticia: News;

  listNews: News[] = [];
  ingresando: boolean = false;
  message: string;


  descripcion:string = '';
  titulo:string ='';



  constructor(
    private _NewService: NewService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.inicio();
  }

  inicio() {
    this.GetAllNews();
    this.Noticia = new News( '', '', '');
    this.Noticia.fileToUpload = 'http://placehold.it/180';
  }



  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }
    // this.Noticia.descripcion = form.value.descripcion;
    // this.Noticia.titulo = form.value.titulo;
    // this.Noticia.fileToUpload = this.url;
    this.message = this.validar();
    if (this.message == '') {
    this.ingresando = true;
    this._NewService.postFile(this.Noticia)
      .subscribe( result =>{
        this.url= 'http://placehold.it/180';
        this.ingresando = false;
        this.GetAllNews();
        this.inicio();
      } );

    


    }
    else{
      Swal.fire('Error de validación', this.message, 'error');
    }
  }


  GetAllNews(){
    this._NewService.ObtenerNoticias()
    .subscribe(result => {
      this.listNews = result.Noticias;
      console.log(this.listNews);
      
    });
  }

  deletenew(item:any){
    this._NewService.Delete(item.new_id)
    .subscribe(result => {
      this.inicio();
    } );
  
  }

  Detail(item:any){
    this.Noticia = Object.assign({},item)
    $('#newsdatail').modal('show');

  }

  EditNew(item:any){
    this.Noticia = Object.assign({},item);
    this.descripcion =   Object.assign({},this.Noticia.descripcion);
    this.titulo = Object.assign({},this.Noticia.titulo);
    this.url = this.Noticia.fileToUpload;

    $('html, body').animate({
      scrollTop: $('#titulo').offset().top
    }, 1200);
  }



// muestra el modal
AddPhoto(){
  $('#addphoto').modal('show');
}
// fuente de la imagen
GuardarFotos(){
  $('#addphoto').modal('toggle');
}

// cierra el modal o lo abre 
readUrl(event:any) {
  if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var sa = event.target.files;
      var fileName = sa[0].type;
      var archivo2;
      console.log("url normal=" +fileName);
      
      reader.onload = (event:any) => {
       
          this.Noticia.fileToUpload = event.target.result;
          
        //   console.log("url normal=" +this.url);
        //   var archivo=event.target.result;
        //   console.log("archivo normal=" +archivo);

        
        // console.log("formato normal=" +fileName);
        // archivo2= archivo.replace("data:" + fileName + ";base64,", "");
        // console.log("archivo replace=" +archivo2);
        
// this.url=archivo2;
          // https://stackoverflow.com/questions/51533584/converting-an-image-to-binary-in-javascript-using-base64
      }

      reader.readAsDataURL(event.target.files[0]);
      
     

  }
}

validar() {
  if (this.Noticia.descripcion == '')
    return 'Debe ingresar una descripcion';
    
  if (this.Noticia.titulo == '')
    return 'Debe ingresar un titulo';

    if (this.Noticia.fileToUpload == 'http://placehold.it/180')
    return 'Debe insertar una imagen';
  // if (this.Persona.strId == '')
  //   this.errormsj = 'Debe el ingresar el número de cedula';
  return '';
}


   open(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass"  }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return  `with: ${reason}`;
      }
    }



}
