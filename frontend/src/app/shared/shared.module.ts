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
import { FooterDynamicComponent } from './components/footer-dynamic/footer-dynamic.component';
import { HeaderComponent } from './components/header/header.component';
import { PopupMenuComponent } from './components/popup-menu/popup-menu.component';

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
    PopupMenuComponent
  ],
  imports: [
    CommonModule,
    YouTubePlayer
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
    PopupMenuComponent
  ]
})
export class SharedModule { }
