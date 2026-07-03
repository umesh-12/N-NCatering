import { TestBed } from '@angular/core/testing';

import { MenuSingleService } from './menu-single.service';

describe('MenuSingleService', () => {
  let service: MenuSingleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuSingleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
