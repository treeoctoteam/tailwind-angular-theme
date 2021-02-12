import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLandingComponent } from './default-landing.component';

describe('DefaultLandingComponent', () => {
  let component: DefaultLandingComponent;
  let fixture: ComponentFixture<DefaultLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
