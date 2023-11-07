import { TestBed } from '@angular/core/testing';

import { ImmagineService } from './immagine.service';

describe('ImmagineService', () => {
  let service: ImmagineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImmagineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
