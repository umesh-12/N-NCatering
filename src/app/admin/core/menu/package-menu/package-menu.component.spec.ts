import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageMenuComponent } from './package-menu.component';

describe('PackageMenuComponent', () => {
  let component: PackageMenuComponent;
  let fixture: ComponentFixture<PackageMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackageMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackageMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
