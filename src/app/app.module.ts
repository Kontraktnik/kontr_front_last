import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import { ServerErrorComponent } from './server-error/server-error.component';
import {ErrorInterceptor} from "./shared/interceptors/error.interceptor";
import {NotFoundComponent} from "./not-found/not-found.component";
import {LoadingInterceptor} from "./shared/interceptors/loading.interceptor";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedModule} from "./shared/shared.module";
import {JwtInterceptor} from "./shared/interceptors/jwt.interceptor";
import { DirectorLayoutComponent } from './director/director-layout/director-layout.component';
import {IMaskModule} from "angular-imask";
import {JWT_OPTIONS} from "@auth0/angular-jwt";
import { TestComponent } from './test/test.component';
import {AppConfigService} from "./shared/services/app.config.service";

import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
export function HttpLoaderFactory(http: HttpClient): TranslateLoader {
  return new TranslateHttpLoader(http, './assets/locale/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ServerErrorComponent,
    NotFoundComponent,
    DirectorLayoutComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    IMaskModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'ru'
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    },
    {
      provide: JWT_OPTIONS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      multi: true,
      deps: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => {
        return () => {
          return appConfigService.loadAppConfig();
        };
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
