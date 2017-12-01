import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SplunkService {
   
  
  
  headers: Headers;
  options: RequestOptions;
  jobid = '1512146145.1023222_1C7E362D-C667-42DA-9978-6EA15A3D370B';
  // "https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/1512146145.1023222_1C7E362D-C667-42DA-9978-6EA15A3D370B/events?count=1500"
  APIUrl: string = "https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/"+this.jobid+"/events?count=1500";
  constructor(private http: Http) {
    this.headers = new Headers();
    this.headers.append("Authorization", "Basic " + btoa('rLevy' + ":" + 'AaAa1234$')); 
    this.headers.append('Content-Type' , 'application/x-www-form-urlencoded');
    this.headers.append('Access-Control-Allow-Origin', '*');

    // this.options = new RequestOptions({headers: this.headers});
  }
  getLastWeekSnow = function(){
    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append("Authorization", "Basic " + btoa('rLevy' + ":" + 'AaAa1234$')); 
    headers.append('Content-Type' , 'application/x-www-form-urlencoded');    
    return this.http.get(`${this.APIUrl}`, {headers:headers})
        .map(res => {console.log(res._body)});
  }
}
