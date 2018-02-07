'use strict';
const mongoose = require('mongoose'),
      Report = require('./../models/report'),
      promise = require('promise'),
      http = require('http'),
      request = require('request'),
      xml2js = require('xml2js'),
      Incident = require('./../models/incident'),
      nodemailer = require("nodemailer");

class Dashboard {

//--------------------------SERVICES FOR SPLUNK------------------------------------------//
    splunk(jobid) {
        return new Promise((resolve, reject) => {
            function createIncidents(incidents){
              var snowIncidents = [];  
              let state;
              let incNum;
              let createdDate;
              let stateNum;
              let desc;
              let sys_id;
              let category;
              let flag = true;
              // incidents.results.result.length - breaking splunk results in categories
              for(let i = 0 ; i < incidents.results.result.length  ; i++){
                for(let j = 0 ; j < incidents.results.result[i].field.length; j++){
                  switch(incidents.results.result[i].field[j].$.k){
                    case 'category':
                     category = incidents.results.result[i].field[j].value[0].text ;
                    break;
                    case 'sys_created_on':
                     createdDate = incidents.results.result[i].field[j].value[0].text;
                    break;
                    case 'sys_id':
                     sys_id = incidents.results.result[i].field[j].value[0].text[0]
                    break;
                    case 'number' :
                     incNum = incidents.results.result[i].field[j].value[0].text[0];
                     break;
                     case 'incident_state':
                     stateNum = incidents.results.result[i].field[j].value[0].text[0];
                     break;
                     case 'short_description':
                     desc = incidents.results.result[i].field[j].value[0].text[0];
                     break;
                  }
                }
                if(createdDate && sys_id && stateNum && desc && incNum && category == 'security'){
                  for(var k = 0 ; k < snowIncidents.length ; k++){
                    if(snowIncidents[k].incNum == incNum){
                      flag = false;
                      break;
                    }
                  }
                  if(flag){
                    //create new incident with parsed data and add to array
                    snowIncidents.push(new Incident(incNum, createdDate, stateNum, desc, sys_id));
                  }
                  createdDate = null;
                  sys_id = null;
                  stateNum = null;
                  desc = null;
                  incNum  = null;
                  flag = true;
                }
              }
              resolve(snowIncidents); 
            } 
            //request call
            var options = { method: 'GET',
              url: `https://splunk.verint.corp.verintsystems.com:8089/services/search/jobs/${jobid}/events`,
              qs: { count: '1500' },
              rejectUnauthorized: false, //cancel SSL cert
              requestCert: true,
              agent: false,
              headers: 
               { 'Cache-Control': 'no-cache',
                 Authorization: 'Basic aXRzZXNpczp2bVZhYThucSE=',
                 'access-control-allow-headers': '*',
                 'Access-control-allow-origin': '*',
                 'Content-Type': 'application/x-www-form-urlencoded' } };

            request(options, function (error, response, body) {
              if (error) throw new Error(error);
               xml2js.parseString(body, (err, res) => {
                    createIncidents(res);
                });
            });         
        });
    }
//----------------------------END OF SPLUNK SERVICES---------------------------------//


//----------------------------Service for SNOW------------------------------------/
//assignment_group=25ad9f1337a85e00f95fa6d2b3990eb7^sys_created_onRELATIVEGT@dayofweek@ago@7
    snow() {
            return new Promise((resolve, reject) => {

            var options = { method: 'GET',
              url: 'https://verintdev.service-now.com/api/now/table/incident',
              qs: { sysparm_query: 'assignment_group=25ad9f1337a85e00f95fa6d2b3990eb7^sys_created_onBETWEENjavascript:gs.dateGenerate("2018-01-01","12:00:00")@javascript:gs.dateGenerate("2018-01-05","12:00:00")' },
              headers: 
               { 'Cache-Control': 'no-cache',
                 Authorization: 'Basic dGVzdCB1c2VyOnRlc3Q=' } };

            request(options, function (error, response, body) {
              if (error) throw new Error(error);
              let res = JSON.parse(body);
                resolve(res.result);
            });
        })
    }
//--------------------------------END OF SNOW SERVICE-------------------------------------//
    enterNewReport(_jobId, _mcafee, _teknas, _snow, _umbrella, _reputationList,
        _behavioral, _DGA, _fileAnalysis, _LM, _EP,
        _suspiciousDestination, _suspiciousBinariesOT,
        _newSuspiciousBinary, _newVulnerableFile,
        _vulnerableFileWasFound, _vulnerableBinaries,
        _tpsFindings, _ziftenFindings, _mcafeeFindings,_userFindings,
        _adware, _virus, _mail, _date) {
        return new Promise((resolve, reject) => {
            this.splunk(_jobId).then((result, error) => {
                if (error) throw new Error(error);
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
                    userFindings: _userFindings,
                    adware: _adware,
                    virus: _virus,
                    mail: _mail,
                    snowIncidents: result
                });
            if (_date != null) {
                newReport.date = _date;
            }
            newReport.save(
                (err) => {
                    if (err)
                        console.log(err);
                    else {
                        //@ToDo 15/1/2017 -- update in production, hidden for TEST
                        // Use Smtp Protocol to send Email
                        // let transporter = nodemailer.createTransport({
                        //         host: 'tlvsmtp.verint.corp.verintsystems.com',
                        //         port: 25,
                        //         secure: false, // true for 465, false for other ports
                        //         tls: {rejectUnauthorized: false}, //cancel SSL cert
                        //         auth: {
                        //             user: 'soc@verint.com', // generated ethereal user
                        //             pass: 'Welcome1!'  // generated ethereal password
                        //         }
                        //     });

                        //     // setup email data with unicode symbols
                        //     let mailOptions = {
                        //         from: '"SOC Report" <SOC@verint.com>', // sender address
                        //         to: 'liran.kappel@verint.com, isaac.shahar@verint.com, david.belder@verint.com, tlv_soc@verint.com', // list of receivers
                        //         subject: `SOC report for the week of ${newReport.date}`, // Subject line
                        //         text: 'Hello Team,\nNew report is available at tlvpsecdash1.verint.corp.verintsystems.com:8200', // plain text body
                        //         html: 'Hello Team,<br><br>New report is available, please login to <a href="http://tlvpsecdash1.verint.corp.verintsystems.com:8200"/>soc dashboard</a> via Chrome to view it.<br><br>Regards,<br>Operational Dashboard.' // html body
                        //     };

                        //     // send mail with defined transport object
                        //     transporter.sendMail(mailOptions, (error, info) => {
                        //         if (error) {
                        //             return console.log(error);
                        //         }
                        //         console.log('Message sent: %s', info.messageId);
                        //         // Preview only available when sending through an Ethereal account
                        //         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

                        //         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
                        //         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
                        //     });
                        resolve(JSON.stringify(newReport));
                    }
                });
            })
        });
    }
