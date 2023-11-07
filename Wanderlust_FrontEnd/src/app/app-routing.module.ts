import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrazioneUtenteComponent } from './components/registrazione-utente/registrazione-utente.component';
import { LoginUtenteComponent } from './components/login-utente/login-utente.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginFilterService } from './utilities/login-filter/login-filter.service';
import { ListaUtentiComponent } from './components/lista-utenti/lista-utenti.component';
import { DettagliUtenteComponent } from './components/dettagli-utente/dettagli-utente.component';
import { ListaPostComponent } from './components/lista-post/lista-post.component';
import { IMieiPostComponent } from './components/i-miei-post/i-miei-post.component';
import { IMieiPreferitiComponent } from './components/i-miei-preferiti/i-miei-preferiti.component';
import { InfoUtenteComponent } from './components/info-utente/info-utente.component';
import { AdminFilterService } from './utilities/admin-filter/admin-filter.service';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';
import { InfoPostComponent } from './components/info-post/info-post.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { PostManagementComponent } from './components/post-management/post-management.component';

//, canActivate:[LoginFilterService]  --> Incolla sui path dove non vuoi andare senza ci sia un Login 
const routes: Routes = [
  { path: 'registrazione', component: RegistrazioneUtenteComponent },
  { path: 'login', component: LoginUtenteComponent},
  { path: 'homepage', component: HomePageComponent},
  { path: 'terminidiutilizzo', component: TermsOfServiceComponent},
  { path: 'privacy', component: PrivacyPolicyComponent},
  { path: 'listautenti', component: ListaUtentiComponent, canActivate:[AdminFilterService]},
  { path: 'dettagliutente/:id', component: DettagliUtenteComponent, canActivate:[AdminFilterService]},
  { path: 'dettaglipost/:id', component: InfoPostComponent, canActivate:[LoginFilterService]},
  { path: 'listapost', component: ListaPostComponent},
  { path: 'mieiarticoli', component: IMieiPostComponent, canActivate:[LoginFilterService]},
  { path: 'mieipreferiti', component: IMieiPreferitiComponent, canActivate:[LoginFilterService]},
  { path: 'mioaccount/:id', component: InfoUtenteComponent , canActivate:[LoginFilterService]},
  { path: 'adminpage', component: AdminPageComponent, canActivate:[AdminFilterService]},
  { path: 'gestionepost', component: PostManagementComponent, canActivate:[AdminFilterService]},
  { path: '', redirectTo: 'homepage', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
