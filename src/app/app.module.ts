import { TuiRootModule } from "@taiga-ui/core";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HeaderComponent } from './shared/layout/header/header.component';
import { FooterComponent } from './shared/layout/footer/footer.component';
import { LayoutComponent } from './views/layout.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule, // AppRoutingModule должен быть подключен позже, чем все остальные модули, иначе роутинг может не работать
    // NgbModule, // автоматически добавился этот модуль, который как раз и нужен для того, чтобы использовать бутстрап
    BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
      TuiRootModule
],
  providers: [],
  bootstrap: [AppComponent], // лучше убрать HeaderComponent, FooterComponent из бутстрап, ведь мы их уже не используем в index.html, иначе будут ошибки в консоли
})
export class AppModule {}
