import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierTableComponent } from './dossier-table.component';

describe('DossierTableComponent', () => {
  let component: DossierTableComponent;
  let fixture: ComponentFixture<DossierTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
