import { Component, OnInit } from '@angular/core';
import { Complain, Department, Funcionario, Usuario } from 'src/app/models/model.index';
import { ComplainService, UsuarioService } from 'src/app/services/service.index';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-complain',
  templateUrl: './complain.component.html',
  styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {
  closeResult: string;

  queja: Complain;
  departmens: Department[] = [];
  complains: Complain[] = [];
  funcionarios: Funcionario[] = [];
  department_Id: string = '-1';
  depSeleccion: string = '';
  funcioSeleccion: number = 0;
  usuario: Usuario;
  fecha: Date;
  fechaString: string;
  Funcio: Funcionario;
  Description:string;


  // Pagination
  page: number = 1;
  pageSize: number = 5;

  constructor(
    private _complainService: ComplainService,
    private _UsuarioService: UsuarioService,
    private modalService: NgbModal
  ) {
    this.usuario = this._UsuarioService.usuario;
  }

  ngOnInit() {
    this.start();
  }

  start() {
    this.fecha = new Date();
    this.Funcio = new Funcionario('', '', '', -1);
    this.fechaString = (this.fecha.getDate() + "/" + (this.fecha.getMonth() + 1) + "/" + this.fecha.getFullYear());
    this.queja = new Complain(-1, '', '', -1, -1, '', '', -1, '');
    this._complainService.ListaDepartamentos()
      .subscribe(result => {

        var departmens = result.departamentos;
        this.departmens = departmens;
        console.log(this.departmens);
        this.CargaXUsuario();
      })


  }

  buscarEmployee() {


    this._complainService.ListaFuncionarios(this.depSeleccion)
      .subscribe(result => {

        var funcionarios = result.funcionarios;
        this.funcionarios = funcionarios;
        console.log(this.funcionarios);

      })
    $('#funcionarioSearch').modal('show');

  }

  capturar() {
    // Pasamos el valor seleccionado a la variable verSeleccion
    this.depSeleccion = this.department_Id;
    console.log(this.depSeleccion);
    //https://stackblitz.com/edit/angular-dsrx92?file=app%2Fapp.component.html
  }


  agregarFuncionario(item: Funcionario) {

    this.Funcio = item;

    $('#funcionarioSearch').modal('toggle');
  }


  EditComplain(item: Complain) {
    $('html, body').animate({
      scrollTop: $('#titulo').offset().top
    }, 1200);

    this.queja = Object.assign({}, item);
    this.department_Id = this.queja.department_id.toString();
  }



  enviar() {
    if (this.queja.Complain_Id == -1) {
      this.queja.department_id = parseInt(this.depSeleccion);
      this.queja.employee = this.Funcio.Person_Id.toString();
      this.queja.state = 'Pendiente';
      this.queja.User_id = this.usuario.usuario_Id;
      this.queja.person_Id = this.usuario.persona.persona_Id;
      this.queja.employee_name = this.Funcio.nombre + ' ' + this.Funcio.apellido1;
      this.queja.fecha = this.fechaString;
      this._complainService.GuardarQueja(this.queja)
        .subscribe(
          result=>{
            this.CargaXUsuario();
      this.cleanComplain();
          }

        );
   
    }
    else {
    
      this.queja.department_id = parseInt(this.depSeleccion);
      this.queja.employee = this.Funcio.Person_Id.toString();
      this.queja.employee_name = this.Funcio.nombre + ' ' + this.Funcio.apellido1;
      this.queja.fecha = this.fechaString;
      this._complainService.UpdateComplain(this.queja)
        .subscribe(result => {
          this.CargaXUsuario();
          this.cleanComplain();


        });



    }

  }

  CargaXUsuario() {
    this._complainService.ListComplainsbyId(this.usuario.usuario_Id)
      .subscribe(result => {

        var complains = result.complains;
        this.complains = complains;
    

      })

  }

  cleanComplain() {
    this.queja = new Complain(-1, '', '', -1, -1, '', '', -1, '');
    this.queja.Description = '';
    this.Funcio.nombre ='';
    this.department_Id = '-1';

  }
  deleteComplain(item: Complain) {
    if (item.state == 'Pendiente') {
      this._complainService.DeleteComplain(item.Complain_Id)
      .subscribe(result => {
        this.CargaXUsuario();
      });
    }else {
      Swal.fire('Error de validación','La queja ya fue vista por el departamento','error');
    }
   


  }

  complaindatail(item: any) {
    this.Description =  item.Description
    $('#complaindatail').modal('show');

  }



  open(content) {

    if(this.department_Id == '-1'){
      Swal.fire('Error','Debe seleccionar un departamento','error');
      return;
    }

    this._complainService.ListaFuncionarios(this.depSeleccion)
    .subscribe(result => {

      var funcionarios = result.funcionarios;
      this.funcionarios = funcionarios;
      console.log(this.funcionarios);

    })


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





}
