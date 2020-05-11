import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/model.index';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  user:Usuario
  
  public focus;
  public listTitles: any[];
  public location: Location;
  


  constructor(location: Location,  private element: ElementRef, private router: Router, private usuarioService:UsuarioService) {
    this.location = location;
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id,this.usuarioService.usuario.nombre,this.usuarioService.usuario.rol,'',this.usuarioService.usuario.persona,this.usuarioService.usuario.departamento);
  
    this.user.photo = this.usuarioService.usuario.photo;
    
    if(this.user.photo == ''){
      this.user.photo = '/assets/img/theme/no_user_logo -2.png';
    }

  }
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }


  cerrarSesion() {
    this.usuarioService.logout();
  }





}
