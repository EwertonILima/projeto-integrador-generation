import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Produto } from '../model/Produto';
import { AuthService } from '../service/auth.service';
import { ProdutoService } from '../service/produto.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  nomeProd: string
  listaProdutos: Produto[]
  place: string

  constructor(
    public auth: AuthService,
    private router: Router,
    private produtoService: ProdutoService
  ) { }

  ngOnInit() {
    this.findByNomeProduto()
    this.limparPesquisar()
  }

  sair() {
    this.router.navigate(["/home"])
    environment.token = ''
    environment.nome = ''
    environment.foto = ''
    environment.id = 0
  }

  findByNomeProduto() {

      this.produtoService.getByNomeProduto(this.nomeProd).subscribe((resp: Produto[]) => {
        this.listaProdutos = resp
      })
    
  }

  limparPesquisar() {
    this.nomeProd = ''
    this.listaProdutos = []
  }

}


