import { Component, OnInit } from '@angular/core';
import {Chartservice} from '../../services/chartservice.service';
import {SplunkService} from '../../services/splunk.service';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {

  private splunkSnowIncidents: [any];
  private logoUrl: string;
  // flags
  private typeFlag = true;
  private sourceFlag = true;
  private rawTpsFlag = true;
  private chartsFlag = false;
  private findingsFlag = true;
  private isFirstLoad = true;
  // dates
  private dates: string[];
  public selectedDate: string;
  // Dougnut chart
  public doughnutChartLabels: string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas', 'Service-Now/User', 'Umbrella'];
  public doughnutChartData: number[];
  public doughnutChartType = 'doughnut';
  
  public doughnutChartLabelsRaw: string[] =
  ['Reputation List', 'Behavioral Analysis', 'DGA', 'File Analysis', 'Laterl Movement', 'Endpoint Forensics'];
  public doughnutChartDataRaw: number[];
  public doughnutChartTypeRaw = 'doughnut';
  
  public doughnutChartLabelsType: string[] =
  ['Suspicious Communications', 'Suspicious Files', 'Lateral Movement', 'Vulnerable File Was Found']
  public doughnutChartDataType: number[];
  public doughnutChartTypeType = 'doughnut';
  // public doughnutFlag:boolean = false;
  
  // Alerts sources
  private tps: number;
  private ziften: number;
  private mcafee: number;
  private teknas: number;private snow: number;
  private umbrella: number;
  private allSysArray: number[] ;
  private rawTpsDoughnutArr: number[];
  
    // TPS
  private reputationList: number;
  private behavioral: number;
  private DGA: number;
  private fileAnalysis: number;
  private LM: number;
  private EP: number;
  private tpsRawAlerts: number[];
  
  // Ziften
  private suspiciousDestination: number;
  private suspiciousBinariesOT: number;
  private newSuspiciousBinary: number;
  private newVulnerableFile: number;
  private vulnerableFileWasFound: number;
  private vulnerableBinaries: number;
  private files: number
  // Type:
  private adware: number;
  private virus: number;
  private mail: number;
  // Source
  private tpsFindings: number;
  private mcafeeFindings: number;
  private ziftenFindings: number;
  private userFindings: number;
  
  // findings pie charts:
   public pieChartLabelsType: string[] = ['Adware/Unwanted Program', 'Virus', 'Malicious Emails'];
   public pieChartDataType: number[] ;
   public pieChartTypeType = 'pie';
  private pieChartDataTypeArr: number[];
    public pieChartLabelsSrc: string[] = ['TPS', 'McAfee', 'Ziften', 'User'];
   public pieChartDataSrc: number[] ;
   public pieChartTypeSrc = 'pie';
   private pieChartDataSrcArr: number[];
   // bar cart
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas', 'Service-Now/User','Umbrella'];
  public barChartType = 'bar';
  public barChartLegend = true;
  
  public barChartData: any[] ;
  
  // bar chart for raw TPS
  
  public barChartOptionsRAW: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsRAW: string[] = ['Reputation', 'Behavioral', 'DGA', 'File ','Lateral', 'Endpoint '];
  public barChartTypeRAW = 'bar';
  public barChartLegendRAW = true;
  
  public barChartDataRAW: any[] ;
  // bar chart for alerts by Type
  public barChartOptionsType: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabelsType: string[] = ['Communications', 'Suspicious Files', 'Lateral', 'Vulnerable File'];
  public barChartTypeType = 'bar';
  public barChartLegendType = true;
  
  public barChartDataType: any[] ;
  
  private snowIncidents: any[];
  private reults = 'results.result[0].field[58].value[0].text'
  private fieldIncNum = ''
  
  private isChartsShown = false;;
  private isTrendingShown = false;
  // charts
  // doughnut of all systems
    constructor(
      private chartService: Chartservice,
      private splunkService: SplunkService,
     ) { }

  ngOnInit() {
    this.logoUrl = '../../../assets/images/Verint_logo.png';
    // services
      this.chartService.getAllReports().subscribe(dates => {
          this.dates = dates;
          this.selectedDate = dates[0];       
      });
  
      this.sourceFlag = true;
  
    this.chartService.getLastReport().subscribe(report => {
      this.reputationList = report.reputationList;
      this.behavioral = report.behavioral;
      this.DGA = report.DGA;
      this.fileAnalysis = report.fileAnalysis;
      this.LM = report.LM;
      this.EP = report.EP;
      this.mcafee = report.mcafee;
      this.snow = report.snow;
      this.teknas = report.teknas;
      this.suspiciousDestination = report.suspiciousDestination;
      this.suspiciousBinariesOT = report.suspiciousBinariesOT;
      this.newSuspiciousBinary = report.newSuspiciousBinary;
      this.vulnerableFileWasFound = report.vulnerableFileWasFound;
      this.newVulnerableFile = report.newVulnerableFile;
      this.vulnerableBinaries = report.vulnerableBinaries;
      this.umbrella = report.umbrella;
      this.tpsFindings = report.tpsFindings;
   this.ziftenFindings = report.ziften ;
   this.mcafeeFindings = report.mcafeeFindings;
   this.userFindings = report.userFindings;
   this.adware = report.adware;
   this.virus = report.virus;
   this.mail = report.mail;
      this.chartsFlag = true;
      this.isChartsShown = true;
      this.calcTps();
      this.calcZiften();
      this.createBarChart();
      this.allSysArray =  [this.tps, this.ziften, this.mcafee, this.teknas, this.snow, this.umbrella];
      this.createDoughnutForSource();
      this.createBarForRawTps();
      this.createDoughnutForRawTps();
      this.createChartsForType();
      this.createPieChartsForFindings();
      
    });
  
    }
  
    calcTps = function(){
      this.tps = this.reputationList + this.behavioral + this.DGA + this.fileAnalysis + this.LM + this.EP;
      this.tpsRawAlerts = [this.reputationList, this.behavioral, this.DGA, this.fileAnalysis, this.LM, this.EP];
    };
    calcZiften = function(){
      this.ziften = this.suspiciousDestination +  this.suspiciousBinariesOT +
      this.newSuspiciousBinary + this.newVulnerableFile + this.vulnerableBinaries
      + this.vulnerableFileWasFound;
    };
  
  createDoughnutForSource = function(){
    this.doughnutChartData = this.allSysArray;
  };
  
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
      {data: [this.tps, 0, 0, 0, 0, 0], label: 'TPS'},
      {data: [0, this.ziften, 0, 0, 0, 0], label: 'Ziften'},
      {data: [0, 0, this.mcafee, 0, 0, 0], label: 'McAfee'},
      {data: [0, 0, 0, this.teknas, 0 , 0], label: 'Teknas'},
      {data: [0, 0, 0, 0, this.snow, 0], label: 'Service-Now/User'},
      {data: [0, 0, 0, 0, 0, this.umbrella], label: 'Umbrella'},
  
    ];
  };
  createBarForRawTps = function(){
   this.barChartDataRAW = [
      {data: [this.reputationList, 0, 0, 0, 0, 0], label: 'C&C (Reputation List)'},
      {data: [0, this.behavioral, 0, 0, 0, 0], label: 'C&C (Behavioral Analysis)'},
      {data: [0, 0, this.DGA, 0, 0, 0], label: 'C&C (DGA)'},
      {data: [0, 0, 0, this.fileAnalysis, 0, 0 ], label: 'File Analysis'},
      {data: [0, 0, 0, 0, this.LM, 0], label: 'Lateral Movement'},
      {data: [0, 0, 0, 0, 0, this.EP], label: 'Endpoint Forensics'},
    ];
   };
  
   createDoughnutForRawTps = function(){
     this.rawTpsDoughnutArr = [this.reputationList,this.behavioral,this.DGA,this.fileAnalysis,this.LM,this.EP];
     this.doughnutChartDataRaw = this.rawTpsDoughnutArr;
   }
     createChartsForType = function(){
     this.files = this.suspiciousBinariesOT + this.fileAnalysis + this.newVulnerableFile
     this.barChartDataType = [
      {data: [this.suspiciousDestination, 0, 0, 0], label: 'Suspicious Communications'},
      {data: [0, this.files, 0, 0,], label: 'Suspicious Files'},
      {data: [0, 0, this.LM, 0], label: 'Laterel Movement'},
      {data: [0, 0, 0, this.vulnerableFileWasFound], label: 'Vulnerable File Was Found'} 
    ];
      this.sourceDoughnutArr = [this.suspiciousDestination,this.files,this.LM,this.vulnerableFileWasFound];
     this.doughnutChartDataType = this.sourceDoughnutArr;
   }
  
    createPieChartsForFindings = function(){
    this.pieChartDataSrcArr = [this.tpsFindings,this.mcafeeFindings,this.ziftenFindings,this.userFindings];
    this.pieChartDataTypeArr = [this.adware, this.virus, this.mail];
    this.pieChartDataSrc = this.pieChartDataSrcArr;
    this.pieChartDataType = this.pieChartDataTypeArr;
    
   }
  
  selectDate(){
     this.chartService.getReportByDate(this.selectedDate).subscribe( report => {
      // 
      
      report = report[0];
      this.reputationList = report.reputationList;
      this.behavioral = report.behavioral
      this.DGA = report.DGA
      this.fileAnalysis = report.fileAnalysis
      this.LM = report.LM
      this.EP = report.EP
      this.mcafee = report.mcafee
      this.snow = report.snow
      this.teknas = report.teknas
      this.suspiciousDestination = report.suspiciousDestination
      this.suspiciousBinariesOT = report.suspiciousBinariesOT
      this.newSuspiciousBinary = report.newSuspiciousBinary
      this.vulnerableFileWasFound = report.vulnerableFileWasFound;
      this.newVulnerableFile = report.newVulnerableFile
      this.vulnerableBinaries = report.vulnerableBinaries
      this.umbrella = report.umbrella;
      this.tpsFindings = report.tpsFindings;
      this.ziftenFindings = report.ziften ;
      this.mcafeeFindings = report.mcafeeFindings;
      this.userFindings = report.userFindings;
      this.adware = report.adware;
      this.virus = report.virus;
      this.mail = report.mail;
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
  
     });
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
  
    public chartClicked(e:any,key):void {
      // console.log("Index", e.active[0]._index);
      // console.log("Data" , e.active[0]._chart.config.data.datasets[0].data[e.active[0]._index]);
      // console.log("Label" , e.active[0]._chart.config.data.labels[e.active[0]._index]);    
      let label = e.active[0]._chart.config.data.labels[e.active[0]._index];
      this.chartService.getFindingIncident(label,key,this.selectedDate);
    }
  
  }
