import { Component, OnInit } from '@angular/core';
import { UsuarioService, CryptoService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/model.index';
import Swal from 'sweetalert2';
import { SafeResourceUrl } from '@angular/platform-browser';
import { EventEmitter } from 'protractor';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  closeResult: string;

  user: any;
  useredit: Usuario;
  editprofile: boolean = false;
  guardando: boolean = false;
  imagePath: any = '/assets/img/theme/no_user_logo -2.png';
  imagePathTemp: any = '/assets/img/theme/no_user_logo.png';
  titulo: string = 'Seleccione una imagen';
  public current: SafeResourceUrl;


  currentPassword: string = '';
  newpassword: string = '';
  confirmation: string = '';
  passwordSend:string = ''
  constructor(
    private usuarioService: UsuarioService,
    private modalService: NgbModal,
    private _cryptoService: CryptoService
  ) { }
  ngOnInit() {
    this.start();

  }

  start() {
    this.user = new Usuario(this.usuarioService.usuario.usuario_Id, this.usuarioService.usuario.nombre, this.usuarioService.usuario.rol, '', this.usuarioService.usuario.persona, this.usuarioService.usuario.departamento);
    this.user.photo = this.usuarioService.usuario.photo;

    if (this.user.photo == '') {
      this.user.photo = '/assets/img/theme/no_user_logo.png';
    }
    this.cleanpassword();

  }

  cleanpassword() {

    this.currentPassword = '';
    this.newpassword = '';
    this.confirmation = '';
    this.passwordSend = '';
  }


  open(content) {
    this.imagePathTemp = this.user.photo;

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


  savePhoto() {
    this.user.photo = this.imagePathTemp;
  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var sa = event.target.files;
      var fileName = sa[0].type;
      var archivo2;
      console.log("url normal=" + fileName);

      reader.onload = (event: any) => {

        this.imagePathTemp = event.target.result;

      }

      reader.readAsDataURL(event.target.files[0]);



    }
  }

  savephoto() {
    this.usuarioService.savePhoto(this.user).subscribe()
  }

  validateChagePassword() {
    if (this.currentPassword == '')
      return 'Debe ingresar la contraseña actual';
    if (this.newpassword == '')
      return 'Debe ingresar la nueva contraseña';
    if (this.confirmation == '')
      return 'Debe ingresar la confirmación de la contraseña';

    if (this.confirmation != this.newpassword)
      return 'Las contraseñas no coinciden';

    return '';


  }

  savePassword() {
 
    let msj = this.validateChagePassword();

    if(msj != ''){
      Swal.fire('Error',msj,'error');
      return;
    }else {
      let currentPasswordSend = this._cryptoService.encryptPassword(this.currentPassword);
      this.passwordSend = this._cryptoService.encryptPassword(this.newpassword);
     this.usuarioService.changePassword(this.passwordSend,currentPasswordSend).subscribe( result =>{
      this.start();
     }  
     );
    }


  }


}
