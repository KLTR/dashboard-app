import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Chartservice {
  headers: Headers;
  options: RequestOptions;
  APIUrl: string = "https://vdashboard.herokuapp.com";
  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    this.options = new RequestOptions({headers: this.headers});
  }

getLastReport = function(){
  return this.http.get(`${this.APIUrl}/getLastReport`)
      .map(res => res.json());
}

getAllReports = function(){
  return this.http.get(`${this.APIUrl}/getAllReports`)
  .map(res => res.json());
}

getReportByDate = function(date){
  return this.http.get(`${this.APIUrl}/getReportByDate/${date}`)
  .map(function(res){
    return res.json();
  });
}
getFindingIncident(label, key, date){
  console.log(label + ' ' + date)
  if(key == 'source'){
    return this.http.get(`$this.APIUrl}/getIncidentBySource/${label}/${date}`)
    .map(function(res){
      return res.json();
    });
  }
  else if(key == 'type'){
    return this.http.get(`$this.APIUrl}/getIncidentByType/${label}/${date}`)
    .map(function(res){
      return res.json();
    });
  }
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
  _umbrella,
  _tpsFindings,
  _ziftenFindings,
  _mcafeeFindings,
  _userFindings,
  _adware,
  _virus,
  _mail){
  return this.http.post(`${this.APIUrl}/enterNewReport` , {reputationList:_reputationList,
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
   umbrella: _umbrella,
   tpsFindings: _tpsFindings,
   ziftenFindings: _ziftenFindings,
   mcafeeFindings: _mcafeeFindings,
   userFindings: _userFindings,
   adware: _adware,
   virus: _virus,
   mail: _mail})
  .map(function(res){
     res.json();
  });


 }

}
