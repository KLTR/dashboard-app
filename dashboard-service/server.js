const express = require('express'),
    bodyParser = require('body-parser'),
    dashboard = require('./controllers'),
    app = express(),
    port = process.env.PORT || 3000,
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

app.get('/getReportByDate/:date', (req, res, next) => {
    data.getReportByDate(req.params.date).then((result, error) => {
        res.status(200).json(result);
    }, (error) => {
        console.log(error);
        next();
    });
});

app.post('/enterNewReport/', (req, res, next) => {
    console.log("Enter new report entered in server.js");
    data.enterNewReport(req.body.mcafee,
        req.body.teknas,
        req.body.snow,
        req.body.umbrella,
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
        req.body.adware,
        req.body.virus,
        req.body.mail).then((result) => {
        result.length === 0 ? next() : res.status(200).json(result);
    }, (error) => {
        console.log(error);
        next();
    })
})

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

//error 404 route
app.all('*', (req, res) => {
    res.send(`error: route not found, global handler`);
});

app.listen(port,
    () => {
        console.log(`listening on port ${port}`);
});

