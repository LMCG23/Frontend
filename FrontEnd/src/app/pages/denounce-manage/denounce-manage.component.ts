import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario, Denounce,Department } from 'src/app/models/model.index';
import { UsuarioService, DenounceService,ComplainService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

declare var $: any;
@Component({
  selector: 'app-denounce-manage',
  templateUrl: './denounce-manage.component.html',
  styleUrls: ['./denounce-manage.component.css']
})
export class DenounceManageComponent implements AfterViewInit {
  denuncia: any;
  denuncias: Denounce[] = [];
  departmens: Department[] = [];
  usuario: any;
  Description: string = '';
  estado = 'Revision';

  page: number = 1;
  pageSize: number = 5;
  //MAPA DE GOOGLE
  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat: number = 10.3768307;
  lng: number = -84.068391;
  coordinates: any;
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 16
  };
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: 'Hello World!'
  });
  //MAPA DE GOOGLE

  constructor(
    private _UsuarioService: UsuarioService,
    private _DenounceService: DenounceService,
    private _ComplainService: ComplainService,

  ) {
    this.usuario = this._UsuarioService.usuario;
    console.log(this.usuario);
    this.start();
    this.CargaDenounces();
  }

  start() {
    this.denuncia = new Denounce(0, '', '', 0, 0, '', -1, '', '');
    this.denuncia.Photo = 'http://placehold.it/180';
    this._ComplainService.ListaDepartamentos()
    .subscribe(result => {
      var departmens = result.departamentos;
      this.departmens = departmens;
    });

  }

  ngAfterViewInit(): void {
    this.Cambio();
    this.mapInitializer();
  }



  CargaDenounces() {
    this._DenounceService.ListDenuncesbyDepartment(this.usuario.departamento.department_Id)
      .subscribe(result => {
        this.denuncias = result;
     
      });
  }

  EditDenounce(item: any) {
   
    // this.denuncia = Object.assign({}, item);
    this.denuncia =  item;
    this.Cambio();
    this.mapInitializer();

  }


  save() {
    if (this.denuncia.Denounces_id == 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "No ha saleccionado Ninguna Denuncia para editar",
      });
    } else {
     if(this.denuncia.Department_Id=="-1"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Debe seleccionar un departamento",
      });
     }else{
      this._DenounceService.updatedenouncexadmin(this.denuncia)
      .subscribe(result => {
        this.start();
        this.CargaDenounces();
      });
     }
    }
  }




  //METODOS DEL GOOGLE MAPS 
  Cambio() {
    this.lat = this.denuncia.Latitud;
    this.lng = this.denuncia.Longitud;
    this.coordinates = new google.maps.LatLng(this.lat, this.lng);
    this.mapOptions.center = this.coordinates;
    this.mapOptions.zoom = 16;
    this.marker.setPosition(this.coordinates);
  }
  mapInitializer() {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    this.marker.setMap(this.map);
  }
  //METODOS DEL GOOGLE MAPS 

}
