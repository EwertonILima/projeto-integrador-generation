import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { Categoria } from '../model/Categoria';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token),
  };

  getAllCategoria(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      'http://localhost:8080/categoria',
      this.token
    );
  }

  getByIdCategoria(id: number): Observable<Categoria> {
    return this.http.get<Categoria>(
      `http://localhost:8080/categoria/${id}`,
      this.token
    );
  }

  postCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(
      'http://localhost:8080/categoria',
      categoria,
      this.token
    );
  }

  getByNomeCategoria(nome: string): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(
      `http://localhost:8080/categoria/nome/${nome}`, this.token
    );
  }

  putCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      'http://localhost:8080/categoria', categoria, this.token
    );
  }

  deleteCategoria(id: number){
    return this.http.delete(
      `http://localhost:8080/categoria/${id}`, this.token
    )
  }

}
