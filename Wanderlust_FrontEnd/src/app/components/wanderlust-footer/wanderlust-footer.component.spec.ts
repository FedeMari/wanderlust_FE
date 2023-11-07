import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WanderlustFooterComponent } from './wanderlust-footer.component';

describe('WanderlustFooterComponent', () => {
  let component: WanderlustFooterComponent;
  let fixture: ComponentFixture<WanderlustFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WanderlustFooterComponent]
    });
    fixture = TestBed.createComponent(WanderlustFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
