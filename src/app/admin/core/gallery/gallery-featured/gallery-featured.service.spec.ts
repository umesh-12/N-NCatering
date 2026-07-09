import { TestBed } from '@angular/core/testing';

import { GalleryFeaturedService } from './gallery-featured.service';

describe('GalleryFeaturedService', () => {
  let service: GalleryFeaturedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryFeaturedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
