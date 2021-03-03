import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';

@Component({
  selector: 'app-produtor-perfil',
  templateUrl: './produtor-perfil.component.html',
  styleUrls: ['./produtor-perfil.component.css']
})
export class ProdutorPerfilComponent implements OnInit {


  categoria: Categoria = new Categoria()
  
  constructor() { }

  ngOnInit() {
  }

}
