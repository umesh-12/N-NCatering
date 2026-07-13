import { TestBed } from '@angular/core/testing';

import { PackageMenuItemService } from './package-menu-item.service';

describe('PackageMenuItemService', () => {
  let service: PackageMenuItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PackageMenuItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
