import { TestBed } from '@angular/core/testing';

import { DashboardConfigService } from './dashboard-config.service';

describe('DashboardConfigService', () => {
  let service: DashboardConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
