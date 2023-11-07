import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingoloPostComponent } from './singolo-post.component';

describe('SingoloPostComponent', () => {
  let component: SingoloPostComponent;
  let fixture: ComponentFixture<SingoloPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SingoloPostComponent]
    });
    fixture = TestBed.createComponent(SingoloPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
