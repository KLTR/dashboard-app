import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from 'xml2js';

@Injectable()
export class SplunkService {
   
  
  json : any;
  headers: Headers;
  options: RequestOptions;
  // jobid = '';
  APIUrl: string = "http://tlvpsecdash1.verint.corp.verintsystems.com:3001";

  // Search 25ad9f1337a85e00f95fa6d2b3990eb7 
  // IT_T1_SOC =  25ad9f1337a85e00f95fa6d2b3990eb7  THIS IS THE ID IN SPLUNK FOR SERVICE NOW !
  // "https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/1512146145.1023222_1C7E362D-C667-42DA-9978-6EA15A3D370B/events?count=1500"
  // APIUrl: string = `https://verintdev.service-now.com/api/now/table/incident?sysparm_query=123TEXTQUERY321=it_t1_soc^active=true`;
  constructor(private http: Http) {


  }
  getSplunk = function(jobId){
    return this.http.get(`${this.APIUrl}/splunk/${jobId}`)
    .map(res => {
      let data;
      let tempRes = res._body.substr(1).slice(0,-1);
      // .substr(1).slice(0, -1)
      xml2js.parseString(res.text(), function (err, result) {
      console.log(result);  
      data = result;
      if(err){
        throw err;
      }
   });
   return data;
});
}



  // getByDateSnow = function(date){
  //   // gets json of incidents
  // }
  getLastWeekSnow(){
    return this.http.get(`${this.APIUrl}/snow`)
    .map(res => {
      return res.json();
    })
  } 
}
