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
findings : [any];
dates  = new Array(); //labels
tpsFindings = new Array(); 
ziftenFindings = new Array();
mcafeeFindings =  new Array();
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
    this.chartService.getFindings().subscribe(findings => {
      this.findings = findings;
      // dates + values
      for(let i = 0; i < this.findings.length ; i++){
        this.dates[i] = this.findings[i].date
        this.tpsFindings[i] = this.findings[i].tpsFindings;
        this.ziftenFindings[i] = this.findings[i].ziftenFindings;
        this.mcafeeFindings[i] = this.findings[i].mcafeeFindings;
        this.lineChartLabels = this.dates;
      }

    });
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

// lineChart
public lineChartData:Array<any> = [
  {data: this.tpsFindings, label: 'Tps'},
  {data: this.mcafeeFindings, label: 'Mcafee'},  
  {data: this.ziftenFindings, label: 'Ziften'},
];
public lineChartLabels ;
public lineChartSystemLabels: Array<any> = [
  'Tps','Ziften','Mcafee'
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

public randomize():void {
  let _lineChartData:Array<any> = new Array(this.lineChartData.length);
  // runs on labels
  for (let i = 0; i < this.lineChartData.length; i++) {
    _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
    // change numbers
    for (let j = 0; j < this.lineChartData[i].data.length; j++) {
      _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
    }
  }
  this.lineChartData = _lineChartData;
}

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
