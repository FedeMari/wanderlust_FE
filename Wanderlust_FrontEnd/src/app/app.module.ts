import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { RegistrazioneUtenteComponent } from './components/registrazione-utente/registrazione-utente.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginUtenteComponent } from './components/login-utente/login-utente.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginFilterService } from './utilities/login-filter/login-filter.service';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { SingoloPostComponent } from './components/singolo-post/singolo-post.component';
import { ListaPostComponent } from './components/lista-post/lista-post.component';
import { IMieiPostComponent } from './components/i-miei-post/i-miei-post.component';
import { IMieiPreferitiComponent } from './components/i-miei-preferiti/i-miei-preferiti.component';
import { WanderlustHeaderComponent } from './components/wanderlust-header/wanderlust-header.component';
import { WanderlustNavbarComponent } from './components/wanderlust-navbar/wanderlust-navbar.component';
import { WanderlustFooterComponent } from './components/wanderlust-footer/wanderlust-footer.component';
import { InfoUtenteComponent } from './components/info-utente/info-utente.component';
import { AdminFilterService } from './utilities/admin-filter/admin-filter.service';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfoPostComponent } from './components/info-post/info-post.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { PostManagementComponent } from './components/post-management/post-management.component'; //, TINYMCE_SCRIPT_SRC



@NgModule({
  declarations: [
    AppComponent,
    ListaUtentiComponent,
    RegistrazioneUtenteComponent,
    LoginUtenteComponent,
    HomePageComponent,
    DettagliUtenteComponent,
    SingoloPostComponent,
    ListaPostComponent,
    IMieiPostComponent,
    IMieiPreferitiComponent,
    WanderlustHeaderComponent,
    WanderlustNavbarComponent,
    WanderlustFooterComponent,
    InfoUtenteComponent,
    TermsOfServiceComponent,
    PrivacyPolicyComponent,
    InfoPostComponent,
    AdminPageComponent,
    PostManagementComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    EditorModule
  ],
  providers: [
    LoginFilterService,
    AdminFilterService
    //{provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
