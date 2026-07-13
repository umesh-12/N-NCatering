export class Endpoint {
    static savePackageMenu = '/api/PackageMenu/save';
    static getPackageMenu = '/api/PackageMenu';
    static getPackageMenuById = '/api/PackageMenu';
    static deletePackageMenuById = '/api/PackageMenu';

    static menuCategory = '/api/MenuCategory'


    // next
    static packageMenuItemList = (packageMenuId: number) =>
        `/api/PackageMenu/${packageMenuId}/menuitems`;

    static MenuItem = '/api/MenuItem'


    static postPackageMenuItem = (packageMenuId: number, menuItemId: number) =>
        `/api/PackageMenu/${packageMenuId}/menuitem/${menuItemId}`;


    static deletePackageMenuItem = (packageMenuId: number, menuItemId: number) =>
        `/api/PackageMenu/${packageMenuId}/menuitem/${menuItemId}`;
}