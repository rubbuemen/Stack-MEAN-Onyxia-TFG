import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


//Módulos
import { AppRoutingModule } from './app-routing.module';
import { PagesPublicModule } from './pages/pages.public.module';
import { PagesPrivateModule } from './pages/pages.private.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './error/error.component';
import { CookiesAlertComponent } from './components/cookies-alert/cookies-alert.component';

//Servicios
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [AppComponent, ErrorComponent, CookiesAlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesPublicModule,
    PagesPrivateModule,
    AuthModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule { }
