import { TestBed } from '@angular/core/testing';

import { LoginFilterService } from './login-filter.service';

describe('LoginFilterService', () => {
  let service: LoginFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
