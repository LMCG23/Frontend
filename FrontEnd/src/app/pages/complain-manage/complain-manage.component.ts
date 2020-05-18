import { Component, OnInit } from '@angular/core';
import { Persona,Usuario,Complain } from 'src/app/models/model.index';
import { UsuarioService,ComplainService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-complain-manage',
  templateUrl: './complain-manage.component.html',
  styleUrls: ['./complain-manage.component.css']
})
export class ComplainManageComponent implements OnInit {
  Complains: any;
  Person: any;
  complain:any;

  newcomplaints:number = 0;
  complaintsinprocess:number = 0;
  attendedcomplaints:number = 0;

  from : string = '';
  to : string = '';
  state : string='-1';

  ComplainInformation:boolean = false;
  ComplainEdit:boolean = false;


  constructor( private _UsuarioService: UsuarioService,
    private _ComplainService: ComplainService) {
     }

  ngOnInit(): void {
    this.start();
  }



  start() {
    this.Person= new Persona(0,'','','','','','',);
    this.complain=new Complain(0,'','',0,0,'','',0,'');
    this.ComplainInformation=false
    this.from= '';
    this.to = '';
    this.state = '-1'
    this.allcomplains();
    this.ComplainEdit = false;
  }



allcomplains(){
  this._ComplainService.AllComplains(this.from,this.to,this.state)
  .subscribe(result => {
    var Complains = result.complains;
    this.Complains = Complains;

    this.newcomplaints = result.newcomplaints ;        
    this.complaintsinprocess = result.complaintsinprocess;
    this.attendedcomplaints = result.attendedcomplaints;
  console.log(result);
  
  });
}

  EditComplain(item: any) {
    this.ComplainInformation = true;
    this.ComplainEdit = false;
    this.complain =  item;
    this._UsuarioService.PersonbyId(this.complain.person_Id)
    .subscribe(result=>{
      var Person = result.Persona;
      this.Person = Person;

    });
  }


  ComplainProcess(item: any) {
    this.ComplainInformation = false;
    this.ComplainEdit = true;
    this.complain =  item;
    this._UsuarioService.PersonbyId(this.complain.person_Id)
    .subscribe(result=>{
      var Person = result.Persona;
      this.Person = Person;
  
    });
  }

  save(){

     if(this.complain.state == 'Procesada' && this.complain.Answer == '') {
      Swal.fire('Error','Debe dar una respuesta a la queja','error'); 
     return ;
     }
     else {

      this._ComplainService.UpdateComplainbyAdmin(this.complain)
      .subscribe(result => {
        this.start();
        this.allcomplains();
  
      });
 
     }


 
      
    




  }





}
