import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioJingles } from './audio-jingles';

describe('AudioJingles', () => {
  let component: AudioJingles;
  let fixture: ComponentFixture<AudioJingles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AudioJingles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioJingles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
