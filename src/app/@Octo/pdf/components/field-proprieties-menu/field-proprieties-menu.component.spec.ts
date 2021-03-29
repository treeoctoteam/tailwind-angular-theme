import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldProprietiesMenuComponent } from './field-proprieties-menu.component';

describe('FieldProprietiesMenuComponent', () => {
  let component: FieldProprietiesMenuComponent;
  let fixture: ComponentFixture<FieldProprietiesMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FieldProprietiesMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldProprietiesMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