//------------------------------------Building update report route----------------------------//
        updateReport(_jobId, _mcafee, _teknas, _snow, _umbrella, _reputationList,
        _behavioral, _DGA, _fileAnalysis, _LM, _EP,
        _suspiciousDestination, _suspiciousBinariesOT,
        _newSuspiciousBinary, _newVulnerableFile,
        _vulnerableFileWasFound, _vulnerableBinaries,
        _tpsFindings, _ziftenFindings, _mcafeeFindings,
        _adware, _virus, _mail, _date) {
        return new Promise((resolve, reject) => {
            //save report back to DB by date
            report.update({date: _date}, {$set: {
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
                userFindings: _userFindings,
                adware: _adware,
                virus: _virus,
                mail: _mail,
                date: _date}})
            });
        };
//-------------------------------------------END OF BUILDING------------------------------------//
    
    deleteReport(date) {
        return new Promise((resolve,reject) => {
            Report.remove({date: `${date}`},
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                })
        })
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
            Report.find({},{date:1, tpsFindings:1, ziftenFindings: 1, mcafeeFindings: 1, userFindings: 1},
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).limit(8).sort({$natural:-1});
        });
    }

    getFindingsByType() {
        return new Promise((resolve, reject) => {
            Report.find({},{date:1, adware:1, virus: 1, mail: 1},
                (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                }).limit(8).sort({$natural:-1});
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