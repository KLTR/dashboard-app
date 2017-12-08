import { Component, OnInit } from '@angular/core';
import {SplunkService} from '../../services/splunk.service';
@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  public snowIncidents: any;
  public incident: Object;
  public incidentIndex = 0;
  constructor(    private splunkService: SplunkService,
  ) { }

  ngOnInit() {
    this.splunkService.getLastWeekSnow()
    .subscribe(snowIncidents =>{
      console.log(snowIncidents.results)
      this.snowIncidents = new Array<incident>();
      for(var i = 0 ; i < snowIncidents.results.result.length ; i ++){
        this.setSnowIncidents(snowIncidents,i);
      }
    })

    
    // results.result[0].$.field[5]
// Fields -
//  5 has INCNUMBER state (is a number) 
// 37 - description (field[37].value[0].text)
// 48 same as 37. need to check difference
// 49 - incident state ()
// 58 - INC number (field[58].value[0].text) or maybe text[0]
// 59 opened by (number)
// 70 short description
// 77 state as well
// 81 created on date
// 84 sys_id
// 106 incident owner
// 142 user
  }
  setSnowIncidents(incidents,index){
    if(incidents.results.result[index].field.length != 149){
      return;
    }
    let state;
    let incNum;
    let createdDate;
    let stateNum;
    let desc;
    // If one of the results is not an **incident**, it will throw err.
    try {
     incNum = incidents.results.result[index].field[58].value[0].text[0];
     createdDate  = incidents.results.result[index].field[81].value[0].text;
    stateNum = incidents.results.result[index].field[77].value[0].text[0];
      desc = incidents.results.result[index].field[70].value[0].text[0];
    } catch(err){
      // One of the fields is undefined.
      return ;
    }
    if(stateNum == '1'){
      state = 'New';
    }
    if(stateNum == '2'){
      state = 'Work In Progress';
    }
    if(stateNum == '-5'){
      state = 'On Hold';
    }
    if(stateNum == '6'){
      state = 'Resolved';
    }
    if(stateNum == '7'){
      state = 'Closed';
    }
    if(stateNum == '8'){
      state = 'Canceled';
    }
    if(incNum && createdDate){
      // **! Check for duplicates - might be better way !**
      for(var j = 0 ; j < this.incidentIndex ; j++){
        if(this.snowIncidents[j].num == incNum){
          return;
        }
      }
    this.snowIncidents[this.incidentIndex] = new incident(incNum,createdDate, state,desc);
        console.log(this.snowIncidents[this.incidentIndex]);    
    this.incidentIndex++;
  }
  
}
}
class incident {
  num: any;
  date: any;
  state: any;
  desc: any;
  label = 'label-default';
  constructor(num,date,state,desc) {
  if(num){
    this.num = num;
  }else{
    this.num = 'Unavailable'
  }
  if(date){
    this.date = date[0].slice(0,10);
  }else{
    this.date = 'Unavailable'
  }
  if(state){
    this.state = state;
    if(state == 'New'){
      this.label = 'label-info'
    }
    if(state == 'Resolved'){
      this.label = 'label-success'
    }
    if(state == 'Work In Progress'){
      this.label = 'label-primary'
    }
    if(state == 'On Hold'){
      this.label = 'label-warning'
    }
    if(state == 'Canceled'){
      this.label = 'label-danger'
    }
  }else{
    this.state ='Unavailable'
  }
  if(desc){
    this.desc=desc;
  }
  }
}