import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPostComponent } from './info-post.component';

describe('InfoPostComponent', () => {
  let component: InfoPostComponent;
  let fixture: ComponentFixture<InfoPostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoPostComponent]
    });
    fixture = TestBed.createComponent(InfoPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
