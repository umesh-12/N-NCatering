import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMenuItemComponent } from './package-menu-item.component';

describe('PackageMenuItemComponent', () => {
  let component: PackageMenuItemComponent;
  let fixture: ComponentFixture<PackageMenuItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageMenuItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageMenuItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
