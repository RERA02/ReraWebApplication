import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevocationSummaryComponent } from './revocation-summary.component';

describe('RevocationSummaryComponent', () => {
  let component: RevocationSummaryComponent;
  let fixture: ComponentFixture<RevocationSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RevocationSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevocationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
