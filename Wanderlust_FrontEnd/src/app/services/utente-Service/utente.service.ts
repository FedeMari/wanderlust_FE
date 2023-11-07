import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Utente } from 'src/app/model/utente/utente';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/post/post';

// Se non inserissimo questo codice dovremmo inserirlo in Providers all'interno dell'appComponent
@Injectable({
  providedIn: 'root'
})
export class UtenteService {

  //private http: HttpClient: è il path generale che accomuna tutte le richieste a Utente
  private baseUrl = 'http://localhost:8080/api/v1';
  
  // angular dependency injection - di tipo constructor injection
  constructor(private http: HttpClient) { }

  // REGISTRAZIONE. Lo strano singolo apice si chiama backtick alt-96
  addUtente(utente: Utente): Observable<Utente> {
    return this.http.post<Utente>(`${this.baseUrl}/add/u`, utente);
  }

  //LOGIN.
  loginUtente(utente: Object): Observable<Object> {
    return this.http.post<Object>(`${this.baseUrl}/loginutente`, utente);
  }

  // diversamente dai primi due, trattandosi di un "get" non mettiamo nulla nelle parentesi,
  // non sono richiesti parametri in ingresso.
  // Inoltre è necessario il tipoRestituito Utente[] in quanto anche da BackEnd verrà restituita una Lista
  getAllUtenti(): Observable<Utente[]> {
    return this.http.get<Utente[]>(`${this.baseUrl}/utenti`);
  }

  getUtenteById(utenteId: number): Observable<Utente>{
    return this.http.get<Utente>(`${this.baseUrl}/utente/${utenteId}`);
  }

  // Se mettessi Object avrei poi bisogno di effettuare un type-casting per accedere alle proprietà
  // così invece ci risparmiamo questa operazione
  updateUtente(utente: Utente): Observable<Utente> {
    return this.http.put<Utente>(`${this.baseUrl}/update/u`, utente);
  }

  // Nel caso del delete, non vogliamo sia restituito nulla, quindi settiamo il tutto a void, ma sarà
  // necessario passare l'ID dell'utente per agire
  deleteUtenteById(utenteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/u/${utenteId}`);
  }

  getArticoliUtenteById(utenteId: number): Observable<Utente>{
    return this.http.get<Utente>(`${this.baseUrl}/articoliutente/${utenteId}`);
  }

  getPreferitiUtenteById(utenteId: number): Observable<Utente>{
    return this.http.get<Utente>(`${this.baseUrl}/preferitiutente/${utenteId}`);
  }

  addPreferitoUtenteById(post: Post, utenteId: number): Observable<Utente> {
    return this.http.post<Utente>(`${this.baseUrl}/addpreferito/${utenteId}`, post);
  }

  removePreferitoUtenteById(postId: number, utenteId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/removepreferito/${postId}/${utenteId}`);
  }

}




// Nella programmazione “reattiva” vengono usati termini quali Observable (colui che viene osservato) e 
// Observer (colui che osserva e controlla). Per iniziare a monitorare uno stream di dati è necessario 
// iscriversi ad esso, e questo viene fatto attraverso il metodo subscribe(). Il metodo subscribe() è 
// un metodo dell’oggetto Observable a cui viene passato come parametro un oggetto Observer.

// Un Observable rappresenta una sequenza di valori asincroni nel tempo ossia modalità di trasmissione 
// dati che non dipende dal compiersi di altri processi.

// All’interno dell’oggetto Observer è possibile definire fino 3 funzioni di callback: next(), error() e 
// complete(). Queste funzioni verranno poi invocate quando:
// 1) l’Observable emette un valore. È qui che gestiamo i dati ricevuti e compiamo le azioni desiderate.
// 2) l’Observable emette un’ errore e termina. Possiamo utilizzarla per gestire gli errori.
// 3) l’Observable viene chiuso e non saranno più emessi valori. È un'opzione facoltativa e viene utilizzata 
//    principalmente per eseguire operazioni di pulizia o di conclusione.