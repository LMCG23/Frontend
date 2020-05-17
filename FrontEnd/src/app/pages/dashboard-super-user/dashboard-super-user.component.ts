import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';


import { News } from 'src/app/models/News.model';
import { NewService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard-super-user',
  templateUrl: './dashboard-super-user.component.html',
  styleUrls: ['./dashboard-super-user.component.css']
})
export class DashboardSuperUserComponent implements OnInit {

  Noticias: News[] = [];
  outstandingcomplaints:number = 0;
  outstandingdenounces:number = 0;
  attendedcomplaints:number = 0;
  attendeddenounces:number = 0;
  constructor(private _NewService: NewService
    ) 
  { }

  ngOnInit() {

    this.getNews();


  }


  getNews(){
    this._NewService.ObtenerNoticias()
    .subscribe(result => {

      var Noticias = result.Noticias;
      this.Noticias = Noticias;
      

    });

  }




}
