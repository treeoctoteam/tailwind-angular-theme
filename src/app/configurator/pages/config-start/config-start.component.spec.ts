import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigStartComponent } from './config-start.component';

describe('ConfigStartComponent', () => {
  let component: ConfigStartComponent;
  let fixture: ComponentFixture<ConfigStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfigStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
