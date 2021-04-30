import { TestBed } from '@angular/core/testing';

import { DashboardDefaultGuard } from './dashboard-default.guard';

describe('DashboardDefaultGuard', () => {
  let guard: DashboardDefaultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DashboardDefaultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
