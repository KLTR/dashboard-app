const express = require('express'),
    bodyParser = require('body-parser'),
    dashboard = require('./controllers'),
    app = express(),
    port = process.env.PORT || 3002,
    data = dashboard();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', port);

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/api.html`);
});

app.use(
    (req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        res.set("Content-Type", "application/json");
        next();
    });

app.post('/enterNewReport/', (req, res, next) => {
    data.enterNewReport(
        req.body.jobId,
        req.body.mcafee,
        req.body.teknas,
        req.body.snow,
        req.body.reputationList,
        req.body.behavioral,
        req.body.DGA,
        req.body.fileAnalysis,
        req.body.LM,
        req.body.EP,
        req.body.suspiciousDestination,
        req.body.suspiciousBinariesOT,
        req.body.newSuspiciousBinary,
        req.body.newVulnerableFile,
        req.body.vulnerableFileWasFound,
        req.body.vulnerableBinaries,
        req.body.tpsFindings,
        req.body.ziftenFindings,
        req.body.mcafeeFindings,
        req.body.userFindings,
        req.body.umbrellaFindings,
        req.body.cymmetriaFindings,
        req.body.adware,
        req.body.virus,
        req.body.mail,
        req.body.trojan,
        req.body.ransomware,
        req.body.date).then((result) => {
        result.length === 0 ? next() : res.status(200).json(result);
    }, (error) => {
        console.log(error);
        next();
    })
})

app.post('/updateReport/', (req, res, next) => {
    data.updateReport(
        req.body.jobId,
        req.body.mcafee,
        req.body.teknas,
        req.body.snow,
        req.body.reputationList,
        req.body.behavioral,
        req.body.DGA,
        req.body.fileAnalysis,
        req.body.LM,
        req.body.EP,
        req.body.suspiciousDestination,
        req.body.suspiciousBinariesOT,
        req.body.newSuspiciousBinary,
        req.body.newVulnerableFile,
        req.body.vulnerableFileWasFound,
        req.body.vulnerableBinaries,
        req.body.tpsFindings,
        req.body.ziftenFindings,
        req.body.mcafeeFindings,
        req.body.userFindings,	
        req.body.umbrellaFindings,
        req.body.cymmetriaFindings,
        req.body.adware,
        req.body.virus,
        req.body.mail,
        req.body.trojan,
        req.body.ransomware,
        req.body.date).then((result) => {
        result.length === 0 ? next() : res.status(200).json(result);
    }, (error) => {
        console.log(error);
        next();
    })
})

//delete a report route
app.get('/deleteReport/:date', (req, res, next) => {
  data.deleteReport(req.params.date).then((result, error) => {
    res.status(200).json(result);
  }, (error) => {
    console.log(error);
    next();
  }); 
});

//test route for splunk

app.get('/splunk/:jobid', (req, res, next) => {
  data.splunk(req.params.jobid).then((result, error) => {
    res.status(200).send(result);
  }, (error) => {
    console.log(error);
    next();
  }); 
});

//test route for SNOW

app.get('/snow/', (req, res, next) => {
  data.snow().then((result, error) => {
    res.status(200).json(result);
  }, (error) => {
    console.log(error);
    next();
  }); 
});

app.get('/getReportByDate/:date', (req, res, next) => {
    data.getReportByDate(req.params.date).then((result, error) => {
        res.status(200).json(result);
    }, (error) => {
        console.log(error);
        next();
    });
});


app.get('/getAllReports', (req, res, next) => {
  data.getAllReports().then((result, error) => {
    res.status(200).json(result);
  }, (error) => {
    console.log(error);
    next();
  });
});

app.get('/getLastReport', (req, res, next) => {
  data.getLastReport().then((result, error) => {
    res.status(200).json(result[0]);
  }, (error) => {
    console.log(error);
    next();
  });
});

app.get('/getFindingsBySource', (req, res, next) => {
  data.getFindingsBySource().then((result, error) => {
    res.status(200).json(result.reverse());
  }, (error) => {
    console.log(error);
    next();
  });
});

app.get('/getFindingsByType', (req, res, next) => {
  data.getFindingsByType().then((result, error) => {
    res.status(200).json(result.reverse());
  }, (error) => {
    console.log(error);
    next();
  });
});


//error 404 route
app.all('*', (req, res) => {
    res.send(`error: route not found, global handler`);
});

app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
});

