import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {


  usuario: Usuario = new Usuario
  confirmarSenha: string
  tipoUsuario: string
  termos:boolean = true
 

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService 
    
    

  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event : any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }



  cadastrar() {
    this.usuario.tipoUsuario = this.tipoUsuario

    if(this.usuario.senha != this.confirmarSenha) {
     this.alertas.showAlertDanger('As senhas estão incorretas.')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp

        this.router.navigate(['/login'])

        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!') 
      })
    }
  }

  cadastrarCheck(){
    if((<HTMLSelectElement>document.getElementById('nome')).value == '' ||
        (<HTMLSelectElement>document.getElementById('email')).value == '' || (<HTMLSelectElement>document.getElementById('senha')).value == '' || (<HTMLSelectElement>document.getElementById('confirmSenha')).value == ''){
          this.alertas.showAlertDanger("Por favor, preencha os campos")
        } 
  }

 changeEvent(event:any){
   if(event.target.checked){

    this.termos=false
   } else{this.termos=true }


 }

}
 
