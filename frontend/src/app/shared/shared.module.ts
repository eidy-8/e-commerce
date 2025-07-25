import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { FooterRegularComponent } from './components/footer-regular/footer-regular.component';
import { HeaderRegularComponent } from './components/header-regular/header-regular.component';
import { HeaderSubLoggedComponent } from './components/header-sub-logged/header-sub-logged.component';
import { HeaderSubNotLoggedComponent } from './components/header-sub-not-logged/header-sub-not-logged.component';
import { CarouselCardComponent } from './components/reusable/carousel-card/carousel-card.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { YouTubePlayer } from '@angular/youtube-player';
import { FooterDynamicComponent } from './components/reusable/footer-dynamic/footer-dynamic.component';
import { HeaderComponent } from './components/header/header.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';
import { LoadingOverlayComponent } from './components/reusable/loading-overlay/loading-overlay.component';
import { ModalComponent } from './components/reusable/modal/modal.component';
import { ToasterComponent } from './components/reusable/toaster/toaster.component';
import { SlidableMenuComponent } from './components/reusable/slidable-menu/slidable-menu.component';
import { SideMenuComponent } from './components/reusable/side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { ProductManagerComponent } from './components/product-manager/product-manager.component';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { SearchBarComponent } from './components/reusable/search-bar/search-bar.component';
import { ExpandableSectionComponent } from './components/reusable/expandable-section/expandable-section.component';
import { InfoCardComponent } from './components/reusable/info-card/info-card.component';
import { SearchBarMainComponent } from './components/reusable/search-bar-main/search-bar-main.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { OrderManagerComponent } from './components/order-manager/order-manager.component';

@NgModule({
  declarations: [
    HeaderSearchComponent,
    FooterRegularComponent,
    HeaderRegularComponent,
    HeaderSubLoggedComponent,
    HeaderSubNotLoggedComponent,
    CarouselCardComponent,
    CatalogComponent,
    FooterDynamicComponent,
    HeaderComponent,
    PopupMenuComponent,
    LoadingOverlayComponent,
    ModalComponent,
    ToasterComponent,
    SlidableMenuComponent,
    SideMenuComponent,
    ProductManagerComponent,
    ClickOutsideDirective,
    SearchBarComponent,
    ExpandableSectionComponent,
    InfoCardComponent,
    SearchBarMainComponent,
    ProductCardComponent,
    OrderManagerComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayer,
    RouterModule,
    FormsModule
  ],
  exports: [
    FormsModule,
    HeaderSearchComponent,
    FooterRegularComponent,
    HeaderRegularComponent,
    HeaderSubLoggedComponent,
    HeaderSubNotLoggedComponent,
    CarouselCardComponent,
    CatalogComponent,
    YouTubePlayer,
    FooterDynamicComponent,
    HeaderComponent,
    PopupMenuComponent,
    LoadingOverlayComponent,
    ModalComponent,
    ToasterComponent,
    SlidableMenuComponent,
    SideMenuComponent,
    ProductManagerComponent,
    SearchBarComponent,
    ExpandableSectionComponent,
    InfoCardComponent,
    SearchBarMainComponent,
    ProductCardComponent,
    OrderManagerComponent
  ]
})
export class SharedModule { }
