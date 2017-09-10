import { Injectable } from '@angular/core';

@Injectable()
export class ChartsServiceService {
  // Doughnut
public doughnutChartLabels:string[] = ['TPS', 'Ziften', 'McAfee', 'Teknas','Service-Now/User'];
public doughnutChartData:number[] ;
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
  constructor() { }

setDougnutChartData = function(data){
 this.doughnutChartData = data;
 console.log(this.doughnutChartData);
}

getDougnutChartData = function(){
  return this.doughnutChartData;
}

}
