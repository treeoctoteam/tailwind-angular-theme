import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppConfigFormComponent } from './app-config-form.component';

describe('AppConfigFormComponent', () => {
  let component: AppConfigFormComponent;
  let fixture: ComponentFixture<AppConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
