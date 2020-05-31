import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ComplainService, UsuarioService, DenounceService } from 'src/app/services/service.index';
import { Ticket, Usuario, Department, Denounce } from 'src/app/models/model.index';
import Swal from 'sweetalert2';

declare var $: any;
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-denounce',
  templateUrl: './denounce.component.html',
  styleUrls: ['./denounce.component.css']
})
export class DenounceComponent implements AfterViewInit {
  closeResult: string;
  //MAPA
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: number = 0;
  lng: number = 0;
  coordinates: any;

  //MAPA
  usuario: Usuario;
  ticket: Ticket;
  departmens: Department[] = [];
  departamento_Id: string = '-1';
  depSeleccion: number = -4;
  url: string = 'http://placehold.it/180';

  denuncia: Denounce;
  denuncias: Denounce[] = []
  Description: string = '';

  guardando:boolean;
  cancelando:boolean;

  Answer:string = '';

  //filters

desde:string = '';
hasta:string = ''; 
Denouncestate:string= '-1';
departmentid_Filter:string = '-1';

  // Pagination
  page: number = 1;
  pageSize: number = 5;


  coordenadas() {
    if ("geolocation" in navigator) { //check geolocation available 
      //try to get user current location using getCurrentPosition() method
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(this.lng);
      });
    } else {
      console.log("Browser doesn't support geolocation!");
    }
    console.log(this.lng);
  }


  constructor(
    private _complainService: ComplainService,
    private _UsuarioService: UsuarioService,
    private _DenounceService: DenounceService,
    private modalService: NgbModal
  ) {
    this.usuario = this._UsuarioService.usuario;

    this.start();
    this.CargaDenounces();
  }

  start() {
    this.denuncia = new Denounce(0, '', '', 0, 0, '', -1, '', '');
    this.denuncia.Photo = 'http://placehold.it/180';
  }



  ngAfterViewInit() {
    this.ListaDepartamentos();
    setTimeout(() => {
      this.Cambio();
    this.mapInitializer();
    }, 1000);
    this.coordenadas();
    
  }

  ListaDepartamentos() {
    this._complainService.ListaDepartamentos()
      .subscribe(result => {
        var departmens = result.departamentos;
        this.departmens = departmens;
        

      });
  }
  Cambio() {

    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions.center = this.coordinates;
    this.mapOptions.zoom = 16;
    this.marker.setPosition(this.coordinates);

  }


  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16
  };

  marker = new google.maps.Marker({

    position: this.coordinates,
    map: this.map,
    title: 'Hello World!',
    draggable:true
  });

  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }



  //imagen 

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.denuncia.Photo = this.url;
      }


      reader.readAsDataURL(event.target.files[0]);
    }
  }


  //MODAL OPTIONS
 

  //imagen 
  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.depSeleccion = this.denuncia.Department_Id;
    console.log(this.depSeleccion);
    //https://stackblitz.com/edit/angular-dsrx92?file=app%2Fapp.component.html
  }
  save() {


    this.denuncia.Latitud = this.lat.toString();
    this.denuncia.Longitud = this.lng.toString();
    console.log(this.denuncia.Longitud);
    this.denuncia.Person_Id = this.usuario.persona.persona_Id;
    this.denuncia.User_id = this.usuario.usuario_Id;
    this.denuncia.state = 'Pendiente'

    this._DenounceService.SaveDenounce(this.denuncia)
      .subscribe(result => {
        this.start();
        this.CargaDenounces();
        //editando desde aqui
        this.coordenadas();
        this.Cambio();

      });



  }


  EditDenounce(item: any) {


    this.denuncia.Description
    this.denuncia = Object.assign({}, item);
    this.lat = parseInt(this.denuncia.Latitud);
    this.lng = parseInt(this.denuncia.Longitud);

    $('html, body').animate({
      scrollTop: $('#titulo').offset().top
    }, 1200);
  }


  denouncesdatail(item: any) {
    this.Description = item.Description
    this.denuncia.Photo = item.Photo



    this.lat = parseInt(this.denuncia.Latitud);
    this.lng = parseInt(this.denuncia.Longitud);

    this.Cambio();
    this.mapInitializer();
    $('#denouncesdatail').modal('show');
  }

  CargaDenounces() {
    this._DenounceService.ListDenuncesbyId(this.usuario.usuario_Id,this.desde,this.hasta,this.Denouncestate,this.departmentid_Filter)
      .subscribe(result => {
        this.denuncias = result;

      })

  }


  deleteDenounce(item: any) {

    Swal.fire({
      title: 'Esta segur@?',
      text: "De que desea eliminar la denuncia # " + item.Denounces_id ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!',
      cancelButtonText: ' Cancelar!',
    }).then((result) => {
      if (result.value) {
     
        if (item.state == 'Pendiente') {
          this._DenounceService.DeleteDenounce(item.Denounces_id)
            .subscribe(result => {
              this.CargaDenounces();
              this.Cambio();
              this.coordenadas();
            });
        } else {
          Swal.fire('Error de validación', 'la denuncia ya ha sido vista por el departamento no se puede eliminar', 'error')
        }



      }
    })








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

  open2(content,item) {
    this.denuncia.Description=item.Description;
    this.Answer = item.Answer;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass"  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  open3(content) {
    this.Cambio();
    this.mapInitializer();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass : "myCustomModalClass"  }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


}
