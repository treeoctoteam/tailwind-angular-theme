import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationConfigFormComponent } from './navigation-config-form.component';

describe('NavigationConfigFormComponent', () => {
  let component: NavigationConfigFormComponent;
  let fixture: ComponentFixture<NavigationConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
