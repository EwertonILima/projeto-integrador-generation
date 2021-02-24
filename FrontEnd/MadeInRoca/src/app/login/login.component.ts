import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogin } from '../model/UserLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  userLogin: UserLogin = new UserLogin

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar() {
    this.auth.entrar(this.userLogin).subscribe((resp: UserLogin) =>{
      this.userLogin = resp

      this.router.navigate(['/home'])

    }, erro => {
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos.')
      }
    })
  }
}
