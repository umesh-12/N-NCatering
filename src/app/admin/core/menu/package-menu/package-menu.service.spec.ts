import { TestBed } from '@angular/core/testing';

import { PackageMenuService } from './package-menu.service';

describe('PackageMenuService', () => {
  let service: PackageMenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageMenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
