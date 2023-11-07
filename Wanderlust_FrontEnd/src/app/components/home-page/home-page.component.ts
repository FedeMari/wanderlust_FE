import * as AOS from 'aos'; //AOS (Animate On Scroll) 
import { Component, OnInit } from '@angular/core';
import { Utente } from 'src/app/model/utente/utente';



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  utente?: Utente;

  videoPath?: string;
  largeCardTitle?: string;
  largeCardText?: string;
  largeCardDescription?: string;

  constructor() {}

  ngOnInit(): void {
    // Qui decidiamo card e video iniziale
    this.setSelectedCard(this.card2);
    this.videoPath = "/assets/Video/Mare_Video_2.mp4";
    console.log(this.videoPath);
    AOS.init();
  }

  selectedCard: any;

  setSelectedCard(card: any) {
    this.selectedCard = card;
  }

  setVideoBackground(percorsoVideo: string){
    this.videoPath = percorsoVideo;

    
    console.log(this.videoPath);

  }


  card1 = {
    videoPath: '/assets/Video/Animal_Video_1.mp4',
    largeCardTitle: 'Sierra Desert - Marocco',
    largeCardText: 'Marrakech Merzouga',
    largeCardDescription: 'Sabbia dorata e cieli stellati abbracciano il Marrakech Merzouga.'
  };

  card2 = {
    videoPath: '/assets/Video/Mare_Video_2.mp4',
    largeCardTitle: 'Bali - Indonesia',
    largeCardText: 'Isola di Bali',
    largeCardDescription: 'Paradiso tropicale, spiagge incantevoli, Bali dimora di antichi dei e verdi risaie.'
  };

  card3 = {
    videoPath: '/assets/Video/Niagara.mp4',
    largeCardTitle: 'Niagara Falls - USA',
    largeCardText: 'Cascate del Niagara',
    largeCardDescription: 'Potenza e bellezza in un\'incredibile sinfonia di acqua e natura.'
  };

  card4 = {
    videoPath: '/assets/Video/Cappadocia_Video_1.mp4',
    largeCardTitle: 'Cappadocia - Turchia',
    largeCardText: 'Valle di Goreme',
    largeCardDescription: 'Magia e mistero in un paesaggio incantato di roccia e storia, tra le meraviglie della Cappadocia, tra sogno e realtà.'
  };


}


// 1) Prima di tutto, abbiamo installato il pacchetto AOS tramite npm: npm install aos

// 2) Abbiamo installato i tipi di TypeScript per AOS, ma poiché il pacchetto dei tipi ufficiali non era 
//    disponibile, abbiamo creato un file di dichiarazione personalizzato 'aos.d.ts' nella cartella 'src'

// 3) Abbiamo inserito la dichiarazione:  declare module 'aos';
//      ===>  Stiamo dicendo a TypeScript di "fidarsi" che il modulo 'aos' esiste e di non preoccuparsi dei 
//            dettagli di tipi specifici per questo modulo.

// Quando si utilizza un pacchetto JavaScript in un progetto TypeScript, è una buona pratica fornire i tipi 
// dichiarando i moduli corrispondenti tramite file di dichiarazione (.d.ts). Questi file non contengono 
// implementazioni effettive di codice, ma solo informazioni sui tipi che il modulo esporta.

// 4) Dopo in sequenza ---> import * as AOS from 'aos'; 
//                          AOS.init();
//                          data-aos="fade"

// 5) Ngx-gallery è un componente Angular flessibile e facile da usare per creare gallerie di immagini 
//    responsive con effetto lightbox. Questo componente offre funzionalità come la visualizzazione di immagini 
//    ingrandite in una finestra popup, navigazione delle immagini, supporto per dispositivi touchscreen e altro.
// ==> import { NgxGalleryModule } from 'ngx-gallery';