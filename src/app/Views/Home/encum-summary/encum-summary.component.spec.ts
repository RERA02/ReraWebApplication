import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncumSummaryComponent } from './encum-summary.component';

describe('EncumSummaryComponent', () => {
  let component: EncumSummaryComponent;
  let fixture: ComponentFixture<EncumSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EncumSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncumSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
