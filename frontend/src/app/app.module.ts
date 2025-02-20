import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { provideAnimations } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    PublicModule,
    PrivateModule
  ],
  providers: [provideHttpClient(), provideAnimations()],
  bootstrap: [AppComponent]
})
export class AppModule { }
