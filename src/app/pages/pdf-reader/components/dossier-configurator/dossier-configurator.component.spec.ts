import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierConfiguratorComponent } from './dossier-configurator.component';

describe('DossierConfiguratorComponent', () => {
  let component: DossierConfiguratorComponent;
  let fixture: ComponentFixture<DossierConfiguratorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DossierConfiguratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DossierConfiguratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
