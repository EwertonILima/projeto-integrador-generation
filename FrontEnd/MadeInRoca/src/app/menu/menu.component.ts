import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  
 
  
   id = environment.id
   
  
  
  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
   console.log(this.id)
   
  }


  
}


