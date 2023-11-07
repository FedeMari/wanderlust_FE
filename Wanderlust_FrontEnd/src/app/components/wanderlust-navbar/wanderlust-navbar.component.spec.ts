import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderlustNavbarComponent } from './wanderlust-navbar.component';

describe('WanderlustNavbarComponent', () => {
  let component: WanderlustNavbarComponent;
  let fixture: ComponentFixture<WanderlustNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WanderlustNavbarComponent]
    });
    fixture = TestBed.createComponent(WanderlustNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
