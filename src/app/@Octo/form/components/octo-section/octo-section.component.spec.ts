import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OctoSectionComponent } from './octo-section.component';

describe('OctSectionComponent', () => {
  let component: OctoSectionComponent;
  let fixture: ComponentFixture<OctoSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OctoSectionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OctoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
