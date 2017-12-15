'use strict';
const mongoose = require('mongoose'),
      Report = require('./../models/report'),
      promise = require('promise'),
      http = require('http'),
      httpreq = require('httpreq'),
      fs = require('fs');

class Dashboard {

    splunk() {
        return new Promise((resolve, reject) => {
            var result;
            var base64encodedData = new Buffer('rLevy : AaAa1234$').toString('base64');
            var options = {
                method: 'GET',
               "hostname": "splunk.verint.corp.verintsystems.com",
                  "port": "8089",
                  "path": "services/search/jobs/1513351643.272707_CDC6AE6D-BA62-4E3A-ACDB-786F34783583/events?count=1500",
                  ca: [fs.readFileSync(["services/search/jobs/1513351643.272707_CDC6AE6D-BA62-4E3A-ACDB-786F34783583/events?count=1500s"], {encoding: 'utf-8'})],
                headers: {
                    'Content-Type'  : 'application/x-www-form-urlencoded',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Headers':'*',
                    'Authorization' : 'Basic ' + base64encodedData,
                    "Cache-Control": "no-cache"
                }
            }

              const req = http.request(options, (res) => {
              res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
              });
              res.on('end', () => {
                console.log('No more data in response.');
              });
            });

            req.on('error', (e) => {
              console.error(`problem with request: ${e.stack}`);
            });;
            req.end();
            resolve(result);
        })


    }

    enterNewReport(_jobId, _mcafee, _teknas, _snow, _umbrella, _reputationList,
        _behavioral, _DGA, _fileAnalysis, _LM, _EP,
        _suspiciousDestination, _suspiciousBinariesOT,
        _newSuspiciousBinary, _newVulnerableFile,
        _vulnerableFileWasFound, _vulnerableBinaries,
        _tpsFindings, _ziftenFindings, _mcafeeFindings,
        _adware, _virus, _mail) {
        return new Promise((resolve, reject) => {
            var newReport = new Report({
                jobId: _jobId,
                mcafee: _mcafee,
                teknas: _teknas,
                snow: _snow,
                umbrella: _umbrella,
                reputationList: _reputationList,
                behavioral: _behavioral,
                DGA: _DGA,
                fileAnalysis: _fileAnalysis,
                LM: _LM,
                EP: _EP,
                suspiciousDestination: _suspiciousDestination,
                suspiciousBinariesOT: _suspiciousBinariesOT,
                newSuspiciousBinary: _newSuspiciousBinary,
                newVulnerableFile: _newVulnerableFile,
                vulnerableBinaries: _vulnerableBinaries,
                vulnerableFileWasFound: _vulnerableFileWasFound,
                tpsFindings: _tpsFindings,
                ziftenFindings: _ziftenFindings,
                mcafeeFindings: _mcafeeFindings,
                adware: _adware,
                virus: _virus,
                mail: _mail
            });
            //splunkData.getLastWeekSnow(_jobId);
            newReport.save(
                (err) => {
                    if (err)
                        console.log(err);
                    else {
                        resolve(JSON.stringify(newReport));
                        console.log("new report added");
                    }
                });
        });
    }

    getReportByDate(date) {
        return new Promise((resolve, reject) => {
            Report.find({ date: `${date}` },
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
        });
    }

    getAllReports() {
        return new Promise((resolve, reject) => {
            // var result = Report.find({}).select('date -_id');
            Report.distinct('date', (err, result) => {
                resolve(result.reverse());
            });
        });
    }
    
    getFindingsBySource() {
        return new Promise((resolve, reject) => {
            Report.find({},{date:1, tpsFindings:1, ziftenFindings: 1, mcafeeFindings: 1},
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).limit(8);
        });
    }

    getFindingsByType() {
        return new Promise((resolve, reject) => {
            Report.find({},{date:1, adware:1, virus: 1, mail: 1},
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).limit(8);
        });        
    }    

    getLastReport() {
        return new Promise((resolve, reject) => {
            let result = Report.find().limit(1).sort({$natural:-1});
            resolve(result);
        })
    }
}

module.exports = () => {
    var dashboard = new Dashboard();
    return dashboard;
}