import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryFeaturedComponent } from './gallery-featured.component';

describe('GalleryFeaturedComponent', () => {
  let component: GalleryFeaturedComponent;
  let fixture: ComponentFixture<GalleryFeaturedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GalleryFeaturedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryFeaturedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
