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
  tableBySource = true;
findingsBySource : [any];
findingsByType : [any];
datesBySource  = new Array(); //labels
tpsFindings = new Array(); 
ziftenFindings = new Array();
mcafeeFindings =  new Array();
userFindings = new Array();
umbrellaFindings = new Array();
cymmetriaFindings = new Array();
vulnerableFileWasFound: number;
newVulnerableFile: number;
files :number;
tps :number

datesBytype  = new Array(); //labels
adware = new Array();
virus = new Array();
mail = new Array();
trojan = new Array();
ransomware = new Array();

adwares : number;
viruses: number;
mails: number;
trojans: number;
ransomwares: number;

sysLabelIndex = 0;
  constructor(private chartService:Chartservice) { }

  ngOnInit() {
    this.chartService.getFindingsBySource().subscribe(findings => {
      this.findingsBySource = findings;
      // dates + values
      for(let i = 0; i < this.findingsBySource.length ; i++){
        this.datesBySource[i] = this.findingsBySource[i].date 
        this.tpsFindings[i] = this.findingsBySource[i].tpsFindings;
        this.ziftenFindings[i] = this.findingsBySource[i].ziftenFindings;
        this.mcafeeFindings[i] = this.findingsBySource[i].mcafeeFindings;
        this.userFindings[i] = this.findingsBySource[i].userFindings;
        this.umbrellaFindings[i] = this.findingsBySource[i].umbrellaFindings;
        this.cymmetriaFindings[i] = this.findingsBySource[i].cymmetriaFindings;
        this.lineChartLabelsBySource = this.datesBySource;
      }

    });
    this.chartService.getFindingsByType().subscribe(findings => {
      this.findingsByType = findings;
      
      // dates + values
      for(let i = 0; i < this.findingsByType.length ; i++){
        this.datesBytype[i] = this.findingsByType[i].date
        this.adware[i] = this.findingsByType[i].adware;
        this.virus[i] = this.findingsByType[i].virus;
        this.mail[i] = this.findingsByType[i].mail;
        this.trojan[i] = this.findingsByType[i].trojan;
        this.ransomware[i] = this.findingsByType[i].ransomware;
        this.lineChartLabelsByType = this.datesBytype;
      }
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
  {data: this.userFindings, label: 'User'},
  {data: this.umbrellaFindings, label: 'Umbrella'},
  {data: this.cymmetriaFindings, label: 'Cymmetria'},
];
public lineChartLabelsBySource;
public lineChartSystemLabels: Array<any> = [
  'Tps','Ziften','Mcafee','User','Umbrella','Cymmetria'
]

// lineChart Type
public lineChartDataByType:Array<any> = [
  {data: this.adware, label: 'Adwares'},
  {data: this.virus, label: 'Viruses'},  
  {data: this.mail, label: 'Mails'},
  {data: this.trojan, label: 'Trojan'},
  {data: this.ransomware, label: 'Ransomware'},
];
public lineChartLabelsByType;
public lineChartSystemLabelsByType: Array<any> = [
  'Adware','Virus','Mail & External attacks','Trojan','Ransomware'
]
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  { // Tps color
    backgroundColor: 'rgba(34, 102, 102,0.5)',
    borderColor: '#669999',
    pointBackgroundColor: '#407F7F',
    pointBorderColor: '#0D4D4D',
    pointHoverBackgroundColor: '#0D4D4D',
    pointHoverBorderColor: '#003333'
  },
  { // mcAfee Color
    backgroundColor: 'rgba(170, 57, 57,0.5)',
    borderColor: '#FFAAAA',
    pointBackgroundColor: '#D46A6A',
    pointBorderColor: '#801515',
    pointHoverBackgroundColor: '#801515',
    pointHoverBorderColor: '#550000'
  },
  { // Ziften Color
    backgroundColor: 'rgba(2, 43, 109,1)',
    borderColor: '#384E72',
    pointBackgroundColor: '#384E72',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#384E72'
  },
  { // Ziften Color
    backgroundColor: 'rgba(2, 43, 109,1)',
    borderColor: '#384E72',
    pointBackgroundColor: '#384E72',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#384E72'
  },
  { // Ziften Color
    backgroundColor: 'rgba(2, 43, 109,1)',
    borderColor: '#384E72',
    pointBackgroundColor: '#384E72',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: '#384E72'
  }
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';



// events
public chartClicked(e:any):void {
  // console.log(e);
}

public chartHovered(e:any):void {
  // console.log(e);
}

toggleTables(){
  this.tableBySource = !this.tableBySource;
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
