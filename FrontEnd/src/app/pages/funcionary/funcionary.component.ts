import { Component, OnInit } from '@angular/core';
import { CryptoService, UsuarioService, ComplainService } from 'src/app/services/service.index';
import { Usuario, Persona, Departamento, Role, Department } from 'src/app/models/model.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionary',
  templateUrl: './funcionary.component.html',
  styleUrls: ['./funcionary.component.css']
})
export class FuncionaryComponent implements OnInit {

  ingresando: boolean = false;
  Usuario: any;
  Persona: Persona;
  errormsj: string;
  passwordRegister: string = '';
  passwordLogin: string = '';
  departmens: Departamento[] = [];
  roles: Role[] = [];
  // users: Usuario[] = [];
  users: any []= [];

  // Pagination
  page: number = 1;
  pageSize: number = 5;
// search variable
  filter:string = '';

  constructor(
    private _complainService: ComplainService,
    private _cryptoService: CryptoService,
    private _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.inicio();

    this._complainService.ListaDepartamentos()
      .subscribe(result => {
        var departmens = result.departamentos;
        this.departmens = departmens;
        console.log(this.departmens);

      });

    this._usuarioService.ListRole()
      .subscribe(result => {
        var roles = result.roles;
        this.roles = roles;
        console.log(this.roles);
      });
    this.ListaDeUsuarios();


  }

  ListaDeUsuarios() {
    this._usuarioService.AllUsers(this.filter)
      .subscribe(result => {
        var users = result.users;
        this.users = users;
        console.log(this.users);
      });

  }


  clearfilter(){
    this.filter = '';
    this.ListaDeUsuarios();

  }
  inicio() {
    this.Persona = new Persona(-1, '', '', '', '', '');
    let departamento = new Department(-1, '', 0);
    this.Usuario = new Usuario(-1, '', -1, '', this.Persona, departamento);
    this.passwordRegister = '';
    this.passwordLogin = '';
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


  deleteUser(item: any) {

    Swal.fire({
      title: 'Esta segur@?',
      text: "De que desea eliminar el funcionario " + item.persona.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!',
      cancelButtonText: ' Cancelar!',
    }).then((result) => {
      if (result.value) {
        this._usuarioService.DeleteUser(item.usuario_Id)
          .subscribe(result => {
            this.ListaDeUsuarios();
            this.inicio();
          });
      }
    })






  }

  editFuncionary(item:any){
    this.Usuario = Object.assign({},item)
    this.Persona =  Object.assign({},this.Usuario.persona);
    this.Usuario.departamento.department_id = this.Usuario.departamento.department_Id;
    this.passwordRegister = Object.assign({},this.Usuario.password)  ;
    this.Persona.strId = this.Usuario.persona.persona_Id;
    
    
    
  }



  registrarse() {
    this.validar();
    if (this.errormsj == '') {

      this.Persona.persona_Id = parseInt(this.Persona.strId);
      this.Usuario.password = this._cryptoService.encryptPassword(this.passwordRegister);
      this.Usuario.persona = this.Persona;
      console.log(this.Usuario);
      this._usuarioService.funcionaryRegister(this.Usuario)
        .subscribe(() => {
          this.ListaDeUsuarios();
          this.inicio();
        })
    }

  }

}
