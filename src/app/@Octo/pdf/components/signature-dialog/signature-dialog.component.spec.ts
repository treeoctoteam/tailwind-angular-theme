import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignatureDialogComponent } from './signature-dialog.component';

describe('SignatureDialogComponent', () => {
  let component: SignatureDialogComponent;
  let fixture: ComponentFixture<SignatureDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignatureDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignatureDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
