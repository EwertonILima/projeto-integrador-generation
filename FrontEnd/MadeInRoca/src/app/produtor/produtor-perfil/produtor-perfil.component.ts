import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtor-perfil',
  templateUrl: './produtor-perfil.component.html',
  styleUrls: ['./produtor-perfil.component.css']
})
export class ProdutorPerfilComponent implements OnInit {


  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha:  string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  id = environment.id
  
  ngOnInit() {
    window.scroll(0,0)
    console.log(this.id + "Esse cara aqui é um ID!!!")

   // if(environment.token == '') {
   //   this.router.navigate(['/home'])
 //   }

    

    this.idUsuario = this.route.snapshot.params['id']
    console.log(this.idUsuario)
    this.findByIdUser(this.id)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }


  atualizar() {
    this.usuario.tipoUsuario = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha) {
        alert('As senhas estão incorretas.')
    } else {
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp

          this.router.navigate(['/inicio'])
          alert('Usuario atualizado com sucesso, faça o login novamente.')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0

          this.router.navigate(['/entrar'])
        })
    }
  }

  findByIdUser(id: number) {
    this.authService.getbyIdUser(id).subscribe((resp: Usuario) => {
      this.usuario = resp
      console.log(this.usuario)
    })
  }

}
