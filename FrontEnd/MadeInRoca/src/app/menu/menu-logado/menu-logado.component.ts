import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-menu-logado',
  templateUrl: './menu-logado.component.html',
  styleUrls: ['./menu-logado.component.css']
})
export class MenuLogadoComponent implements OnInit {
  
  nomeProd: string
  listaProdutos: Produto[]

  nome = environment.nome
  foto = environment.foto

  constructor(
    public authService: AuthService,
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
