import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaxBannerComponent } from './max-banner.component';

describe('MaxBannerComponent', () => {
  let component: MaxBannerComponent;
  let fixture: ComponentFixture<MaxBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaxBannerComponent]
    });
    fixture = TestBed.createComponent(MaxBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
