'use strict';
const mongoose = require('mongoose'),
      Report   = require('./../models/report'),
      promise  = require('promise');

class Dashboard {

    enterNewReport(_mcafee, _teknas, _snow, _umbrella, _reputationList,
                    _behavioral, _DGA, _fileAnalysis, _LM, _EP,
                    _suspiciousDestination, _suspiciousBinariesOT,
                    _newSuspiciousBinary, _newVulnerableFile,
                    _vulnerableFileWasFound, _vulnerableBinaries) {
        return new Promise((resolve, reject) => {
            var newReport = new Report({
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
                suspiciousdestination: _suspiciousDestination,
                suspiciousBinariesOT: _suspiciousBinariesOT,
                newSuspiciousBinary: _newSuspiciousBinary,
                newVulnerableFile: _newVulnerableFile,
                vulnerableBinaries: _vulnerableBinaries,
                vulnerableFileWasFound: _vulnerableFileWasFound
            });
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
                })
        })
    }

    getAllReports() {
        return new Promise((resolve, reject) => {
            Report.find({}).select('date -_id');
        }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    }
}

module.exports = () => {
    var dashboard = new Dashboard();
    return dashboard;
}