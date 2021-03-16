import { Component,  ElementRef,  OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Produto } from 'src/app/model/Produto';
import { AuthService } from 'src/app/service/auth.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';
import { CestaCompras } from '../model/CestaCompras';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { CestaComprasService } from '../service/cesta-compras.service';

// paypal
declare var paypal: { Buttons: (arg0: { createOrder: (data: any, actions: any) => any; onApprove: (data: any, actions: any) => Promise<void>; onError: (err: any) => void; }) => { (): any; new(): any; render: { (arg0: any): void; new(): any; }; }; };

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
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
