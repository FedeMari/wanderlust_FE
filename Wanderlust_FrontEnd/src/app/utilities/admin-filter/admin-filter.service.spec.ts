import { TestBed } from '@angular/core/testing';

import { AdminFilterService } from './admin-filter.service';

describe('AdminFilterService', () => {
  let service: AdminFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
