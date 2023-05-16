import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinBannerComponent } from './min-banner.component';

describe('MinBannerComponent', () => {
  let component: MinBannerComponent;
  let fixture: ComponentFixture<MinBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MinBannerComponent]
    });
    fixture = TestBed.createComponent(MinBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
