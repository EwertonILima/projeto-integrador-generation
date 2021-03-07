import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
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

  constructor(
    private produtoService: ProdutoService,
    private auth: AuthService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    this.getAllCategoria()
  }

  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByIdCategoria() {
      this.categoriaService.getByIdCategoria(this.idCategoria).subscribe((resp: Categoria) =>{
        this.categoria = resp
      })
  }

  // findByIdUsuario() {
  //   this.auth.getbyIdUser(this.idUsuario).subscribe((resp: Usuario) => {
  //     this.usuario = resp
  //     alert('findByIdUsuarioOk')
  //   })
  // }

  cadastrarProduto() {
    this.categoria.id = this.idCategoria
    this.produto.categoria = this.categoria
    

    this.usuario.id = environment.id
    this.produto.usuario = this.usuario

    console.log(this.produto)

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp
      this.alertas.showAlertSuccess('Seu produto foi cadastrado com sucesso!')
      
      this.produto = new Produto()
    })
  }
}
