import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from "./shared/shared.module";
import { PublicModule } from './public/public.module';
import { PrivateModule } from './private/private.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Interceptor } from './auth/interceptors/interceptor';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

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
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ), 
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
