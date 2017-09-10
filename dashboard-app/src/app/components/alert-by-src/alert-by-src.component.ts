import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-by-src',
  templateUrl: './alert-by-src.component.html',
  styleUrls: ['./alert-by-src.component.css']
})
export class AlertBySrcComponent implements OnInit {
   // Doughnut
public doughnutChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas','Service-Now/User'];
public doughnutChartData:number[] = [567, 393, 200,55, 122];
public doughnutChartType:string = 'doughnut';

// bar cart
public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas', 'Service-Now/User'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;
 
  public barChartData:any[] = [
    {data: [567, 0, 0, 0, 0], label: 'TPS'},
    {data: [0, 393, 0, 0, 0], label: 'Ziften'},
    {data: [0, 0, 200, 0, 0], label: 'McAfee'},
    {data: [0, 0, 0, 55, 0 ], label: 'Teknas'},
    {data: [0, 0, 0, 0, 122], label: 'Service-Now/User'}
  ];

  // events

  constructor() { }

  ngOnInit() {
    
  }
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }
}
