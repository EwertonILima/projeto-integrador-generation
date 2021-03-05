import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-meus-produtos',
  templateUrl: './meus-produtos.component.html',
  styleUrls: ['./meus-produtos.component.css'],
})
export class MeusProdutosComponent implements OnInit {
  produto: Produto = new Produto();
  usuario: Usuario = new Usuario();
  idProduto: number; // criado para deletar o produto com referencia de id na modal excluir


  constructor(
    private authService: AuthService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.findUsuarioById();
  }

  findUsuarioById() {
    console.log(environment.id);
    this.authService.getbyIdUser(1).subscribe((resp: Usuario) => {
      this.usuario = resp;
      console.log(this.usuario);
    });
  }

  findProdutoById(id: number) {
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

  getIdProduto(id: number){
    this.idProduto = id;


  }

  delProduto(){  
    this.produtoService.deleteProduto(this.idProduto).subscribe(() => {
      
      this.findUsuarioById();
      alert ('Produto excluído com sucesso!');

    })
  }
}
