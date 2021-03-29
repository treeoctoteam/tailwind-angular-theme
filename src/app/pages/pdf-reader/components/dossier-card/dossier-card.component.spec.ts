import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierCardComponent } from './dossier-card.component';

describe('DossierCardComponent', () => {
  let component: DossierCardComponent;
  let fixture: ComponentFixture<DossierCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
