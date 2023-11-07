import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Immagine } from 'src/app/model/immagine/immagine';
import { Post } from 'src/app/model/post/post';

@Injectable({
  providedIn: 'root'
})
export class ImmagineService {

  private baseUrl = 'http://localhost:8080/api/v4';

  constructor(private http: HttpClient) { }
  
  addImmagine(postId: number, immagine: Immagine): Observable<Immagine> {
    return this.http.post<Immagine>(`${this.baseUrl}/add/i/${postId}`, immagine);
  }

  updateImmagine(postId: number, immagine: Immagine): Observable<Immagine> {
    return this.http.put<Immagine>(`${this.baseUrl}/update/i/${postId}`, immagine);
  }

}
