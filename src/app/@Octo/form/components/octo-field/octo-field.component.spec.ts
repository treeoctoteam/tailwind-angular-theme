import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OctoFieldComponent } from './octo-field.component';

describe('OctFieldComponent', () => {
  let component: OctoFieldComponent;
  let fixture: ComponentFixture<OctoFieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OctoFieldComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OctoFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
