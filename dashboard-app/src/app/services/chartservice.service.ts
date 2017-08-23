import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Chartservice {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.options = new RequestOptions({headers: this.headers});
  }

getLastReport = function(){
  return this.http.get('http://localhost:3000/getLastReport')
      .map(res => res.json());
}
getReportByDate = function(date){
  return this.http.get('http://localhost:3000/getReportByDate/'+"2017-08-21T12:31:52.301Z")
  .map(function(res){
    return res.json();
  });
}
sendReport = function(
  _reputationList,
  _behavioral,
  _DGA,
  _fileAnalysis,
  _LM, 
  _EP,
  _mcafee,
  _snow,
  _teknas,
  _suspiciousDestination,
  _suspiciousBinariesOT,
  _newSuspiciousBinary ,
  _newVulnerableFile,
  _vulnerableFileWasFound,
  _vulnerableBinaries,
  _umbrella){


  return this.http.post('http://localhost:3000/enterNewReport' , {reputationList:_reputationList,
   behavioral: _behavioral,
   DGA: _DGA,
   fileAnalysis: _fileAnalysis,
   LM: _LM,
   EP: _EP,
   mcafee: _mcafee,
   snow: _snow,
   teknas: _teknas,
   suspiciousDestination: _suspiciousDestination,
   suspiciousBinariesOT: _suspiciousBinariesOT,
   newSuspiciousBinary: _newSuspiciousBinary ,
   newVulnerableFile: _newVulnerableFile,
   vulnerableFileWasFound: _vulnerableFileWasFound,
   vulnerableBinaries: _vulnerableBinaries,
   umbrella: _umbrella})
  .map(function(res){
     res.json();
  });


 }

}
