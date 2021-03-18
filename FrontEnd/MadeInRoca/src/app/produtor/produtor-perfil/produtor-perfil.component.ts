import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/model/Categoria';
import { CestaCompras } from 'src/app/model/CestaCompras';
import { Produto } from 'src/app/model/Produto';
import { Usuario } from 'src/app/model/Usuario';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { CategoriaService } from 'src/app/service/categoria.service';
import { CestaComprasService } from 'src/app/service/cesta-compras.service';
import { ProdutoService } from 'src/app/service/produto.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-produtor-perfil',
  templateUrl: './produtor-perfil.component.html',
  styleUrls: ['./produtor-perfil.component.css'],
})
export class ProdutorPerfilComponent implements OnInit {
  produto: Produto = new Produto();
  listaProdutos: Produto[];
  idProduto: number; // criado para deletar o produto com referencia de id na modal excluir

  usuario: Usuario = new Usuario();
  idUsuario: number;
  confirmarSenha: string;
  listaUsuarios: Usuario[];

  categoria: Categoria = new Categoria();
  idCategoria: number;
  listaCategoria: Categoria[];

  tamListaProdutos: number = 0

  constructor(
    private authService: AuthService,
    private router: Router,
    private produtoService: ProdutoService,
    private categoriaService: CategoriaService,
    private alertas: AlertasService,
    private route: ActivatedRoute
  ) { }

  id = environment.id;
  nome = environment.nome;
  email = environment.usuario;
  foto = environment.foto;
  tipoUsuario = environment.tipoUsuario

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertDanger('Faça login para acessar esta pagina.');
      this.router.navigate(['/home']);
    }
    this.getAllCategoria()
    this.findUsuarioById()
    this.findAllCategoria()
    this.getAllUsuarios()
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }


  // ATUALIZAR DADOS PESSOAIS
  atualizar() {

    this.usuario.tipoUsuario = environment.tipoUsuario
    console.log(this.usuario)
    if (this.usuario.senha != this.confirmarSenha) {
      this.alertas.showAlertDanger('As senhas estão incorretas.');
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp;

        this.alertas.showAlertSuccess(
          'Usuario atualizado com sucesso, faça o login novamente.'
        );
        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        environment.usuario = '';

        this.router.navigate(['/login']);
      });
    }
  }

  findUsuarioById() {
    console.log(environment.id);
    this.authService.getbyIdUser(environment.id).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  getAllUsuarios() {
    this.authService.getAllUsuarios().subscribe((resp: Usuario[]) => {
      this.listaUsuarios = resp;
    })
  }

  // ATUALIZAR PRODUTOS
  getIdProduto(id: number) {
    this.idProduto = id;
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
      this.alertas.showAlertSuccess('Produto atualizado com sucesso!');
    });
  }

  delProduto() {
    this.produtoService.deleteProduto(this.idProduto).subscribe(() => {
      this.findUsuarioById();
      if (this.tipoUsuario == 'adm') {
        this.getAllProdutos();
      }
      this.alertas.showAlertSuccess('Produto excluído com sucesso!');
    });
  }


  // POST NOVO PRODUTO
  getAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }

  findByIdCategoria() {
    this.categoriaService
      .getByIdCategoria(this.idCategoria)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;
      });
  }

  cadastrarProduto() {
    console.log(this.produto);
    this.categoria.id = this.idCategoria;
    this.produto.categoria = this.categoria;
    this.usuario.id = environment.id;
    this.produto.usuario = this.usuario;

    this.produtoService.postProduto(this.produto).subscribe((resp: Produto) => {
      this.produto = resp;
      this.alertas.showAlertSuccess('Seu produto foi cadastrado com sucesso!');
      this.findUsuarioById();
      this.produto = new Produto();
    });
  }

  // GET DE ADM
  getAllProdutos() {
    this.produtoService.getAllProdutos().subscribe((resp: Produto[]) => {

      this.listaProdutos = resp
      this.tamListaProdutos = this.listaProdutos.length
    })
  }

  getIdUsuario(id: number) {
      this.idUsuario = id
    
  }

  cadastrarCategoria() {
    this.categoriaService.postCategoria(this.categoria).subscribe((resp: Categoria) => {
      this.categoria = resp;
      this.alertas.showAlertSuccess('Categoria cadastrada com sucesso!');
      this.findAllCategoria();
      this.categoria = new Categoria();
    });
  }

  findAllCategoria() {
    this.categoriaService.getAllCategoria().subscribe((resp: Categoria[]) => {
      this.listaCategoria = resp;
    });
  }

  getIdCategoria(id: number) {
    this.idCategoria = id;
  }

  delCategoria() {
    this.categoriaService.deleteCategoria(this.idCategoria).subscribe(() => {
      this.findAllCategoria();
      this.alertas.showAlertSuccess('Categoria excluído com sucesso!');
    });
  }

  putCategoria() {
    this.categoriaService
      .putCategoria(this.categoria)
      .subscribe((resp: Categoria) => {
        this.categoria = resp;
        this.findAllCategoria();
        this.alertas.showAlertSuccess('Categoria atualizada com sucesso!');
      });
  }
  findCategoriaById(id: number) {
    this.categoriaService.getByIdCategoria(id).subscribe((resp: Categoria) => {
      this.categoria = resp;
    });
  }


  deleteUsuario() {
    return this.authService.deleteUsuario(this.idUsuario).subscribe(() => {
      
      this.getAllUsuarios()
      this.findUsuarioById()
      this.alertas.showAlertSuccess('Usuário deletado com sucesso!');
     
    })
  }

  
}
