import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialModificationProfileSummaryWebSiteComponent } from './special-modification-profile-summary-web-site.component';

describe('SpecialModificationProfileSummaryWebSiteComponent', () => {
  let component: SpecialModificationProfileSummaryWebSiteComponent;
  let fixture: ComponentFixture<SpecialModificationProfileSummaryWebSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SpecialModificationProfileSummaryWebSiteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialModificationProfileSummaryWebSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
