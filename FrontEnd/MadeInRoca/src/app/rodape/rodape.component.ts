import { Component, OnInit } from '@angular/core';
import { Produto } from '../model/Produto';

@Component({
  selector: 'app-rodape',
  templateUrl: './rodape.component.html',
  styleUrls: ['./rodape.component.css']
})
export class RodapeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  newsletter(){
    if((<HTMLSelectElement>document.getElementById('nome')).value != '' &&
        (<HTMLSelectElement>document.getElementById('email')).value != ''){
          alert("Prontinho! Voce receberá as novidades por email.")
        }else{
          alert("Por favor, preencha os campos nome e email")
        } 
       
  }

}
