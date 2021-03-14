import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { EmailDTO } from '../model/EmailDTO';
import { UserLogin } from '../model/UserLogin';
import { Usuario } from '../model/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  listaUsuarios: Usuario[]

  constructor(
    private http: HttpClient
  ) { }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('http://localhost:8080/usuarios/logar', userLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>('http://localhost:8080/usuarios/cadastrar', usuario)
  }


  resetarSenha(email: EmailDTO){
    return this.http.post<EmailDTO>('http://localhost:8080/usuarios/esqueciasenha', email)
  }

  getbyIdUser(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`http://localhost:8080/usuarios/${id}`)

  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>("http://localhost:8080/usuarios")
  }

  deleteUsuario(id: number) {
    return this.http.delete(`http://localhost:8080/usuarios/${id}`)
  }

  logado() {
    let ok: boolean = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

  deslogado() {
    let ok: boolean = true

    if (environment.token != '') {
      ok = false
    }

    return ok
  }



  validaAdm() {

    let ok: boolean = false

    if (environment.tipoUsuario == 'admin') {
      ok = true

    }
    // console.log (ok)
    return ok
  }



}



