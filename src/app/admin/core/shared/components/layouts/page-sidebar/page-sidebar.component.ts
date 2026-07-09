import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-page-sidebar',
  standalone: true,
  imports: [RouterLink, CommonModule, MatExpansionModule, NgbDropdownModule],
  templateUrl: './page-sidebar.component.html',
})
export class PageSidebarComponent implements AfterViewInit {
  @Input() isSidebarCollapsed: boolean = false;
  @Input() isToggle: boolean = false;

  panelOpenState = signal(false);

  @Output() menuToggle = new EventEmitter<void>();

  constructor(private router: Router) { }

  onHamburgerClick() {
    this.menuToggle.emit();
  }

  ngAfterViewInit(): void {
    this.collapseSidebar();
  }

  closeMenu() {
    this.isSidebarCollapsed = true;
  }

  collapseSidebar() {
    const component: any = this;

    $('.mat-expansion-panel ').on('click', function () {

      setTimeout(() => {
        if ($('.layout-sidenav').hasClass('collapsed')) {
          component.onHamburgerClick();

          console.log('collapsed aayo');
        } else {
        }
      });
    });
  }



  handleSubMenuClick(formName: any, menuName: any) {
    formName && menuName
      ? localStorage.setItem(
        'pageHeadTab',
        JSON.stringify({
          formName: formName,
          menuName: menuName,
        }),
      )
      : null;
  }


  MenuList: any[] = [
    {
      menuId: 1,
      menuName: 'Menu',
      menuIcon: 'ri-shopping-bag-3-line',
      path: '/menu-item',
      shortCutKey: '',
      formName: 'Product',
      extra1: 'next',
      children: [
        {
          menuId: 1.1,
          menuName: 'Menu Item',
          menuIcon: 'ri-shopping-bag-3-line',
          path: 'menu/menu-item',
          shortCutKey: '',
          formName: 'Product',
          extra1: 'next',
        },
        {
          menuId: 1.2,
          menuName: 'Menu Category',
          menuIcon: 'ri-price-tag-3-line',
          path: 'menu/menu-category',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
        {
          menuId: 1.3,
          menuName: 'Package',
          menuIcon: 'ri-price-tag-3-line',
          path: 'menu/package',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
        {
          menuId: 1.4,
          menuName: 'Package Menu',
          menuIcon: 'ri-price-tag-3-line',
          path: 'menu/package-menu',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
      ]
    },
    {
      menuId: 2,
      menuName: 'Gallery',
      menuIcon: 'ri-price-tag-3-line',
      path: '/gallery-Item',
      shortCutKey: '',
      formName: 'Category',
      extra1: 'next',
      children: [

        {
          menuId: 2.1,
          menuName: 'Gallery Item',
          menuIcon: 'ri-price-tag-3-line',
          path: 'gallery/gallery-item',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
        {
          menuId: 2.2,
          menuName: 'Gallery Category',
          menuIcon: 'ri-price-tag-3-line',
          path: 'gallery/gallery-category',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
        {
          menuId: 2.3,
          menuName: 'Gallery Featured',
          menuIcon: 'ri-price-tag-3-line',
          path: 'gallery/gallery-featured',
          shortCutKey: '',
          formName: 'Category',
          extra1: 'next',
        },
      ],
    },

    {
      menuId: 6,
      menuName: 'Orders',
      menuIcon: 'ri-price-tag-3-line',
      path: '/admin-orders',
      shortCutKey: '',
      formName: 'Category',
      extra1: 'next',
    }
  ];
}
