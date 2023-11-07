import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderlustHeaderComponent } from './wanderlust-header.component';

describe('WanderlustHeaderComponent', () => {
  let component: WanderlustHeaderComponent;
  let fixture: ComponentFixture<WanderlustHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WanderlustHeaderComponent]
    });
    fixture = TestBed.createComponent(WanderlustHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
