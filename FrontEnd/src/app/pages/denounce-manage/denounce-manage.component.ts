import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Usuario, Denounce, Department } from 'src/app/models/model.index';
import { UsuarioService, DenounceService, ComplainService } from 'src/app/services/service.index';
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

  newdenounces: number = 0;
  attendeddenounces: number = 0;
  denouncesinprocess: number = 0;

  Description: string = '';
  estado = 'Revision';

  showDenounce: boolean = false;
  ProcessDenounce: boolean = false;
  replaydenounce: boolean = false;
  // filtros
  from: string
  to: string
  state: string;


  // Pagination
  page: number = 1;
  pageSize: number = 10;
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
    this.showDenounce = false;
    this.ProcessDenounce = false;
    this.replaydenounce = false;
    this._ComplainService.ListaDepartamentos()
      .subscribe(result => {
        var departmens = result.departamentos;
        this.departmens = departmens;
      });

    //initfilters
    this.from = ''
    this.to = ''
    this.state = '-1'


  }

  ngAfterViewInit(): void {
    this.Cambio();
    this.mapInitializer();
  }





  CargaDenounces() {
    this._DenounceService.ListDenuncesbyDepartment(this.usuario.departamento.department_Id, this.state, this.from, this.to)
      .subscribe(result => {
        this.denuncias = result.Denounces;
        this.newdenounces = result.newdenounces;
        this.attendeddenounces = result.attendeddenounces; 
        
        this.denouncesinprocess = result.denouncesinprocess;

      });
  }

  EditDenounce(item: any) {
    this.showDenounce = true;
    this.replaydenounce = false;
    this.ProcessDenounce = false;
    this.denuncia = item;
    setTimeout(() => {
      this.Cambio();
    this.mapInitializer();
    }, 100);


  }

  process(item: any) {
    this.showDenounce = false;
    this.replaydenounce = false;
    this.ProcessDenounce = true;
    this.denuncia = item;
    this.Cambio();
    this.mapInitializer();
  }


  replay(item: any) {
    this.ProcessDenounce = false;
    this.showDenounce = false;
    this.replaydenounce = true;
    this.denuncia = item;
    this.Cambio();
    this.mapInitializer();


  }




  Save(Action: string) {
      if (Action == 'R' && this.denuncia.Department_Id == "-1") {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: "Debe seleccionar un departamento",
        });
        return
      } 

      console.log(this.denuncia);
      

      if (this.denuncia.state == 'Procesada' && this.denuncia.Answer == '') {
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: "Debe dar respuesta a la denuncia",
        });
        return
      } 
      

        this._DenounceService.updatedenouncexadmin(this.denuncia, Action)
          .subscribe(result => {
            this.start();
            this.CargaDenounces();
          });
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
