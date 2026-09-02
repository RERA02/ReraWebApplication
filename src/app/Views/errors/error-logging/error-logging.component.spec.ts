import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLoggingComponent } from './error-logging.component';

describe('ErrorLoggingComponent', () => {
  let component: ErrorLoggingComponent;
  let fixture: ComponentFixture<ErrorLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorLoggingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
