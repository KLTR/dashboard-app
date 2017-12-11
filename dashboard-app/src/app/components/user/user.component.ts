import { Component, Input, OnInit, AfterViewChecked,Inject  } from '@angular/core';
import {Chartservice} from '../../services/chartservice.service';
import {SplunkService} from '../../services/splunk.service';
import {Router} from '@angular/router';
  // Jquery

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

private splunkSnowIncidents: [any];
private logoUrl: string;

private isChartsShown = false;;
private isTrendingShown = false;
// charts
// doughnut of all systems
  constructor(

   ) { }

   showTrending(){
    this.isTrendingShown = true;
    this.isChartsShown = false;
   }
   showCharts(){
     this.isTrendingShown = false;
     this.isChartsShown = true;
   }
  ngOnInit() {
  this.logoUrl = '../../../assets/images/Verint_logo.png';
  // services
  }

  ngAfterViewInit() {
    function rotator() {
        $('.user-wrap').show();
        $('.wrapper-loader').hide();
    }
     setInterval(rotator, 2200);
}

// End
}