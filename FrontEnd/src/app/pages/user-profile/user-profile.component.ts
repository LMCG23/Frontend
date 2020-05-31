import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;
  useredit: Usuario;
  editprofile: boolean = false;
  guardando: boolean = true;
  cancelando:boolean;
  constructor(
    private usuarioService: UsuarioService

  ) { }

  ngOnInit() {
    this.start();

  }

  start() {
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id, this.usuarioService.usuario.nombre, this.usuarioService.usuario.rol, '', this.usuarioService.usuario.persona, this.usuarioService.usuario.departamento);
    this.editprofile = false;

    this.user.photo = this.usuarioService.usuario.photo;

    if(this.user.photo == ''){
      this.user.photo = '/assets/img/theme/no_user_logo.png';
    }

  }

  settings() {
    this.editprofile = true;
    this.guardando = false;
  }

  validate(user: Usuario) {
    if (user.persona.nombre == '')
      return 'Debe ingresar su nombre';
    if (user.persona.apellido1 == '')
      return 'Debe ingresar su primer apellido';
    if (user.persona.apellido2 = '')
      return 'Debe ingresar su segundo apellido';
    if (user.persona.strId == '')
      return 'Debe ingresar su número de cédula';
    if (user.persona.correo == '')
      return 'Debe ingresar su correo electronico';

    return '';


  }


  save() {
    this.user.persona.strId = this.user.persona.persona_Id.toString();
    let msj = this.validate(this.user);

    if(msj != ''){
      Swal.fire('Error',msj,'error');
    } else {
      this.usuarioService.editprofile(this.user).subscribe(result=> {this.user = result})




    }




  }




}
