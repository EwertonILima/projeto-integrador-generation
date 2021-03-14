import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { CestaCompras } from '../model/CestaCompras';
import { Produto } from '../model/Produto';
import { CestaComprasService } from '../service/cesta-compras.service';
import { ProdutoService } from '../service/produto.service';

@Component({
  selector: 'app-produto-shop',
  templateUrl: './produto-shop.component.html',
  styleUrls: ['./produto-shop.component.css']
})
export class ProdutoShopComponent implements OnInit {
  produto: Produto = new Produto()

  qtdProduto: number = 1
  totalProduto: number

  produtoComprado: CestaCompras = new CestaCompras()

  userTokin = environment.token

  constructor(
    private route: ActivatedRoute,
    private produtoService: ProdutoService,
    private cestaComprasService: CestaComprasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
    let id = this.route.snapshot.params['id']
    this.findByIdProduto(id)
  }

  findByIdProduto(id: number) {
    this.produtoService.getByIdProduto(id).subscribe((resp: Produto) => {
      this.produto = resp
    })
  }

  somaTotal() {
    this.totalProduto = this.produto.preco * this.qtdProduto
  }

  postCestaProdutos(){
    this.somaTotal()
    this.produtoComprado.nome = this.produto.nome
    this.produtoComprado.foto = this.produto.foto
    this.produtoComprado.usuario = this.produto.usuario
    this.produtoComprado.preco = this.totalProduto
    this.produtoComprado.quantidade = this.qtdProduto
    this.produtoComprado.categoria = this.produto.categoria.nome

    this.cestaComprasService.postProdutoComprado(this.produtoComprado).subscribe((resp: CestaCompras) => {
      this.produtoComprado =  resp
      this.produtoComprado = new CestaCompras()
    })
  }
}
