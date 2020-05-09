import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';


import { News } from 'src/app/models/News.model';
import { NewService } from 'src/app/services/service.index';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


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
    this.cardData();

  }


  getNews(){
    this._NewService.ObtenerNoticias()
    .subscribe(result => {

      var Noticias = result.Noticias;
      this.Noticias = Noticias;
      

    });

  }



  cardData(){
    this._NewService.CardData()
    .subscribe(result => {
      this.outstandingcomplaints = result.outstandingcomplaints;
      this.outstandingdenounces = result.outstandingdenounces;
      this.attendedcomplaints = result.attendedcomplaints;
      this.attendeddenounces = result.attendeddenounces;
    
      

    });



  }











}
