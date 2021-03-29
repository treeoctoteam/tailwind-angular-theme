import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ENActionsButtonsComponent } from './actions-buttons.component';

describe('ActionsButtonsComponent', () => {
  let component: ENActionsButtonsComponent;
  let fixture: ComponentFixture<ENActionsButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ENActionsButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ENActionsButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
