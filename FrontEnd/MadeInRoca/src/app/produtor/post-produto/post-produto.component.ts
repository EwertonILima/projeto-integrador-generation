import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-post-produto',
  templateUrl: './post-produto.component.html',
  styleUrls: ['./post-produto.component.css']
})
export class PostProdutoComponent implements OnInit {

  produto: Produto = new Produto()
  listaCategoria: Categoria[]
  idCategoria: number

  usuario: Usuario = new Usuario()
  
  categoria: Categoria = new Categoria()

  idUsuario = environment.id

  constructor(
    private produtoService: ProdutoService,
    private auth: AuthService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.getAllCategoria()
    this.findByIdUsuario()
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
      alert('getallCategoriaOK')
    })
  }

  findByIdCategoria() {
      this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) =>{
        this.categoria = resp
        alert('ByidCategoriaOk')
      })
  }

  findByIdUsuario() {
    this.auth.getbyIdUser(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
      alert('findByIdUsuarioOk')
    })
  }

  cadastrarProduto() {
    this.categoria.id = this.idCategoria

    this.produto.categoria = this.categoria

    this.usuario.id = this.idUsuario

    this.produto.usuario = this.usuario

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      alert('Seu produto foi cadastrado com sucesso!')
      this.produto = new Produto
      alert('cadastrarOK')
    })
  }
}
