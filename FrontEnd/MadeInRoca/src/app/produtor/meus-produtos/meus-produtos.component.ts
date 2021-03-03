import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css']
})
export class MeusProdutosComponent implements OnInit {

  usuario: Usuario = new Usuario()
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.findUsuarioById()
  }

  findUsuarioById(){ console.log(environment.id)
    this.authService.getbyIdUser(1).subscribe((resp: Usuario) => {
      this.usuario = resp 
      console.log(this.usuario)
    })
  }

}
