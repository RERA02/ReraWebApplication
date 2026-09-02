import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoseekerAssessmentComponent } from './Joseeker-assessment.component';

describe('JoseekerAssessmentComponent', () => {
  let component: JoseekerAssessmentComponent;
  let fixture: ComponentFixture<JoseekerAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoseekerAssessmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoseekerAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
