import { TestBed } from '@angular/core/testing';

import { PublicDefaultGuard } from './public-default.guard';

describe('PublicDefaultGuard', () => {
  let guard: PublicDefaultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PublicDefaultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
