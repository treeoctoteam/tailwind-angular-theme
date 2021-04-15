import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewUserComponent } from './overview-user.component';

describe('OverviewUserComponent', () => {
  let component: OverviewUserComponent;
  let fixture: ComponentFixture<OverviewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverviewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
