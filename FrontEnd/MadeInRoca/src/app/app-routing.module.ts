import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProdutoShopComponent } from './produto-shop/produto-shop.component';
import { ProdutosComponent } from './produtos/produtos.component';

const routes: Routes = [
 
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'login', component: LoginComponent},
  {path: 'produtos', component: ProdutosComponent},
  {path: 'home', component: HomeComponent},
  {path: 'categoria', component: CategoriaComponent},
  {path: 'produto-shop', component: ProdutoShopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
