import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoUtenteComponent } from './info-utente.component';

describe('InfoUtenteComponent', () => {
  let component: InfoUtenteComponent;
  let fixture: ComponentFixture<InfoUtenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoUtenteComponent]
    });
    fixture = TestBed.createComponent(InfoUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
