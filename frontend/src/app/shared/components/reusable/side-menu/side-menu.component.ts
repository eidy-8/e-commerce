import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @Input() menuTitle: string = 'Menu';
  @Input() menuItems: MenuItem[] = [];

  toggleItem(item: MenuItem) {
    item.expanded = !item.expanded;
  }
}

export interface MenuItem {
  label: string;
  icon?: string;
  expanded?: boolean;
  children: SubMenuItem[];
}

export interface SubMenuItem {
  label: string;
  link: string;
}
