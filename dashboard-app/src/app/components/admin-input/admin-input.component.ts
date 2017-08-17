import { Component, OnInit } from '@angular/core';
import {ChartsServiceService} from '../../services/charts-service.service';

@Component({
  selector: 'app-admin-input',
  templateUrl: './admin-input.component.html',
  styleUrls: ['./admin-input.component.css']
})
export class AdminInputComponent implements OnInit {
// flags
private typeFlag;
private sourceFlag;
private rawTpsFlag;
// Dougnut chart 
public doughnutChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas','Service-Now/User','Umbrella'];
public doughnutChartData:number[];
public doughnutChartType:string = 'doughnut';
// public doughnutFlag:boolean = false;

// Alerts sources
private tps:number;
private ziften:number;
private mcafee:number;
private teknas:number;
private snow:number;
private umbrella:number;
private allSysArray:number[] ;
  // TPS
private reputationList:number;
private behavioral:number;
private DGA:number;
private fileAnalysis:number;
private LM:number;
private EP:number;
private tpsRawAlerts:number[];

// Ziften
private suspiciousDestination:number;
private suspiciousBinariesOT:number;
private newSuspiciousBinary:number;
private newVulnerableFile:number;
private vulnerableFileWasFound:number;
private vulnerableBinaries:number;

// charts
// doughnut of all systems 
  constructor(private chartService:ChartsServiceService) { }

  ngOnInit() {
 this.reputationList = 0;
 this.behavioral = 0;
 this.DGA = 0
 this.fileAnalysis = 0;
 this.LM = 0
 this.EP = 0
 this.mcafee = 0;
 this.snow = 0;
 this.teknas = 0
 this.suspiciousDestination = 0;
 this.suspiciousBinariesOT = 0;
 this.newSuspiciousBinary = 0 ;
 this.newVulnerableFile = 0;
 this.vulnerableFileWasFound = 0;
 this.vulnerableBinaries = 0;
 this.umbrella = 0;
  
  }
// bar cart
public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas', 'Service-Now/User','Umbrella'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] ;

// bar chart for raw TPS

public barChartOptionsRAW:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsRAW:string[] = ['Reputation', 'Behavioral', 'DGA', 'File ','Lateral', 'Endpoint '];
  public barChartTypeRAW:string = 'bar';
  public barChartLegendRAW:boolean = true;
 
  public barChartDataRAW:any[] ;

  submit = function(event){
    this.calcTps();
    this.calcZiften();
    this.createBarChart();
    this.allSysArray =  [this.tps,this.ziften,this.mcafee,this.teknas,this.snow,this.umbrella];
    this.createDoughnutForSource();
      this.createBarForRawTps();


  }
  calcTps = function(){
    this.tps = this.reputationList + this.behavioral + this.DGA + this.fileAnalysis + this.LM + this.EP;
    this.tpsRawAlerts = [this.reputationList, this.behavioral, this.DGA, this.fileAnalysis, this.LM, this.EP];
  }
  calcZiften = function(){
    this.ziften = this.suspiciousDestination +  this.suspiciousBinariesOT + this.newSuspiciousBinary + this.newVulnerableFile + this.vulnerableBinaries
    +this.vulnerableFileWasFound;
  }

createDoughnutForSource = function(){
  this.doughnutChartData = this.allSysArray;
}

 createBarChart = function(){
  this.barChartData = [
    {data: [this.tps, 0, 0, 0, 0,0], label: 'TPS'},
    {data: [0, this.ziften, 0, 0, 0,0], label: 'Ziften'},
    {data: [0, 0, this.mcafee, 0, 0,0], label: 'McAfee'},
    {data: [0, 0, 0, this.teknas, 0 ,0], label: 'Teknas'},
    {data: [0, 0, 0, 0, this.snow,0], label: 'Service-Now/User'},
    {data: [0, 0, 0, 0, 0,this.umbrella], label: 'Umbrella'},

  ];
 }

createBarForType = function(){
   this.barChartData = [
    {data: [this.tps, 0, 0, 0, 0,0], label: 'TPS'},
    {data: [0, this.ziften, 0, 0, 0,0], label: 'Ziften'},
    {data: [0, 0, this.mcafee, 0, 0,0], label: 'McAfee'},
    {data: [0, 0, 0, this.teknas, 0 ,0], label: 'Teknas'},
    {data: [0, 0, 0, 0, this.snow,0], label: 'Service-Now/User'},
    {data: [0, 0, 0, 0, 0,this.umbrella], label: 'Umbrella'},

  ];
}

createBarForRawTps = function(){
 this.barChartDataRAW = [
    {data: [this.reputationList, 0, 0, 0, 0, 0], label: 'C&C (Reputation List)'},
    {data: [0, this.behavioral, 0, 0, 0, 0], label: 'C&C (Behavioral Analysis)'},
    {data: [0, 0, this.DGA, 0, 0,0], label: 'C&C (DGA)'},
    {data: [0, 0, 0, this.fileAnalysis, 0, 0 ], label: 'File Analysis'},
    {data: [0, 0, 0, 0, this.LM, 0], label: 'Lateral Movement'},
    {data: [0, 0, 0, 0, 0, this.EP], label: 'Endpoint Forensics'},
 
  ];
 }


onChange(value) {
    if(value == "type"){
      this.typeFlag = true;
      this.sourceFlag = false;
      this.rawTpsFlag = false;
    }
    else if(value == "source"){
      this.createBarChart();
      this.typeFlag = false;
      this.sourceFlag = true;
      this.rawTpsFlag = false;
      
    }
    else if(value == "rawTps"){
     this.rawTpsFlag = true;
     this.typeFlag = false;
     this.sourceFlag = false;

    }
}
}
