import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AlertBySrcComponent } from './components/alert-by-src/alert-by-src.component';
import { AdminInputComponent } from './components/admin-input/admin-input.component';
import { UserComponent } from './components/user/user.component';
import {Chartservice} from './services/chartservice.service'
import {routes} from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';

@NgModule({
  declarations: [
    AppComponent,
    AlertBySrcComponent,
    AdminInputComponent,
    UserComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    routes,
    FlashMessagesModule

  ],
  providers: [Chartservice],
  bootstrap: [AppComponent]
})
export class AppModule { }