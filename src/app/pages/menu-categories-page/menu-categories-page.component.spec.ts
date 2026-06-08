import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuCategoriesPageComponent } from './menu-categories-page.component';

describe('MenuCategoriesPageComponent', () => {
  let component: MenuCategoriesPageComponent;
  let fixture: ComponentFixture<MenuCategoriesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuCategoriesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuCategoriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
