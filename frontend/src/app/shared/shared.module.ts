import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderSearchComponent } from './components/header-search/header-search.component';
import { FooterRegularComponent } from './components/footer-regular/footer-regular.component';
import { HeaderRegularComponent } from './components/header-regular/header-regular.component';
import { HeaderSubLoggedComponent } from './components/header-sub-logged/header-sub-logged.component';

@NgModule({
  declarations: [
    HeaderSearchComponent,
    FooterRegularComponent,
    HeaderRegularComponent,
    HeaderSubLoggedComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    HeaderSearchComponent,
    FooterRegularComponent,
    HeaderRegularComponent,
    HeaderSubLoggedComponent
  ]
})
export class SharedModule { }
