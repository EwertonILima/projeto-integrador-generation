import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../model/Categoria';
import { Produto } from '../model/Produto';
import { CategoriaService } from '../service/categoria.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  listaProdutos: Produto[]
  nomeProd: string

  categoria: Categoria = new Categoria
  listaCategoria: Categoria[]

  key: string
  reverse: boolean

  all: boolean = true

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService
  ) { }

  ngOnInit() {
    this.getAllProdutos()
  }
  getAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {
      this.listaProdutos = resp
    })
  }

  findByNomeProduto() {
    this.all = true
    
    if (this.nomeProd == '') {
      this.getAllProdutos()
    }
    else {
      this.produtoService.getByNomeProduto(this.nomeProd).subscribe((resp: Produto[]) => {
        this.listaProdutos = resp
      })
    }
  }

  orderByAz() {
    this.key = 'nome'
    this.reverse = false
  }

  orderByZa() {
    this.key = 'nome'
    this.reverse = true
  }

  orderByMaiorPreco() {
    this.key = 'preco'
    this.reverse = true
  }
  orderByMenorPreco() {
    this.key = 'preco'
    this.reverse = false
  }

  getAllCategorias(){
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
  }

  findByNomeCategoria(nome: string) {
    this.all = false
    if(nome == ''){
      this.getAllProdutos()
      this.all = true
    }
    this.categoriaService.getByNomeCategoria(nome).subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp
    })
    this.listaCategoria = []
  }
}



