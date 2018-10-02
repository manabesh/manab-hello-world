var reporter = require('cucumber-html-reporter');
const argv = require('yargs').argv;

var jsonReportPath = argv.jsonReportPath;
var htmlReportpath = argv.htmlReportPath;
var stage = argv.stage;
var options = {
        theme: 'bootstrap',
        jsonFile: jsonReportPath,
        output: htmlReportpath,
        reportSuiteAsScenarios: true,
        launchReport: false,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": stage,
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "Windows 10",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        }
    };
 
    reporter.generate(options);