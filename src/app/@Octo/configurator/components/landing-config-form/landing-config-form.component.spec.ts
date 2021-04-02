import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingConfigFormComponent } from './landing-config-form.component';

describe('LandingConfigFormComponent', () => {
  let component: LandingConfigFormComponent;
  let fixture: ComponentFixture<LandingConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
