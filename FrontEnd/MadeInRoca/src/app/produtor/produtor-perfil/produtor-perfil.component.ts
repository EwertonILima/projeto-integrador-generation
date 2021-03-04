import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from 'src/app/service/produto.service';

import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtor-perfil',
  templateUrl: './produtor-perfil.component.html',
  styleUrls: ['./produtor-perfil.component.css']
})
export class ProdutorPerfilComponent implements OnInit {

  produto: Produto = new Produto();

  usuario: Usuario = new Usuario()
  idUsuario: number
  confirmarSenha:  string
  tipoUsuario: string

  idProduto: number; // criado para deletar o produto com referencia de id na modal excluir

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  id = environment.id
  nome = environment.nome
  email = environment.usuario
  foto = environment.foto
  
  ngOnInit() {
    window.scroll(0,0)
    console.log(this.id + "Esse cara aqui é um ID!!!")

   // if(environment.token == '') {
   //   this.router.navigate(['/home'])
 //   }

    

    this.idUsuario = this.route.snapshot.params['id']
    console.log(this.idUsuario)
    this.findUsuarioById()
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }


  atualizar() { // PUT de perfil de usuário 
    this.usuario.tipoUsuario = this.tipoUsuario

    console.log(this.usuario)

    if(this.usuario.senha != this.confirmarSenha) {
        alert('As senhas estão incorretas.')
    } else {
        this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
          this.usuario = resp

          alert('Usuario atualizado com sucesso, faça o login novamente.')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
          environment.usuario = ''

          this.router.navigate(['/login'])
        })
    }
  }

  
  findUsuarioById() {
    console.log(environment.id);
    this.authService.getbyIdUser(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp;
      console.log(this.usuario);
    });
  }


  findProdutoById(id: number) { // Produto por ID
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp;
    });
  }

  putProduto() {
    this.produtoService.putProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;
      
      this.findUsuarioById();

      alert('Produto atualizado com sucesso!');
    });
  }

  delProduto(){  
    this.produtoService.deleteProduto(this.idProduto).subscribe(() => {
      
      this.findUsuarioById();
      alert ('Produto excluído com sucesso!');

    })
  }
}
