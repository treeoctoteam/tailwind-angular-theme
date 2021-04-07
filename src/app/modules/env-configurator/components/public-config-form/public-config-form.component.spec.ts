import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicConfigFormComponent } from './public-config-form.component';

describe('LandingConfigFormComponent', () => {
  let component: PublicConfigFormComponent;
  let fixture: ComponentFixture<PublicConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PublicConfigFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
