import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuSinglePageComponent } from './menu-single-page.component';

describe('MenuSinglePageComponent', () => {
  let component: MenuSinglePageComponent;
  let fixture: ComponentFixture<MenuSinglePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuSinglePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuSinglePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
