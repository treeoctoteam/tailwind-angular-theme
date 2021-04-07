import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardConfigFormComponent } from './dashboard-config-form.component';

describe('DashboardConfigFormComponent', () => {
  let component: DashboardConfigFormComponent;
  let fixture: ComponentFixture<DashboardConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
