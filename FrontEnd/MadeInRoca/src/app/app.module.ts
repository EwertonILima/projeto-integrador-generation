import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { FaleConoscoComponent } from './fale-conosco/fale-conosco.component';
import { SobreComponent } from './sobre/sobre.component';
import { HomeComponent } from './home/home.component';
import { CestaComponent } from './cesta/cesta.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ProdutoShopComponent } from './produto-shop/produto-shop.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    LoginComponent,
    CadastrarComponent,
    ProdutosComponent,
    FaleConoscoComponent,
    SobreComponent,
    RodapeComponent,
    HomeComponent,
    CestaComponent,
    CategoriaComponent,
    ProdutoShopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
