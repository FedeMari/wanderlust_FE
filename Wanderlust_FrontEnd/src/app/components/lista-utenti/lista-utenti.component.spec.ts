import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaUtentiComponent } from './lista-utenti.component';

describe('ListaUtentiComponent', () => {
  let component: ListaUtentiComponent;
  let fixture: ComponentFixture<ListaUtentiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaUtentiComponent]
    });
    fixture = TestBed.createComponent(ListaUtentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
