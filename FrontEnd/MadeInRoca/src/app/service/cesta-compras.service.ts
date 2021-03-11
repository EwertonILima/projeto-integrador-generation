import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { CestaCompras } from '../model/CestaCompras';

@Injectable({
  providedIn: 'root'
})
export class CestaComprasService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllProdutosComprados(): Observable<CestaCompras[]> {
    return this.http.get<CestaCompras[]>('http://localhost:8080/cesta', this.token)
  }

  postProdutoComprado(produtoComprado: CestaCompras): Observable<CestaCompras> {
    return this.http.post<CestaCompras>('http://localhost:8080/cesta', produtoComprado, this.token)
  }

  deleteProdutoComprado(id: number) {
    return this.http.delete(`http://localhost:8080/cesta/${id}`, this.token)
  }
}
