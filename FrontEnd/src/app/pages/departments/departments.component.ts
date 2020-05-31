import { Component, OnInit } from '@angular/core';
import { ComplainService } from 'src/app/services/service.index';
import { Department, Funcionario } from 'src/app/models/model.index';
import Swal from 'sweetalert2';
import { DepartmentService } from 'src/app/services/department/department.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  closeResult: string;
  // Pagination
  page: number = 1;
  pageSize: number = 5;

  funcionarios: Funcionario[] = [];
  department: Department;
  Funcio: Funcionario;
  departmens: Department[] = [];

  filter: string = ''

  guardando:boolean;
  cancelando:boolean;

  constructor(
    private _complainService: ComplainService,
    private DeparmetService: DepartmentService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.inicio();
    this.list();
  }

  buscarEmployee() {
    this._complainService.allfuncionary()
      .subscribe(result => {
        var funcionarios = result.funcionarios;
        this.funcionarios = funcionarios;
        $('#funcionarioSearch').modal('show');
      })

  }

  inicio() {

    this.department = new Department(-1, '', -1);
    this.Funcio = new Funcionario('', '', '', -1);
  }

  validar(department: Department) {
    if (department.name == '')
      return 'Debe ingresar el nombre del departamento'
    if (department.person_id == -1)
      return 'Debe ingresar el encargado del departamento'
    return '';


  }

  enviar() {
    this.department.person_id = this.Funcio.Person_Id
    let mensaje = this.validar(this.department);

    if (mensaje != '') {
      Swal.fire('Error', mensaje, 'error');
    } else {
      this.DeparmetService.Guardar(this.department)
        .subscribe(() => {
          this.list();
          this.inicio();
        })
        .add();

    }



  }

  delete(item: any) {

    Swal.fire({
      title: 'Esta segur@?',
      text: "De que desea eliminar el departamento " + item.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar!',
      cancelButtonText: ' Cancelar!',
    }).then((result) => {
      if (result.value) {
        this.DeparmetService.Delete(item.department_Id)
          .subscribe(result => {
            this.list();
          });
      }
    })


  }

  clearfilter() {
    this.filter = '';
    this.list();
  }


  list() {
    this.DeparmetService.ListaDepartamentos(this.filter)
      .subscribe(result => {
        console.log(result);

        var departmens = result.departamentos;
        this.departmens = departmens;

      })
  }
  agregarFuncionario(item: Funcionario) {

    this.Funcio = item;

    $('#funcionarioSearch').modal('toggle');
  }

  EditDepartment(item: any) {
    this.department = Object.assign({}, item);
    this.Funcio.Person_Id = this.department.person_id;
    this.Funcio.nombre = item.personname;
  }


  open(content) {

    this._complainService.allfuncionary()
      .subscribe(result => {
        var funcionarios = result.funcionarios;
        this.funcionarios = funcionarios;
      })


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
