import { Component, OnInit } from '@angular/core';
import {SplunkService} from '../../services/splunk.service';
import {Chartservice} from '../../services/chartservice.service';
@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  // public snowIncidents: any;
  // public incident: Object;
  // public incidentIndex = 0;
  public snowIncidents = [];
  public dates = [];
  public selectedDate;
  constructor(
    private splunkService: SplunkService,
    private chartService: Chartservice
  ) { }

  ngOnInit() {
    this.chartService.getAllReports().subscribe(dates => {
      this.dates = dates;
      this.selectedDate = dates[0];  
       this.selectDate();
  });
    
  }

  selectDate(){
    this.chartService.getReportByDate(this.selectedDate).subscribe( report => {
      this.snowIncidents = report[0].snowIncidents;
      console.log(this.snowIncidents);
    })
  }

}