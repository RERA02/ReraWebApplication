import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PASummaryComponent } from './pa-summary.component';

describe('PASummaryComponent', () => {
  let component: PASummaryComponent;
  let fixture: ComponentFixture<PASummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PASummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PASummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
