import { TestBed } from '@angular/core/testing';

import { GalleryPageService } from './gallery-page.service';

describe('GalleryPageService', () => {
  let service: GalleryPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GalleryPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
