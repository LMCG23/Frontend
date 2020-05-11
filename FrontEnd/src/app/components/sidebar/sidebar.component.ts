import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/model.index';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/News', title: 'Noticias',  icon:'ni-planet text-blue', class: '' },
   { path: '/Complain', title: 'Quejas',  icon:'ni-pin-3 text-orange', class: '' },
   { path: '/Denounce', title: 'Denuncias',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/Funcionary', title: 'Funcionarios',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/Departments', title: 'Departamentos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/DenounceManage', title: 'Gestor De Denuncias',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;
  user:Usuario
  constructor(private router: Router,private usuarioService:UsuarioService ) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id,this.usuarioService.usuario.nombre,this.usuarioService.usuario.rol,'',this.usuarioService.usuario.persona,this.usuarioService.usuario.departamento);
    this.user.photo = this.usuarioService.usuario.photo;
    if(this.user.photo == ''){
      this.user.photo = '/assets/img/theme/no_user_logo -2.png';
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }


  cerrarSesion() {
    this.usuarioService.logout();
  }



}
