'use strict'
var mongoose = require('mongoose'),
    schema   = mongoose.Schema;
module.exports = class incident{

  constructor(incNum,date,state,desc,sys_id){

      if(state == '1'){
        state = 'New';
      }
      if(state == '2'){
        state = 'Work In Progress';
      }
      if(state == '-5'){
        state = 'On Hold';
      }
      if(state == '6'){
        state = 'Resolved';
      }
      if(state == '7'){
        state = 'Closed';
      }
      if(state == '8'){
        state = 'Canceled';
      }
    this.link = `https://verint.service-now.com/nav_to.do?uri=%2Fincident.do%3Fsys_id%3D${sys_id}%26sysparm_stack%3D%26sysparm_view%3D`;
    if(incNum){
      this.incNum = incNum;
    }else{
      this.incNum = 'Unavailable'
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

