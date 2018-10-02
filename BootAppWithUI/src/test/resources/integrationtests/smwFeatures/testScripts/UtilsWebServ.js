var objGeneral = require('./UtilsGen.js');
var http = require('http');
var objMainUtils = require('./Utils.js');
var request = require("request");
var fs = require('fs');
var xpath = require('../../node_modules/xpath/xpath.js'),dom = require('../../node_modules/xmldom').DOMParser

module.exports = function() {
	this.Given(/^the end point "([^"]*)" and execute with request XML "([^"]*)" and save to file "([^"]*)"$/, function (arg1,arg2,arg3) {
		var wstream = fs.createWriteStream(''+arg3+'',"utf-8");
		var postData = fs.readFileSync(''+arg2+'',"utf-8");
		var strIndex=arg1.split("/");
		var options = {hostname: ''+strIndex[2]+'',port: 8080,path: "/"+strIndex[3]+"/"+strIndex[4]+"",method: 'POST',
			headers:{'Content-Type': 'text/xml;charset=UTF-8','SOAPAction': '','Accept-Encoding': 'gzip,deflate','Content-Length': postData.length}};
		var req=http.request(options, function(res){
			console.log('STATUS: '+res.statusCode);
			console.log('HEADERS: '+JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data',function (chunk) {wstream.write(chunk);});
		});
		req.on('error',function(e){console.log('problem with request: ' +e.message);});
		req.write(postData);
		req.end();
	});
	
	this.Then(/^extract from response with xpath "([^"]*)" from "([^"]*)" and store in "([^"]*)"$/, function (arg1,arg2,arg3) { 
		var xml = fs.readFileSync(''+arg2+'',"utf-8");
		var doc = new dom().parseFromString(xml);
		var node =xpath(doc,""+arg1+"")[0].data
		objGeneral.saveDataToFile(arg3,node);
	});
	
	//--Developed for FAN
	this.Then(/^Execute PUT on Endpoint "([^"]*)" with json file "([^"]*)"$/, function(arg1,arg2) {
		try {
			var postData = fs.readFileSync(''+arg2+'',"utf-8");
			console.log('sync readFile');
			var test1=JSON.parse(postData);
		}
		catch (e) {
			console.log(e);
		}	
		var options = { method: 'PUT',
			url: ''+arg1+'',
			headers: 
			{ 'cache-control': 'no-cache',
			'content-type': 'application/json' },
			body: test1,
			json: true
		};
		request(options, function (error, response, body) {
			if (error) throw new Error(error);
			console.log(response);
			//console.log(body);
		});
	});
}
