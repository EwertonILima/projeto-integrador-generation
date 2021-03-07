import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Produto } from '../model/Produto';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {


  listaProdutos: Produto[]
  nomeProd: string

  key: string
  reverse: boolean

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService
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

}



