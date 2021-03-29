import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfActionsComponent } from './pdf-actions.component';

describe('PdfActionsComponent', () => {
  let component: PdfActionsComponent;
  let fixture: ComponentFixture<PdfActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
