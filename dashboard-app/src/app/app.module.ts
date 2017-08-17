import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { AlertBySrcComponent } from './components/alert-by-src/alert-by-src.component';
import { AdminInputComponent } from './components/admin-input/admin-input.component';
import {ChartsServiceService} from './services/charts-service.service';
@NgModule({
  declarations: [
    AppComponent,
    AlertBySrcComponent,
    AdminInputComponent,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule

  ],
  providers: [ChartsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
