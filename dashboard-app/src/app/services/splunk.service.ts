import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import * as xml2js from 'xml2js';

@Injectable()
export class SplunkService {
   
  
  json : any;
  headers: Headers;
  options: RequestOptions;
  jobid = '1512273897.1145799_1C7E362D-C667-42DA-9978-6EA15A3D370B';
  // Search 25ad9f1337a85e00f95fa6d2b3990eb7 
  // IT_T1_SOC =  25ad9f1337a85e00f95fa6d2b3990eb7  THIS IS THE ID IN SPLUNK FOR SERVICE NOW !
  // "https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/1512146145.1023222_1C7E362D-C667-42DA-9978-6EA15A3D370B/events?count=1500"
  APIUrl: string = `https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/${this.jobid}/events?count=1500`;
  constructor(private http: Http) {


  }
  getLastWeekSnow = function(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin','*');
    headers.append('Access-Control-Allow-Headers','*');    
    headers.append("Authorization", "Basic " + btoa('rLevy' + ":" + 'AaAa1234$')); 
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');    
    
    return this.http.get(`${this.APIUrl}`, {headers:headers})
    .map(res => {
      let data;
      xml2js.parseString( res.text(), function (err, result) {
      // console.dir(result);  Prints JSON object!
      data = result;
   });
   return data;
});

  }
  getByDateSnow = function(date){
    // gets json of incidents
  }
}
