import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AlertBySrcComponent } from './components/alert-by-src/alert-by-src.component';
import { AdminInputComponent } from './components/admin-input/admin-input.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import {Chartservice} from './services/chartservice.service';
import {SplunkService} from './services/splunk.service';

import {routes} from './app.routes';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { IncidentComponent } from './components/incident/incident.component';
import { FooterComponent } from './components/footer/footer.component';
import { TrendingComponent } from './components/trending/trending.component';
import { ChartsComponent } from './components/charts/charts.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertBySrcComponent,
    AdminInputComponent,
    UserComponent,
    NavbarComponent,
    LoginComponent,
    IncidentComponent,
    FooterComponent,
    TrendingComponent,
    ChartsComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpModule,
    routes,
    FlashMessagesModule

  ],
  providers: [Chartservice,SplunkService  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
