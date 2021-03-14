import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CestaCompras } from 'src/app/model/CestaCompras';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { CestaComprasService } from 'src/app/service/cesta-compras.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

// paypal
declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

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

  valorCestaProdutos: number = 0
  itemsCestaProdutos: number = 0
  listaCestaCompras: CestaCompras[]

  // paypal
  @ViewChild('paypal', { static: true }) paypalElement!: ElementRef;

  paidFor = false

  constructor(
    public authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    private cestaComprasService: CestaComprasService,
    private alertas: AlertasService
  ) { }


  ngOnInit() {
    this.findByNomeProduto()
    this.limparPesquisar()

    // paypal
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            description: 'Produtos de Hortifruti Made In Roça',
            amount: {
              currency_code: 'BRL',
              value: this.valorCestaProdutos
            }
          }]
        })
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture()
        this.paidFor = true
        console.log(order)
      },
      onError: (err: any) => {
        console.log(err)
      }
    })
      .render(this.paypalElement.nativeElement)

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

  // CESTA DE COMPRAS
  findAllProdutosComprados() {
    this.authService.getbyIdUser(environment.id).subscribe((resp: Usuario) => {
      this.listaCestaCompras = resp.cestaCompras
      console.log(this.listaCestaCompras)
      this.totalProdutos()
    });
  }

  deleteProdutoComprado(idProduto: number) {
    this.cestaComprasService.deleteProdutoComprado(idProduto).subscribe(() => {
      this.findAllProdutosComprados();
      this.alertas.showAlertSuccess('Produto retirado com sucesso da sua cesta!');
    });
  }

  totalProdutos() {
    this.valorCestaProdutos = 0
    this.itemsCestaProdutos = 0
    for (let item of this.listaCestaCompras) {
      this.valorCestaProdutos = this.valorCestaProdutos + item.preco
      this.itemsCestaProdutos = this.itemsCestaProdutos + item.quantidade
    }
  }

}
