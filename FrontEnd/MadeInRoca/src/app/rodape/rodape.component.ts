import { Component, OnInit } from '@angular/core';

import { Produto } from '../model/Produto';

import { AlertasService } from '../service/alertas.service';
 

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})

export class RodapeComponent implements OnInit {

  constructor(
    private alertas: AlertasService
  ) { }

  ngOnInit(): void {
  }


  newsletter(){
    if((<HTMLSelectElement>document.getElementById('nome')).value != '' &&
        (<HTMLSelectElement>document.getElementById('email')).value != ''){
          this.alertas.showAlertSuccess("Prontinho! Voce receberá as novidades por email.")
        }else{
          this.alertas.showAlertDanger("Por favor, preencha os campos nome e email")
        } 
       
  }

}
