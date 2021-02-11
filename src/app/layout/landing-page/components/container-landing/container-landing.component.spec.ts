import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLandingComponent } from './container-landing.component';

describe('ContainerLandingComponent', () => {
  let component: ContainerLandingComponent;
  let fixture: ComponentFixture<ContainerLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
