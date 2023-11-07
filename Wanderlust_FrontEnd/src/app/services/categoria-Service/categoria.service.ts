import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/model/categoria/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private baseUrl = 'http://localhost:8080/api/v3';

  constructor(private http: HttpClient) { }

  getAllCategorie(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.baseUrl}/categorie`);
  }

}
