import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/model.index';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user:Usuario;
  useredit:Usuario;
  editprofile:boolean = false;
  constructor(
    private usuarioService:UsuarioService 

  ) { }

  ngOnInit() {
  this.start();
  
  }

  start(){
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id,this.usuarioService.usuario.nombre,this.usuarioService.usuario.rol,'',this.usuarioService.usuario.persona,this.usuarioService.usuario.departamento);
    this.editprofile = false;
    

  }

  settings(){
    this.editprofile = true;

  }





}
