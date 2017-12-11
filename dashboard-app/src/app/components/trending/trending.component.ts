import { Component, OnInit } from '@angular/core';
import {Chartservice} from '../../services/chartservice.service';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
findingsBySource : [any];
findingsByType : [any];
dates  = new Array(); //labels
tpsFindings = new Array(); 
ziftenFindings = new Array();
mcafeeFindings =  new Array();
userFindings = new Array();
vulnerableFileWasFound: number;
newVulnerableFile: number;
files: number;
adware: number;
virus: number;
mail: number;
tps: number;
sysLabelIndex = 0;
  constructor(private chartService:Chartservice) { }

  ngOnInit() {
    this.chartService.getFindingsBySource().subscribe(findings => {
      this.findingsBySource = findings;
      console.log(this.findingsBySource);
      console.log()
      // dates + values
      for(let i = 0; i < this.findingsBySource.length ; i++){
        this.dates[i] = this.findingsBySource[i].date
        this.tpsFindings[i] = this.findingsBySource[i].tpsFindings;
        this.ziftenFindings[i] = this.findingsBySource[i].ziftenFindings;
        this.mcafeeFindings[i] = this.findingsBySource[i].mcafeeFindings;
        this.lineChartLabelsBySource = this.dates;
      }

    });
    // this.chartService.getFindingsByType().subscribe(findings => {
    //   this.findingsByType = findings;
    //   console.log(this.findingsByType);
      
    //   // dates + values
    //   for(let i = 0; i < this.findingsByType.length ; i++){
    //     this.dates[i] = this.findingsByType[i].date
    //     this.tpsFindings[i] = this.findingsByType[i].adware;
    //     this.ziftenFindings[i] = this.findingsByType[i].virus;
    //     this.mcafeeFindings[i] = this.findingsByType[i].mail;
    //     this.lineChartLabelsType = this.dates;
    //   }

    // });
    this.chartService.getLastReport().subscribe(report => {

      this.vulnerableFileWasFound = report.vulnerableFileWasFound;
      this.newVulnerableFile = report.newVulnerableFile;
      this.files = report.suspiciousBinariesOT + report.fileAnalysis + report.newVulnerableFile
      this.tps = report.reputationList + report.behavioral + report.DGA + report.fileAnalysis + report.LM + report.EP;
      this.adware = report.adware;
      this.virus = report.virus;
      this.mail = report.mail;
      
    });
  }


getSysLabels(){
  if(this.sysLabelIndex == 2){
    this.sysLabelIndex = 0;
  }else{
    this.sysLabelIndex+=1;    
  }
}

// lineChart source
public lineChartDataBySource:Array<any> = [
  {data: this.tpsFindings, label: 'Tps'},
  {data: this.mcafeeFindings, label: 'Mcafee'},  
  {data: this.ziftenFindings, label: 'Ziften'},
  {data: this.userFindings, label: 'User'}
];
public lineChartLabelsBySource;
public lineChartSystemLabels: Array<any> = [
  'Tps','Ziften','Mcafee'
]

// lineChart Type
public lineChartDataType:Array<any> = [
  {data: this.tpsFindings, label: 'Adware'},
  {data: this.mcafeeFindings, label: 'Virus'},  
  {data: this.ziftenFindings, label: 'Malicious Mail'},
];
public lineChartLabelsType;
public lineChartSystemLabelsType: Array<any> = [
  'Adware','Virus','Malicious Mail'
]
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  { // Tps color
    backgroundColor: 'rgba(17, 107, 132,0.2)',
    borderColor: 'rgb(70, 143, 163)',
    pointBackgroundColor: 'rgb(70, 143, 163)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#31B0D5'
  },
  { // mcAfee Color
    backgroundColor: 'rgba(77,83,96,0.2)',
    borderColor: 'rgba(77,83,96,1)',
    pointBackgroundColor: 'rgba(77,83,96,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(77,83,96,1)'
  },
  { // Ziften Color
    backgroundColor: 'rgba(210, 105, 30,0.2)',
    borderColor: 'rgba(210, 105, 30,1)',
    pointBackgroundColor: 'rgba(210, 105, 30,1)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(210, 105, 30,1)'
  }
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';



// events
public chartClicked(e:any):void {
  console.log(e);
}

public chartHovered(e:any):void {
  console.log(e);
}

ngAfterViewInit() {
  
  
      function rotator() {
        $('.slide-up li:first-child').slideUp(1500, function() {
          $(this).appendTo($('.slide-up')).show();

        });
        
      }
       setInterval(rotator, 2000);
    }
}
