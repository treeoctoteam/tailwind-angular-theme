import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNavigationConfigFormComponent } from './table-navigation-config-form.component';

describe('TableNavigationConfigFormComponent', () => {
  let component: TableNavigationConfigFormComponent;
  let fixture: ComponentFixture<TableNavigationConfigFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableNavigationConfigFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableNavigationConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
