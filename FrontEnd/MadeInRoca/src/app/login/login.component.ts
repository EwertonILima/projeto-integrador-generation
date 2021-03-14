import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { EmailDTO } from '../model/EmailDTO';
import { UserLogin } from '../model/UserLogin';

import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userLogin: UserLogin = new UserLogin()
  emailDTO: EmailDTO = new EmailDTO()

  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp

      environment.token = this.userLogin.token
      environment.nome = this.userLogin.nome
      environment.foto = this.userLogin.foto
      environment.id = this.userLogin.id
      environment.usuario = this.userLogin.usuario
      environment.tipoUsuario = this.userLogin.tipoUsuario

      this.router.navigate(['/home'])

    }, erro => {
      if(erro.status == 500){
        this.alertas.showAlertDanger('Usuário e/ou senha não encontrados.')
      }
    })
  }

esqueciSenha(){
 
  this.auth.resetarSenha(this.emailDTO).subscribe((resp: EmailDTO) =>{
    this.emailDTO = resp

    let atraso=500; //1 segundo
    setTimeout(function(){
      window.location.reload()
    },atraso);

    
    alert('A nova senha foi enviada para o seu email')
  


    
  }, erro => {
    if(erro.status == 500){
      this.alertas.showAlertDanger('Email não encontrado.')
    }
    else if(erro.status == 400){
      this.alertas.showAlertDanger('Formato de e-mail inválido')
    }
  
  })
}


}
