'use strickt'
const http = require("http");

class Splunk {
	getLastWeekSnow(jobId) {
		var result;
		var base64encodedData = new Buffer('rLevy : AaAa1234').toString('base64');
    	var options = {
    		host: 'splunk.verint.corp.verintsystems.com',
    		port: '8089',
    		path: `/search/jobs/${jobId}/events?count=1500`,
    		method: 'GET',
    		headers: {
    			'Access-Control-Allow-Origin' : '*',
    			'Access-Control-Allow-Headers' : '*',
    			'Authorization' : 'Basic ' + base64encodedData,
    			'Content-Type'  : 'application/x-www-form-urlencoded'
    		}
    	}
		const req = http.request(options, (res) => {
		  console.log(`STATUS: ${res.statusCode}`);
		  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		    console.log(`BODY: ${chunk}`);
		  });
		  res.on('end', () => {
		    console.log('No more data in response.');
		  });
		});

		req.on('error', (e) => {
		  console.error(`problem with request: ${e.message}`);
		});
		req.write(result);
		req.end();
		resolve(result);	
	}
}  

module.exports = () => {
    var splunk = new Splunk();
    return splunk;
}