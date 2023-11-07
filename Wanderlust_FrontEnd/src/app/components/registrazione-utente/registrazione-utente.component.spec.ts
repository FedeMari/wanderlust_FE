import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrazioneUtenteComponent } from './registrazione-utente.component';

describe('RegistrazioneUtenteComponent', () => {
  let component: RegistrazioneUtenteComponent;
  let fixture: ComponentFixture<RegistrazioneUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrazioneUtenteComponent]
    });
    fixture = TestBed.createComponent(RegistrazioneUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
