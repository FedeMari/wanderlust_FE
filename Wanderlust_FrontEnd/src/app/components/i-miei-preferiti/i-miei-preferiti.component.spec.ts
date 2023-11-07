import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMieiPreferitiComponent } from './i-miei-preferiti.component';

describe('IMieiPreferitiComponent', () => {
  let component: IMieiPreferitiComponent;
  let fixture: ComponentFixture<IMieiPreferitiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IMieiPreferitiComponent]
    });
    fixture = TestBed.createComponent(IMieiPreferitiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
