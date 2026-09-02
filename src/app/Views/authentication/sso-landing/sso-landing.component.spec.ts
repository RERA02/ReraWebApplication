import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoLandingComponent } from './sso-landing.component';

describe('SsoLandingComponent', () => {
  let component: SsoLandingComponent;
  let fixture: ComponentFixture<SsoLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SsoLandingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SsoLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
