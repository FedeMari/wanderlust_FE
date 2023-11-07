import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Categoria } from 'src/app/model/categoria/categoria';
import { Immagine } from 'src/app/model/immagine/immagine';
import { Post } from 'src/app/model/post/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private baseUrl = 'http://localhost:8080/api/v2';
  
  // angular dependency injection - di tipo constructor injection
  constructor(private http: HttpClient) { }

  addPost(post: Post, utenteId: number): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/add/p/${utenteId}`, post);
  }

  public getAllPosts(): Observable<Post[]>{
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  getPostById(postId: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseUrl}/post/${postId}`);
  }

  //flusso asincrono di valori di tipo stringa.
  getAutorePostById(postId: number): Observable<string>{
    return this.http.get<any>(`${this.baseUrl}/autorePost/${postId}`)
    .pipe(
      map(response => response.autore as string)
    );
  }

  //Nel caso di piu categorie prova: Observable<{ [key: string]: string }> 
  // map(response => response as { [key: string]: string })
  getCategoriePostById(postId: number): Observable<string>{
    return this.http.get<any>(`${this.baseUrl}/categoriepost/${postId}`)
    .pipe(
      map(response => response.categorie as string)
    );
  }

  getImmaginiPostById(postId: number): Observable<Post>{
    return this.http.get<Post>(`${this.baseUrl}/immaginipost/${postId}`);
  }

  updatePost(post: Post, utenteId: number): Observable<Post> {
    return this.http.put<Post>(`${this.baseUrl}/update/p/${utenteId}`, post);
  }

  deletePostById(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/p/${postId}`);
  }

  addCategoriePostById(postId: number, categoria: Categoria): Observable<Post> {
    return this.http.post<Post>(`${this.baseUrl}/addcategoria/${postId}`, categoria);
  }

}
