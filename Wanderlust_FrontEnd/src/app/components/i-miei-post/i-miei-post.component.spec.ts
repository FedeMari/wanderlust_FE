import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IMieiPostComponent } from './i-miei-post.component';

describe('IMieiPostComponent', () => {
  let component: IMieiPostComponent;
  let fixture: ComponentFixture<IMieiPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IMieiPostComponent]
    });
    fixture = TestBed.createComponent(IMieiPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
