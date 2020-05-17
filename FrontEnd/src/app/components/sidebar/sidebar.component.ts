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
    { path: '/ComplainManage', title: 'Gestor De Quejas',  icon:'ni-bullet-list-67 text-red', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


   ROUTE: any[] = [
    
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/News', title: 'Noticias',  icon:'ni-planet text-blue', class: '' },
    { path: '/Complain', title: 'Quejas',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/Denounce', title: 'Denuncias',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/Funcionary', title: 'Funcionarios',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/Departments', title: 'Departamentos',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/DenounceManage', title: 'Gestor De Denuncias',  icon:'ni-bullet-list-67 text-red', class: '' },
    { path: '/ComplainManage', title: 'Gestor De Quejas',  icon:'ni-bullet-list-67 text-red', class: '' },

];





  public menuItems: any[];
  public isCollapsed = true;
  user:Usuario
  smartmsph:string = '';
  constructor(private router: Router,private usuarioService:UsuarioService ) { }


  ngOnInit() {
    
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id,this.usuarioService.usuario.nombre,this.usuarioService.usuario.rol,'',this.usuarioService.usuario.persona,this.usuarioService.usuario.departamento);
    this.user.photo = this.usuarioService.usuario.photo;
    this.MenusbyUser();
    if(this.user.photo == ''){
      this.user.photo = '/assets/img/theme/no_user_logo -2.png';
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }


  MenusbyUser(){
    if(this.user.rol == 3){
      this.smartmsph =  '/dashboard'
   
      
      this.ROUTE = [
    
        { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
        { path: '/Complain', title: 'Quejas',  icon:'ni-pin-3 text-orange', class: '' },
        { path: '/Denounce', title: 'Denuncias',  icon:'ni-pin-3 text-orange', class: '' },
    
    ];
    this.menuItems = this.ROUTE;
    }  
    
    if(this.user.rol == 2){
     

      this.ROUTE = [
        { path: '/Admin/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
        { path: '/DenounceManage', title: 'Gestor De Denuncias',  icon:'ni-bullet-list-67 text-red', class: '' },
        { path: '/ComplainManage', title: 'Gestor De Quejas',  icon:'ni-bullet-list-67 text-red', class: '' },
    
    ];
    this.menuItems = this.ROUTE;
    }  
    if(this.user.rol == 1){
      this.smartmsph =  '/superUser/dashboard'

      this.ROUTE = [
        { path: '/superUser/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
        { path: '/News', title: 'Noticias',  icon:'ni-planet text-blue', class: '' },
        { path: '/Departments', title: 'Departamentos',  icon:'ni-bullet-list-67 text-red', class: '' },
        { path: '/Funcionary', title: 'Funcionarios',  icon:'ni-single-02 text-yellow', class: '' },
    
    ];
    this.menuItems = this.ROUTE;
    }  




  }






  cerrarSesion() {
    this.usuarioService.logout();
  }



}
