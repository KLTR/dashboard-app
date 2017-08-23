import { Component, OnInit } from '@angular/core';
import {Chartservice} from '../../services/chartservice.service'
import {Router} from '@angular/router';

@Component({ 
  selector: 'app-admin-input',
  templateUrl: './admin-input.component.html',
  styleUrls: ['./admin-input.component.css']
})
export class AdminInputComponent implements OnInit {
// flags
private typeFlag;
private sourceFlag = true;
private rawTpsFlag;
private findingsFlag;
private chartsFlag = false;;
// Dougnut chart 
public doughnutChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas','Service-Now/User','Umbrella'];
public doughnutChartData:number[];
public doughnutChartType:string = 'doughnut';

public doughnutChartLabelsRaw:string[] = ['Reputation List', 'Behavioral Analysis', 'DGA', 'File Analysis','Laterl Movement','Endpoint Forensics'];
public doughnutChartDataRaw:number[];
public doughnutChartTypeRaw:string = 'doughnut';

public doughnutChartLabelsType:string[] = ['Suspicious Communications', 'Suspicious Files', 'Lateral Movement', 'Vulnerable File Was Found']
public doughnutChartDataType:number[];
public doughnutChartTypeType:string = 'doughnut';
// public doughnutFlag:boolean = false;

// Alerts sources
private tps:number;
private ziften:number;
private mcafee:number;
private teknas:number;
private snow:number;
private umbrella:number;
private allSysArray:number[] ;
private rawTpsDoughnutArr:number[];
private sourceDoughnutArr:number[];
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

//Findings
// Type:
private adware:number;
private virus:number;
private mail:number;
// Source
private tpsFindings:number;
private mcafeeFindings:number;
private ziftenFindings:number;
private userFindings:number;

// findings pie charts:
 public pieChartLabelsType:string[] = ['Adware/Unwanted Program', 'Virus', 'Malicious Emails'];
 public pieChartDataType:number[] ;
 public pieChartTypeType:string = 'pie';
private pieChartDataTypeArr : number[];
  public pieChartLabelsSrc:string[] = ['TPS', 'McAfee', 'Ziften', 'User'];
 public pieChartDataSrc:number[] ;
 public pieChartTypeSrc:string = 'pie';
 private pieChartDataSrcArr: number[];

// charts
// doughnut of all systems 
  constructor(
    private chartService: Chartservice,
    private router: Router) { }

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
//  findings pie charts
 this.tpsFindings = 0;
 this.ziftenFindings = 0;
 this.mcafeeFindings = 0;
 this.userFindings = 0;
 this.adware = 0;
 this.virus = 0;
 this.mail = 0;
  
  }
// bar chart for alerts by source
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

  // bar chart for alerts by type
public barChartOptionsType:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsType:string[] = ['Communications', 'Suspicious Files', 'Lateral', 'Vulnerable File'];
  public barChartTypeType:string = 'bar';
  public barChartLegendType:boolean = true;
 
  public barChartDataType:any[] ;

  submit = function(event){
    this.chartsFlag = true;
    this.calcTps();
    this.calcZiften();
    this.createBarChart();
    this.allSysArray =  [this.tps,this.ziften,this.mcafee,this.teknas,this.snow,this.umbrella];
    this.createDoughnutForSource();
    this.createBarForRawTps();
    this.createDoughnutForRawTps();
    this.createChartsForType();
    this.createPieChartsForFindings();
    this.sendDataToService();

  }
  sendDataToService(){
    this.chartService.sendReport(
      this.reputationList,
      this.behavioral,
      this.DGA,
      this.fileAnalysis,
      this.LM,
      this.EP,
      this.mcafee,
      this.snow,
      this.teknas,
      this.suspiciousDestination,
      this.suspiciousBinariesOT,
      this.newSuspiciousBinary,
      this.newVulnerableFile,
      this.vulnerableFileWasFound,
      this.vulnerableBinaries,
      this.umbrella
    )  
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

 createDoughnutForRawTps = function(){
   this.rawTpsDoughnutArr = [this.reputationList,this.behavioral,this.DGA,this.fileAnalysis,this.LM,this.EP];
   this.doughnutChartDataRaw = this.rawTpsDoughnutArr;
 }

 createChartsForType = function(){
   var files = this.suspiciousBinariesOT + this.fileAnalysis + this.newVulnerableFile
   this.barChartDataType = [
    {data: [this.suspiciousDestination, 0, 0, 0], label: 'Suspicious Communications'},
    {data: [0, files, 0, 0,], label: 'Suspicious Files'},
    {data: [0, 0, this.LM, 0], label: 'Laterel Movement'},
    {data: [0, 0, 0, this.vulnerableFileWasFound], label: 'Vulnerable File Was Found'} 
  ];
    this.sourceDoughnutArr = [this.suspiciousDestination,files,this.LM,this.vulnerableFileWasFound];
   this.doughnutChartDataType = this.sourceDoughnutArr;
 }

 createPieChartsForFindings = function(){
  this.pieChartDataSrcArr = [this.tpsFindings,this.mcafeeFindings,this.ziftenFindings,this.userFindings];
  this.pieChartDataTypeArr = [this.adware, this.virus, this.mail];
  this.pieChartDataSrc = this.pieChartDataSrcArr;
  this.pieChartDataType = this.pieChartDataTypeArr;
 }

preview(){
  this.chartsFlag = true;
   this.calcTps();
    this.calcZiften();
    this.createBarChart();
    this.allSysArray =  [this.tps,this.ziften,this.mcafee,this.teknas,this.snow,this.umbrella];
    this.createDoughnutForSource();
    this.createBarForRawTps();
    this.createDoughnutForRawTps();
    this.createChartsForType();
    this.createPieChartsForFindings();

}

onChange(value) {
    if(value == "type"){
      this.typeFlag = true;
      this.sourceFlag = false;
      this.rawTpsFlag = false;
      this.findingsFlag= false;
    }
    else if(value == "source"){
      this.createBarChart();
      this.typeFlag = false;
      this.sourceFlag = true;
      this.rawTpsFlag = false;
      this.findingsFlag= false;
      
    }
    else if(value == "rawTps"){
    // this.createDoughnutForRawTps();
     this.rawTpsFlag = true;
     this.typeFlag = false;
     this.sourceFlag = false;
     this.findingsFlag= false;

    }
    else if(value =="findings"){
     this.rawTpsFlag = false;;
     this.typeFlag = false;
     this.sourceFlag = false;
     this.findingsFlag= true;
    }
}
  
}
