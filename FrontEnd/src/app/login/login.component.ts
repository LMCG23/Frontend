import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CryptoService, UsuarioService } from '../services/service.index';
import { Usuario, Persona, Departamento, Department } from 'src/app/models/model.index';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.componet.css']
})
export class LoginComponent implements OnInit {

  title = 'appBootstrap';

  closeResult: string;

  ingresando: boolean = false;
  Usuario: Usuario;
  Persona: Persona;
  errormsj: string;
  passwordRegister: string = '';
  passwordLogin: string = '';

  Username: string = '';
  newpassword: string = '';
  confirmation: string = '';


  constructor(
    private router: Router,
    private _cryptoService: CryptoService,
    private _usuarioService: UsuarioService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.inicio();
    this.start();
  }

  start() {
    this.Username = '';
    this.newpassword = '';
    this.confirmation = '';
  }

  ingresar(form: NgForm) {

    if (form.invalid) {
      return;
    }

    this.ingresando = true;

    var user = form.value.username;
    var pass = this._cryptoService.encryptPassword(form.value.password);

    this._usuarioService.login(user, pass)
      .subscribe()
      .add(() => this.ingresando = false);

  }

  inicio() {
    this.Persona = new Persona(-1, '', '', '', '', '');
    let departamento = new Department(-1, '', 0);
    this.Usuario = new Usuario(-1, '', -1, '', this.Persona, departamento);
    this.passwordRegister = '';
    this.passwordLogin = '';
  }

  registermodal() {
    $("#Register").modal('show');

  }

  validateChange() {
    if (this.Username == '')
      return 'Debe ingresar su nombre de usuario';

    if (this.newpassword == '')
      return 'Debe ingresar su nueva contraseña';

    if (this.confirmation == '')
      return 'Debe ingresar la confirmación de la contraseña';

    if (this.newpassword != this.confirmation)
      return 'las contraseñas no coinciden'
    return '';
  }

  changePassword() {
    let msj = this.validateChange();

    if (msj != '') {
      Swal.fire('Error', msj, 'error');
      return;
    } else {

      let currentPasswordSend = this._cryptoService.encryptPassword(this.newpassword);
      this._usuarioService.changePasswordlogout(this.Username, currentPasswordSend).subscribe(result => {
        this.start();
      }
      );


    }


  }





  validar() {
    if (this.Persona.nombre == '')
      this.errormsj = 'Debe ingresar su nombre';

    if (this.Persona.apellido1 == '')
      this.errormsj = 'Debe ingresar su primer apellido';

    if (this.Persona.apellido2 == '')
      this.errormsj = 'Debe ingresar su segundo apellido';

    if (this.Persona.correo == '')
      this.errormsj = 'Debe ingresar un correo';

    if (this.Persona.persona_Id == -1)
      this.errormsj = 'Debe el numero de cedula';

    if (this.Usuario.nombre == '')
      this.errormsj = 'Debe ingresar su nombre de usuario';
    if (this.Usuario.password == '')
      this.errormsj = 'Debe ingresar una contraseña';

    this.errormsj = '';
  }

  registrarse() {
    this.validar();
    if (this.errormsj == '') {


      this.Persona.persona_Id = parseInt(this.Persona.strId);
      //cambio aqui
      this.Usuario.departamento.department_id = 4;


      this.Usuario.password = this._cryptoService.encryptPassword(this.passwordRegister);
      this.Usuario.rol = 3;
      this.Usuario.persona = this.Persona;
      this.Usuario.departamento.department_id = 3;

      this._usuarioService.signin(this.Usuario)
        .subscribe(() => {
          this.getDismissReason('ESC');
          this.inicio();
        })
    }


  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: "myCustomModalClass" }).result.then((result) => {
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
      return `with: ${reason}`;
    }
  }


}
