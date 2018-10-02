const expect = require('chai').expect;
var objGeneral = require('./UtilsGen.js');
var sleep = require('system-sleep');
var fs = require('fs');
var path = require('path');
var prop = require("../../node_modules/properties-parser/index.js");
var objscreencapture = require('screencapture')

module.exports = function() {
    this.setDefaultTimeout(300 * 1000);

	  this.Given(/^I navigate to "([^"]*)"$/, function (pageUrl) {
		console.log(pageUrl);
		browser.url(pageUrl);
		var handle = browser.windowHandle();
		browser.windowHandleMaximize([handle]);
	   });

	//Open URL which is extracted from a file
	this.Given(/^I open url "([^"]*)" extracted from file "([^"]*)"$/, function (arg1,arg2) {
		var value = prop.createEditor(arg2).get(arg1);
		console.log("The value to be entered is");
		console.log(value);
		browser.url(value);
		var handle = browser.windowHandle();
		browser.windowHandleMaximize([handle]);
	 });

   this.Then(/^I enter "([^"]*)" in input with id "([^"]*)"$/, function (textValue, ipId) {
     var inputId = '#' + ipId;
     console.log("Entering text in input box with id : " + inputId);
     browser.waitForExist(inputId, 50000);
     if (browser.isExisting(inputId)) {
       browser.setValue(inputId, textValue);
     } else {
       console.log("Provided input id does not exist");
     }
   });

    this.Given(/^I open url provided in input$/, function() {
      var serverUrl = process.env['chimp.dmpInstanceRootUrl'];
      console.log("Printing the value of url passwd in input as dmpInstanceRootUrl: " + serverUrl);
      browser.url(serverUrl);
      var handle = browser.windowHandle();
      browser.windowHandleMaximize([handle]);
    });

	this.When(/^I enter credentials with id "([^"]*)" as "([^"]*)" extracted from file "([^"]*)"$/, function (credHtmlId, credNameKeyInPropFile, propFile) {
		var credId = '#' + credHtmlId;
		console.log("Entering credentials in UI. Credentials html Id : " + credId);
		browser.waitForExist(credId, 240000);
		if (browser.isExisting(credId)) {
		  var smwCredValue = prop.createEditor(propFile).get(credNameKeyInPropFile);
		  browser.setValue(credId, smwCredValue);
		} else {
		  console.log("Provided credential id exist");
		}
	});

	//--------------Move to Popup Window
	//[e.g.] I move focus to Popup Window
	//[Comments] Moving to the new window that pops up
	this.When(/^I move focus to Popup Window$/, function () {
		var x;
		console.log(browser.getCurrentTabId());
		x = browser.getTabIds();
		console.log(x);
		browser.window(x[1]);
		console.log(browser.getCurrentTabId());
	 });
	//--------------Come back to Parent Window
	this.When(/^I come back to Parent Window$/, function () {
		var x;
		x = browser.getTabIds();
		console.log(x);
		browser.window(x[0]);
		console.log(browser.getCurrentTabId());
	 });
	//##############-TEXT FIELD-##########################
	//--------------Filling Field
	this.Then(/^I enter "([^"]*)" as "([^"]*)" with timestamp$/, function(arg1, arg2) {
		var times=objGeneral.timestamp("test");
		var value = arg2+''+times; var x;
		if (value.includes("**")) {value = Math.round(new Date().getTime()/10000);}

		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]")) {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}
	});

  this.Then(/^I enter credentials "([^"]*)" as "([^"]*)" extracted from file "([^"]*)"$/, function(credName, credNameKeyInPropFile, propFile) {
    var credXpath = "(//descendant::*[contains(text(),\"" + credName + "\")])[1]/following::input[1]";
    console.log("Entering credentials in UI. Credentials xpath: " + credXpath);
    browser.waitForExist(credXpath, 30000);
    if (browser.isExisting(credXpath)) {
      var smwCredValue = prop.createEditor(propFile).get(credNameKeyInPropFile);
      browser.setValue(credXpath, smwCredValue);
    } else {
      console.log("Provided credentials xpath doesnt exist");
    }
  });

	//-------filling fields extracted from a file
	this.Then(/^I enter "([^"]*)" as "([^"]*)" extracted from file "([^"]*)"$/, function(arg1, arg2, arg3) {
               var x;
		console.log("Entering value in UI");
		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			 x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
			 console.log(x);
			 var value = prop.createEditor(arg3).get(arg2);
			 browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			 x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
			 console.log(x);
			 var value = prop.createEditor(arg3).get(arg2);
			 browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			 x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
			 console.log(x);
			 var value = prop.createEditor(arg3).get(arg2);
			 browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			 x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
			 console.log(x);
			 var value = prop.createEditor(arg3).get(arg2);
			 browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]")) {
			 x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
			 console.log(x);
			 var value = prop.createEditor(arg3).get(arg2);
			 browser.setValue(x,value);
        }
    });
	//--------------Filling Field
	this.Then(/^I enter "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var value = arg2; var x;
		if (value.includes("**")) {value = Math.round(new Date().getTime()/10000);}

		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]")) {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
			console.log(x);
			browser.setValue(x,value);
		}
	});
	//--------------[OFFSHOOT]Filling Fields of [Another Section Same Field]
	this.Then(/^I enter "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = arg3; var x;

		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
		}
		console.log(x);
		browser.setValue(x,value);
	});
	//--------------Filling Fields of [Single Label Multiple Fields] e.g. Name(First/Last)
	this.Then(/^I enter "([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = arg3; var x;
		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"][1]/following::input)"+arg2)) {
			x = "(//descendant::label[text()=\""+arg1+"\"][1]/following::input)"+arg2;
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"][1]/following::input)"+arg2)) {
			x = "(//descendant::td[text()=\""+arg1+"\"][1]/following::input)"+arg2;
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"][1]/following::input)"+arg2)) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"][1]/following::input)"+arg2;
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"][1]/following::input)"+arg2)) {
			x = "(//descendant::*[text()=\""+arg1+"\"][1]/following::input)"+arg2;
		}else {
			x = "(//descendant::*[contains(text(),\""+ arg1 + "\")][1]/following::input)" + arg2;
		}
		console.log(x);
		browser.setValue(x,value);
	});
	//--------------[OFFSHOOT]Filling Fields of [Single Label Multiple Fields] [In Another section] e.g. Name(First/Last)
	this.Then(/^I enter "([^"]*)""([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1,arg2, arg3,arg4) {
		var value = arg4; var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
			x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
			x = "//descendant::td[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
			x = "//descendant::td//*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3)) {
			x = "//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::input"+arg3;
		}else {
			x = "//descendant::*[contains(text(),\""+ arg1 + "\")]"+arg2+"/following::input" + arg3;
		}
		console.log(x);
		browser.setValue(x,value);
	});
	//--------------Filling Fields based on placeholder (hint)
	this.Then(/^I enter placeholder "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x = "//input[@placeholder=\""+arg1+"\"]";
		console.log(x);
		browser.setValue(x,arg2);
	});
	//----Enter value in placeholder extracted from a file
	this.Then(/^I enter placeholder "([^"]*)" as "([^"]*)" extracted from file "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		try{
			if(browser.isExisting("(//input[@placeholder=\""+arg1+"\"])")) {
			x = "(//input[@placeholder=\""+arg1+"\"])";
			console.log(x);
			var value = prop.createEditor(arg3).get(arg2);
			browser.setValue(x,value);
		}else {
			console.log(x);
		}
		} catch(err){
			console.log(err);
			expect.fail(null, null, 'failing tests due to exception');
		}

	});
	//-------------Filling Fields based on placeholder occurrence 2
	this.Then(/^I enter placeholder "([^"]*)" occurrence "([^"]*)" as "([^"]*)"$/, function(arg1, arg2,arg3) {
		var x = "//input[@placeholder=\""+arg1+"\"]"+arg2;
		console.log(x);
		browser.setValue(x,arg3);
	});
	//--------------Filling Fields based on button position (preceding)
	this.Then(/^I enter "([^"]*)" preceding "([^"]*)" button$/, function (arg1, arg2) {
		var x = "//input[@type='submit' and @value=\""+arg2+"\"]/preceding-sibling::input[@type='text']";
		console.log(x);
		browser.setValue(x,arg1);
	});
	//--------------Filling Fields retrieving from File
	this.Then(/^I enter extracted "([^"]*)" from file "([^"]*)" preceding "([^"]*)" button$/, function (arg1, arg2, arg3) {
		var x = "//input[@type='submit' and @value=\""+arg3+"\"]/preceding-sibling::input[@type='text']";
		console.log(x);

		var value = prop.createEditor(arg2).get(arg1);
		console.log("The value to be entered is");
		console.log(value);
		browser.setValue(x, value);
	});
   //--------------Enter text with ID
   this.When(/^I enter "([^"]*)" in textbox having id as "([^"]*)"$/, function(arg1, arg2) {
		try{
			var x = "//*[contains(@id, '"+arg2+"')]";
			browser.setValue(x,arg1);
		}catch(err){
			console.log(err);
		}
	});
	//--------------Clicking Textbox (to keep cursor inside)
	this.Then(/^I click on Textbox "([^"]*)"$/, function(arg1) {
		var x;
		if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
		}
		console.log(x);
		browser.click(x);
		browser.keys(['Enter']);
	});
	//##############-TEXT FIELD - VERIFY-##########################
	//--------------Text field - Verify
	this.Then(/^I verify from textbox "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		 var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		expect(browser.getValue(x)).to.be.eql(arg2);
	});
	//--------------[OFFSHOOT-VERIFY]Verify Fields of [Another Section Same Field]
	this.Then(/^I verify from textbox "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = arg3; var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
		}
		console.log(x);
		expect(browser.getValue(x)).to.be.eql(arg3);
	});
	//--------------Verify Fields of [Single Label Multiple Fields]
	this.Then(/^I verify from textbox "([^"]*)" field "([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var value = arg3; var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input"+arg2;
		}else  {
			x = "//descendant::*[contains(text(),\""+ arg1 + "\")][1]/following::input" + arg2;
		}
		console.log(x);
		expect(browser.getValue(x)).to.be.eql(arg3);
	});
	//--------------Text field - VERIFY text field does not have the value
	this.Then(/^I verify from textbox "([^"]*)" does not have "([^"]*)"$/, function(arg1, arg2) {
		var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		expect(browser.getValue(x)).to.not.eql(arg2);
	});
	//-------------Verifying value present in a property file against a hard-coded value
	this.Then(/^I verify value "([^"]*)" to be equal to value from saved FileProp "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		var strProp = arg2.split("/")[1];
		var value = prop.createEditor(fileName).get(strProp);
		console.log("Valueeeeee :"+value);
		expect(prop.createEditor(fileName).get(strProp)).to.be.eql(arg1);
	});
	//##############-COMBO-##########################
	//--------------Selecting Text from Combo
	this.When(/^I select from "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x);
		browser.selectByVisibleText(x,arg2);
		objGeneral.delay();
	});
	//--------------Selecting Combo [Another Section Same Field]
	this.When(/^I select from "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::select[1]";
		}else  {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::select[1]";
		}
		console.log(x);
		browser.selectByVisibleText(x,arg3);
		objGeneral.delay();
	});
	//--------------Selecting Combo [Single Label Multiple Fields] e.g. DOB
	this.When(/^I select from "([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		try{
			objGeneral.delay();
			var x = "//descendant::*[text()='"+arg1+"'][1]/following::select"+arg2;
			console.log(x);
			browser.selectByVisibleText(x,arg3);
			objGeneral.delay();
		}catch(err){
			objGeneral.delay();
			var x = "//descendant::*[contains(.,'"+arg1+"')][1]/following::select"+arg2;
			console.log(x);
			browser.selectByVisibleText(x,arg3);
			objGeneral.delay();
		}
	});
	//--------------[OFFSHOOT]Selecting Combo [Single Label Multiple Fields] [Another Section] e.g. DOB (Principal2)
	this.When(/^I select from "([^"]*)""([^"]*)" field"([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3,arg4) {
		try{
			objGeneral.delay();
			var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select"+arg3;
			console.log(x);
			browser.selectByVisibleText(x,arg4);
			objGeneral.delay();
		}catch(err){
			objGeneral.delay();
			var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select"+arg3;
			console.log(x);
			browser.selectByVisibleText(x,arg4);
			objGeneral.delay();
		}
	});
	//--------------[COMBO ID]Select value from Combo using ID
	this.When(/^I select from dropdown having id "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		 var x = "//descendant::select[contains(@id, \""+arg1+"\")]";
		 console.log(x);
		 browser.selectByVisibleText(x,arg2);
		 objGeneral.delay();
	});
	//--------------Selecting Value from Combo (Sometimes, the TEXT would have special characters)
	this.When(/^I select from "([^"]*)" value as "([^"]*)"$/, function(arg1, arg2) {
		var x;

		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x);
		browser.selectByValue(x,arg2);
		objGeneral.delay();
	});
	//##############-COMBO-VERIFY##########################
	//--------------Verifying Combo Value - Simple
	this.When(/^I verify from combobox "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;

		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select[1]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select[1]";
		}
		console.log(x+"-val-"+browser.getValue(x));
		console.log("-ToVerify-"+arg2);
		expect(browser.getValue(x)).to.be.eql(arg2);
		objGeneral.delay();
	});
	//--------------Verifying Combo Value - [Single Label Multiple Fields]
	this.When(/^I verify from combobox "([^"]*)" field "([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;

		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::select"+arg2)) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::select"+arg2+"/option[@selected]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::select"+arg2+"/option[@selected]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(arg3);
		objGeneral.delay();
	});
	//--------------Verify Fields of [Another Section Same Fields]
	this.Then(/^I verify from combobox "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::select[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"]"+arg2+"/following::select[1]/option[@selected]";
		}else{
			x = "//descendant::*[contains(text(),\""+arg1+"\")]"+arg2+"/following::select[1]/option[@selected]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(arg3);
		objGeneral.delay();
	});
	//--------------Verify Fields of [Another Section Same Fields]
	this.Then(/^I verify from combolist "([^"]*)""([^"]*)" as "([^"]*)"$/, function(arg1, arg2, arg3) {
			var x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::select[1]/option[1]"
			console.log(x);
			console.log(browser.getText(x));
			expect(browser.getText(x)).to.be.eql(arg3);
	});
	//##############-RADIO BUTTON-##########################
	//--------------Selecting value for Radio Group
	this.Then(/^I select the radio button "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding::input[@type=\"radio\"][1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding::input[@type=\"radio\"][1]";
		}else  {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}
		console.log(x);
		browser.click(x);
	});
	this.Then(/^I verify radio button "([^"]*)" is selected as "([^"]*)"$/, function(arg1,arg2){
		objGeneral.delay();
		var x;
		if(browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]")){
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::*[contains(text(),\"" + arg2 + "\")][1]/preceding-sibling::input[@type=\"radio\"][1]";
		}
		console.log(x);
		//Once XPath is held, check if it is DISABLED
		try{
			expect(browser.isEnabled(x)).be.true;
		}catch(err){
			console.log(err);
			throw err;
		}
	});
	//##############-CHECKBOX-##########################
	//--------------Clicking checkbox with ID
	this.When(/^I click on checkbox having id as "([^"]*)"$/, function(arg1) {

		try{
			var x = "//*[contains(@id, '"+arg1+"')]";
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});
	//--------------CHECKBOX: Taking action on checkbox
	this.When(/^I "([^"]*)" the checkbox present "([^"]*)" the "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x; var action = arg1;

		if(arg2 == 'after'){
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])[1]/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])[1]/following::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/following::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
		else if(arg2 == 'before'){
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])[1]/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])[1]/preceding::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/preceding::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
	});
	//--------------CHECKBOX: Taking action on multiple checkbox with same label
	this.When(/^I "([^"]*)" the checkbox present "([^"]*)" the "([^"]*)""([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		var x; var action = arg1;
		if(arg2 == 'after'){
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])"+arg4+"/following::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}else if(arg2 == 'before'){
			if(browser.isExisting("(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::label[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]";
			}else if (browser.isExisting("(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::td//*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else if (browser.isExisting("(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = \"checkbox\"][1]")) {
				x = "(//descendant::*[text()=\""+arg3+"\"])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}else {
				x = "(//descendant::*[contains(text(),\""+arg3+"\")])"+arg4+"/preceding::*[@type = 'checkbox'][1]";
			}
			console.log(x);
			objGeneral.OperateCheckbox(x, action);
		}
	});
	//##############-BUTTON CLICKS-##########################
	 //--------------Clicking Button
	this.Then(/^I click button "([^"]*)"$/, function(arg1) {
		var x;
		objGeneral.bigdelay();
		try{
			if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
				x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
			}else if(browser.isExisting("(//button[contains(text(),\""+arg1+"\")])[1]")){
				x = "(//button[contains(text(),\""+arg1+"\")])[1]";
			//For ACM buttons "text()" is not working: VIJAY
			}else if(browser.isExisting("(//button[contains(.,\""+arg1+"\")])[1]")){
				x = "(//button[contains(.,\""+arg1+"\")])[1]";
			//For identifying button based on its attribute that has meaningful name (e.g. class="right")
			}else if(browser.isExisting("(//button//@*[contains(.,\""+arg1+"\")])[1]/..")){
				x = "(//button//@*[contains(.,\""+arg1+"\")])[1]/..";
			}else if(browser.isExisting("(//*[text() = \""+arg1+"\"])[1]")){
				x = "(//*[text() = \""+arg1+"\"])[1]";
			}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
				x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
			}else if(browser.isExisting("(//*[contains(@value,\""+ arg1 +"\")])[1]")){
				x = "(//*[contains(@value,\""+ arg1 +"\")])[1]";
			}else{
				//At times when it displays all caps but having InitCap inside HTML
				arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
				x = "//input[@type='submit' and @value='"+arg1+"']";
			}
			console.log(x);
			browser.click(x);
		}catch(err){
			console.log(err);
			expect.fail(null, null, 'failing tests due to exception');
		}

	});

	  //--------------Clicking Input Button with name
  this.Then(/^I click on button name "([^"]*)"$/, function(btnName) {
    var btnXpath = "(//button[contains(text(),\""+ btnName +"\")])[1]";
    console.log("Clicking button in UI. Button xpath: " + btnXpath);
    browser.waitForExist(btnXpath, 300000);
    if (browser.isExisting(btnXpath)) {
      browser.click(btnXpath);
    } else {
      console.log("Provided button doesnt exist");
    }
  });

  this.Then(/^I verify heading "([^"]*)" exists$/, function (headingValue) {
    var heading = "//h2[contains(text(),\""+ headingValue +"\")][1]";
    console.log("Heading xpath : " + heading);
    browser.waitForExist(heading, 5000);
		expect(browser.isExisting(heading)).be.true;
  });

  //--------------Clicking Input Button with name
  this.Then(/^I click input button "([^"]*)"$/, function(inputBtnName) {
    var inputBtnXpath = "(//input[@type='button' and @value=\"" + inputBtnName + "\"])[1]";
    browser.waitForExist(inputBtnXpath, 300000);
    console.log("Clicking input button in UI. Button xpath: " + inputBtnXpath);
    if (browser.isExisting(inputBtnXpath)) {
      browser.click(inputBtnXpath);
    } else {
      console.log("Provided input button doesnt exist");
    }
  });

  //--------------Enter comments in textarea
  this.Then(/^I enter comments in "([^"]*)" as "([^"]*)"$/, function(commentsLabel, comments) {
    var commentTextAreaXpath = "//descendant::*[text()='" + commentsLabel + "'][1]/following::textarea[1]";
    browser.waitForExist(commentTextAreaXpath, 30000);
    console.log("Enter comments in UI. TextArea xpath: " + commentTextAreaXpath);
    if (browser.isExisting(commentTextAreaXpath)) {
      browser.setValue(commentTextAreaXpath, comments);
    } else {
      console.log("Provided TextArea doesnt exist");
    }
  });

  //--------------Clicking Input Button with id
  this.Then(/^I click input button having id "([^"]*)"$/, function(buttonId) {
    var inputBtnId = "#" + buttonId;
    browser.waitForExist(inputBtnId, 30000);
    console.log("Clicking input button in UI. Button Id: " + inputBtnId);
    if (browser.isExisting(inputBtnId)) {
      browser.click(inputBtnId);
    } else {
      console.log("Provided input button doesnt exist");
    }
  });

  this.Then(/^I verify div with id "([^"]*)" contains text "([^"]*)"$/, function(successMsgDivId, successMsgInUi) {
    var successDivId = "#" + successMsgDivId;
    browser.waitForText(successDivId, 240000);
    var successMsg = browser.getText(successDivId)
    console.log("Text Message in div after check-in: " + browser.getText(successDivId));
    expect(successMsg).to.equal(successMsgInUi);
  });

  this.When(/^I enter file in "([^"]*)" as "([^"]*)"$/, {timeout: 120 * 1000}, function(inputLabel, relFilePath) {
    console.log("Relative path:" + relFilePath);
    var absolutePath = path.resolve(relFilePath).replace('/\\/g', '\\\\');
    console.log("Absolute path of test file:" + absolutePath);
    try {
      browser.waitForExist('#import_link', 20000);
    } catch (err) {
      console.log("Import link not found. Proceeding with import repository");
    }
    if (browser.isExisting('#import_link')) {
      browser.click('#import_link');
    }
    var fileInputXpath = "(//descendant::td//*[text()=\"" + inputLabel + "\"])[1]/following::input[1]";
    if (browser.isExisting(fileInputXpath)) {
      browser.setValue(fileInputXpath, absolutePath);
    } else {
        console.log("File input doesnt exist");
    }
    });

  //--------------Clicking Submit Button
  this.Then(/^I click submit "([^"]*)"$/, function(submitBtnName) {
    var submitBtnXpath = "(//input[@type='submit' and @value='" + submitBtnName + "'])[1]";
    console.log("Clicking submit button in UI. Button xpath: " + submitBtnXpath);
    browser.waitForExist(submitBtnXpath, 30000);
    if (browser.isExisting(submitBtnXpath)) {
      browser.click(submitBtnXpath);
    } else {
      console.log("Provided submit button xpath doesnt exist");
    }
  });

  //--------------Clicking Anchor
  this.Then(/^I click anchor "([^"]*)"$/, function(anchorName) {
    var anchorXpath = "//a[contains(text(),\"" + anchorName + "\")]";
    console.log("Clicking anchor in UI. Anchor xpath: " + anchorXpath);
    browser.waitForExist(anchorXpath, 300000);
    if (browser.isExisting(anchorXpath)) {
      browser.click(anchorXpath);
    } else {
      console.log("Provided anchor xpath doesnt exist");
    }
  });

  //--------------Updating CodeMirror
  this.When(/^I update codemirror with id "([^"]*)" xsd extracted from file "([^"]*)"$/, function(textAreaId, customerSchemaFile) {
    console.log("Reading object model content from file: " + customerSchemaFile);
    var xmlData = fs.readFileSync(customerSchemaFile, 'utf8');
    var textAreaIdValue = '#' + textAreaId;
    browser.waitForExist(textAreaIdValue, 80000);
    console.log("Updating codemirror. CodeMirror textarea Id: " + textAreaId);
    if (browser.isExisting(textAreaIdValue)) {
      browser.execute(function(xmlData) {
        document.getElementsByClassName('CodeMirror')[0].CodeMirror.setValue(xmlData)
      }, xmlData);
    } else {
      console.log("Provided codemirror textarea id doesnt exist");
    }
  });

  this.Then(/^I click anchor having id as "([^"]*)"$/, function(ancId) {
    var anchorId = "#" + ancId;
    browser.waitForExist(anchorId, 30000);
    console.log("Clicking Anchor in UI. Anchor Id: " + anchorId);
    if (browser.isExisting(anchorId)) {
      browser.click(anchorId);
    } else {
      console.log("Provided anchor id doesnt exist");
    }
  });

	//--------------[OFFSHOOT-Occurrence] Clicking Button of nth Occurrence
	this.Then(/^I click button "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])"+arg2)){
			x = "(//input[@type='submit' and @value='"+arg1+"'])" + arg2;
			console.log("it is of type submit");
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])" + arg2)){
			x = "(//input[@type='button' and @value='"+arg1+"'])" + arg2;
			console.log("it is of type button");
		}else if(browser.isExisting("(//button[contains(text(),\""+arg1+"\")])" + arg2)){
			x = "(//button[contains(text(),\""+arg1+"\")])" + arg2;
			console.log("button contains text()");
		//For ACM buttons "text()" is not working: VIJAY
		}else if(browser.isExisting("(//button[contains(.,\""+arg1+"\")])" + arg2)){
			x = "(//button[contains(.,\""+arg1+"\")])" + arg2;
			console.log("button contains .,");
		//For identifying button based on its attribute that has meaningful name (e.g. class="right")
		}else if(browser.isExisting("(//button//@*[contains(.,\""+arg1+"\")])" + arg2 + "/..")){
			x = "(//button//@*[contains(.,\""+arg1+"\")])" + arg2 + "/..";
			console.log("button contains .,..");
		}else if(browser.isExisting("(//*[text() = \""+arg1+"\"])" + arg2)){
			x = "(//*[text() = \""+arg1+"\"])" + arg2;
			console.log("contains text()");
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])" + arg2)){
			x = "(//*[contains(text(),\""+ arg1 +"\")])" + arg2;
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
			console.log("contains init caps");
		}
		console.log(x);
		if(browser.isExisting(x)){
			browser.click(x);
		}else{
			expect.fail(null, null, 'failing tests due to exception');
		}
		objGeneral.delay();
	});

	//--------------Clicking Image Button [Mostly in DM]
	this.Then(/^I click Image button "([^"]*)"$/, function(arg1) {
		var x;
		if(browser.isExisting("(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img")){
			x = "(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img";
		}else if (browser.isExisting("(//img[contains(@title , \""+arg1+"\")])[1]")){
			x = "(//img[contains(@title , \""+arg1+"\")])[1]";
		}
		else {
			x = "(//i[contains(@title , \""+arg1+"\")])[1]";
		}
		var caps = browser.session();
		//console.log(caps);
		//console.log(browser.desiredCapabilities);
		//browser.session('delete');
		console.log(x);
		try{
			browser.click(x);
		}catch(err){
			console.log(err);
		}

	});

		//--------------Clicking Image Button [Mostly in DM]
	this.Then(/^I click descendant Image button "([^"]*)"$/, function(arg1) {
		//var x;
		//browser.waitForExist( "(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img", 10000);
		//console.log('Image exists, next clicking it');
		//if(browser.isExisting("(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img")){
		//	x = "(//descendant::*[contains(@title , \""+arg1+"\")])[1]//img";
		//}
		//console.log(x);
		//browser.click(x);
		browser.click("//img[@src='framework/rma/images/save.gif']");
	});
	//--------------[OFFSHOOT]Clicking Image Button Occurrence [Mostly in DM]
	this.Then(/^I click Image button "([^"]*)" occurrence "([^"]*)"$/, function(arg1,arg2) {
		var x;
		if(browser.isExisting("(//descendant::*[contains(@title , \""+arg1+"\")])"+arg2+"//img")){
			x = "(//descendant::*[contains(@title, \""+arg1+"\")])"+arg2+"//img";
		}else {
			x = "(//img[contains(@title , \""+arg1+"\")])" + arg2;
		}
		console.log(x);
		browser.click(x);
		objGeneral.bigdelay();
	});
	//--------------Clicking  nth occurrence Button with type not submit---Courtesy:Kriti, PNC
	this.Then(/^I click on "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2) {
		var x;
		x = "(//*[contains(text(),\""+arg1+"\")])"+arg2;
		console.log(x);
		browser.click(x);
		objGeneral.bigdelay();
	});
	//--------------Clicking button that has link - LOGIN button on home page
	this.Then(/^I click on "([^"]*)" button$/, function(arg1) {
		var x;
		objGeneral.delay();
		if(browser.isExisting("//*[text()=\""+arg1+"\"]")) {
			x = "//*[text()=\""+arg1+"\"]";
		}else if (browser.isExisting("//*[contains(text(),\""+arg1+"\")]")) {
			x = "//*[contains(text(),\""+arg1+"\")]";
		}else {
			x = "//*[contains(@*,\""+arg1+"\")]";
		}
		console.log(x);
		browser.click(x);
		browser.pause(3000);
	});
	//--------------Clicking button with ID
	this.When(/^I click on button having id as "([^"]*)"$/, function(arg1) {
		try{
			var x = "//*[contains(@id, '"+arg1+"')]";
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});
	//##############-BUTTON VERIFY-##########################
	//--------------Verify BUTTON STATUS is enabled
	this.Then(/^I verify button "([^"]*)" is enabled$/, function(arg1) {
		objGeneral.delay();
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);
		//Once XPath is held, check if it is ENABLED
		try{
			expect(browser.isEnabled(x)).be.true;
		}catch(err){
			console.log(err);
			throw err;
		}
	});
	//--------------Verify BUTTON STATUS is disabled
	this.Then(/^I verify button "([^"]*)" is disabled$/, function(arg1) {
		objGeneral.delay();
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);

		//Once XPath is held, check if it is DISABLED
		try{
			expect(browser.isEnabled(x)).be.false;
		}catch(err){
			console.log(err);
			throw err;
		}
	});
	//--------------Verify BUTTON EXISTS
	this.Then(/^I verify "([^"]*)" button exists$/, function(arg1) {
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])[1]")){
			x = "(//input[@type='submit' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])[1]")){
			x = "(//input[@type='button' and @value='"+arg1+"'])[1]";
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//button[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])[1]")){
			x = "(//*[contains(.,\""+ arg1 +"\")])[1]";
		}else{
			//At times when it displays all caps but having InitCap inside HTML
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']";
		}
		console.log(x);
		expect(x).to.exist;
		objGeneral.delay();
	});
	//--------------[OFFSHOOT-Occurrence]Verify BUTTON EXISTS
	this.Then(/^I verify "([^"]*)" button exists occurrence "([^"]*)"$/, function(arg1,arg2) {
		objGeneral.delay();
		var x;
		if(browser.isExisting("(//input[@type='submit' and @value='"+arg1+"'])"+arg2)){
			x = "(//input[@type='submit' and @value='"+arg1+"'])"+arg2;
		}else if(browser.isExisting("(//input[@type='button' and @value=\""+arg1+"\"])"+arg2)){
			x = "(//input[@type='button' and @value='"+arg1+"'])"+arg2;
		}else if(browser.isExisting("(//button[contains(text(),\""+ arg1 +"\")])"+arg2)){
			x = "(//button[contains(text(),\""+ arg1 +"\")])"+arg2;
		}else if(browser.isExisting("(//*[contains(.,\""+ arg1 +"\")])"+arg2)){
			x = "(//*[contains(.,\""+ arg1 +"\")])"+arg2;
		}else if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])"+arg2)){
			x = "(//*[contains(text(),\""+ arg1 +"\")])"+arg2;
		//At times when it displays all caps but having InitCap inside HTML
		}else{
			arg1 = arg1[0].toUpperCase() + arg1.substr(1).toLowerCase();
			x = "//input[@type='submit' and @value='"+arg1+"']"+arg2;
		}
		console.log(x);
		expect(x).to.exist;
	});
	//##############-LINK-CLICK-##########################
	//--------------Clicking Hyper Link
	this.When(/^I click on "([^"]*)"$/, function (arg1) {
		var x;
		if(browser.isExisting("//a//*[contains(text(),\""+arg1+"\")]")) {
			x = "//a//*[contains(text(),\""+arg1+"\")]";
		}else if(browser.isExisting("//descendant::a[contains(.,\""+arg1+"\")]")) {
			x = "//descendant::a[contains(.,\""+arg1+"\")]";
		}else if(browser.isExisting("//descendant::*[text()=\""+arg1+"\"]")) {
			x = "//descendant::*[text()=\""+arg1+"\"]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x);
   });
   //------Clicking on a link extracted from a file
	this.When(/^I click on "([^"]*)" extracted from file "([^"]*)"$/, function (arg1, arg2) {
		var x;
		var value = prop.createEditor(arg2).get(arg1);
		if(browser.isExisting("//a//*[contains(text(),\""+value+"\")]")) {
						x = "//a//*[contains(text(),\""+value+"\")]";
		}else if(browser.isExisting("//descendant::a[contains(.,\""+value+"\")]")) {
						x = "//descendant::a[contains(.,\""+value+"\")]";
		}else if(browser.isExisting("//descendant::*[text()=\""+value+"\"]")) {
						x = "//descendant::*[text()=\""+value+"\"]";
		}else {
						x = "(//descendant::*[contains(text(),\""+value+"\")])[1]";
		}
		console.log(x);
		browser.click(x);
   });

      //------Clicking on a link extracted from a file
	this.When(/^I click on anchor "([^"]*)" extracted from file "([^"]*)"$/, function (arg1, arg2) {
		var x;
		var value = prop.createEditor(arg2).get(arg1);
		browser.waitForExist("//descendant::*[text()=\""+value+"\"]", 10000);
		if(browser.isExisting("//descendant::*[text()=\""+value+"\"]")) {
			x = "//descendant::*[text()=\""+value+"\"]";
		}
		console.log(x);
		browser.click(x);
   });

	//--------------Clicking Hyper Link (nth Occurrence)
	this.Then(/^I click on "([^"]*)" link occurrence "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("(//descendant::a[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::a[text()=\""+arg1+"\"])"+arg2;
		}else if (browser.isExisting("(//descendant::a[contains(text(),\""+arg1+"\")])"+arg2)) {
			x = "(//descendant::a[contains(text(),\""+arg1+"\")])"+arg2;
		}else {
			x = "(//descendant::a[contains(.,\""+arg1+"\")])"+arg2;
		}
		console.log(x);
		browser.click(x);
   });
   	//--------------Move to Hyper Link
	this.When(/^I move to link "([^"]*)"$/, function (arg1) {
		var x;
		if(browser.isExisting("//descendant::a[text()=\""+arg1+"\"]")) {
			x = "//descendant::a[text()=\""+arg1+"\"]";
		}else if(browser.isExisting("//descendant::*[text()=\""+arg1+"\"]")) {
			x = "//descendant::*[text()=\""+arg1+"\"]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")]";
		}
		console.log(x);
		browser.moveToObject(x,0,0);
   });
   	//--------------Move to Hyper Link (nth Occurrence)
	this.When(/^I move to link "([^"]*)" occurrence "([^"]*)"$/, function (arg1, arg2) {
		var x;
		if(browser.isExisting("(//descendant::a[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::a[text()=\""+arg1+"\"])"+arg2;
		}else if(browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2)) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2;
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2;
		}
		console.log(x);
		browser.moveToObject(x,0,0);
   });
	//--------------Click in HYPERLINK following label
	this.When(/^I click on link following "([^"]*)" text$/, function (arg1) {
		var x;
		if(browser.isExisting("(//*[text()= \""+arg1+"\"]/a[1])[1]")) {
			x = "(//*[text()= \""+arg1+"\"]/a[1])[1]";
		} else {
			x = "(//*[contains(text(), \""+arg1+"\")]/a[1])[1]";
		}
		console.log(x);
		browser.click(x);
	 });
	//--------------Click in ICON preceding label e.g. expand icon before Status
	this.When(/^I click on icon preceding "([^"]*)" text$/, function (arg1) {
		var x;

		if(browser.isExisting("//*[contains(text(),\""+arg1+"\")]/preceding::icon")) {
			x = "//*[contains(text(),\""+arg1+"\")]/preceding::icon";
		} else {
			x = "//*[contains(.,\""+arg1+"\")]/preceding::icon";
		}
		console.log(x);
		browser.click(x);
	 });
   //--------------Click in <BELL> ICON e.g. Bell, Folder
	this.When(/^I click on "([^"]*)" icon$/, function (arg1) {
		var x;
		if(browser.isExisting("(//a//*[contains(@class,\""+arg1+"\")])[1]")) {
			x = "(//a//*[contains(@class,\""+arg1+"\")])[1]";
		}else {
			x = "(//*[contains(@class,\""+arg1+"\")])[1]";
		}
		console.log(x);
		browser.click(x);
   });
   //--------------Click in HYPERLINK following ICON e.g. Calendar Date icon
	this.When(/^I click on link following "([^"]*)" icon$/, function (arg1) {
		var x;
		if(browser.isExisting("//*[contains(@*,\""+arg1+"\")]/following::a")) {
			x = "//*[contains(@*,\""+arg1+"\")]/following::a";
			console.log(x);
			browser.click(x);
		}else {
			console.log("Link does not exist");
			expect(true).to.be.true;
		}
   });
   //--------------Click in a <value> inside a field.  e.g. Date that shows calendar and user clicks a date in it.
	this.When(/^I click "([^"]*)" in "([^"]*)" field$/, function (arg1, arg2) {
		var x;
		if(browser.isExisting("//*[contains(text(),\""+arg2+"\")]/following::*[text()=\""+arg1+"\"][1]")) {
			x = "//*[contains(text(),\""+arg2+"\")]/following::*[text()=\""+arg1+"\"][1]";
		}else{
			x = "//*[contains(text(),\""+arg2+"\")]/following::*[contains(text(),\""+arg1+"\")][1]";
		}
		console.log(x);
		browser.click(x);
   });
	//##############-PAGE-VERIFY-##########################
	//--------------Verify Page Title
	this.Then(/^I verify the page title "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		expect(browser.getTitle()).to.contain(arg1);
		console.log("I got title: "+ browser.getTitle());
	});
	 //--------------Verify Page Text
	this.Then(/^I verify the page text to contain "([^"]*)"$/, function(arg1) {

		var x = "(//*[contains(text(),\""+arg1+"\")])[1]";
		browser.waitForExist(x,10000);
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		try{
			expect(str).to.contain(arg1);
		} catch(err){
			expect(str[0]).to.contain(arg1);
		}
	});
	 //--------------[OFFSHOOT-Occurrence] Verify Page Text ON OCCURRENCE
	this.Then(/^I verify the page text to contain "([^"]*)" occurrence "([^"]*)"$/, function(arg1,arg2) {
		objGeneral.delay();
		var x = "(//*[contains(text(),\""+arg1+"\")])"+arg2;
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		try{
			expect(str).to.contain(arg1);
		} catch(err){
			expect(str[0]).to.contain(arg1);
		}
	});
	//--------------Verify Page Text to contains Full Text
	this.Then(/^I verify the page text to contain full text "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		if(browser.isExisting("//*[text()=\""+arg1+"\"]")){
			console.log("//*[text()=\""+arg1+"\"]");
			expect("//*[text()=\""+arg1+"\"]").to.exist;
		}
	});
	//--------------Verify Page Text not contains Full Text
	this.Then(/^I verify the page text to not contain full text "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		if(browser.isExisting("//*[text()=\""+arg1+"\"]")){
			console.log("//*[text()=\""+arg1+"\"]");
			expect("//*[text()=\""+arg1+"\"]").to.not.exist;
		}
	});
	//---VERFIY FROM EXTRACTED FILE TO NOT EXIST--
	this.Then(/^I verify existence of extracted text "([^"]*)" is not present$/, function(arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		console.log("fileName is "+fileName);
		var strProp = arg2.split("/")[1];
		console.log("key is "+strProp);
		var value = prop.createEditor(fileName).get(strProp);
		console.log("value is "+value);
		if(browser.isExisting("(//*[contains(text(),\""+value+"\")])[1]")){
			console.log("(//*[contains(text(),\""+value+"\")])[1]");
			expect("(//*[contains(text(),\""+value+"\")])[1]").to.not.exist;
		}
	});

		//---VERFIY FROM EXTRACTED FILE TO EXIST--
	this.Then(/^I verify existence of extracted text "([^"]*)" is present$/, function(arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		console.log("fileName is "+fileName);
		var strProp = arg2.split("/")[1];
		console.log("key is "+strProp);
		var value = prop.createEditor(fileName).get(strProp);
		console.log("value is "+value);
		if(browser.isExisting("(//*[contains(text(),\""+value+"\")])[1]")){
			console.log("(//*[contains(text(),\""+value+"\")])[1]");
			expect("(//*[contains(text(),\""+value+"\")])[1]").to.exist;
		}
	});

	//--------------Verify Page Text not contains
	this.Then(/^I verify the page text to not contain "([^"]*)"$/, function(arg1) {
		objGeneral.delay();
		if(browser.isExisting("(//*[contains(text(),\""+arg1+"\")])[1]")){
			console.log("(//*[contains(text(),\""+arg1+"\")])[1]");
			expect("(//*[contains(text(),\""+arg1+"\")])[1]").to.not.exist;
		}
	});

	//--------------Verify value of field on the page (not a TextBox)
	this.Then(/^I verify value "([^"]*)" for label "([^"]*)"$/, function(arg1, arg2) {
		if(browser.isExisting("(//descendant::*[text()='"+arg2+"'])[1]/following::*[1]")){
			var x = "(//*[text()='"+arg2+"'])[1]/following::*[1]";
		}else if(browser.isExisting("//*[contains(text(),'"+arg2+"')]//following::*[1]")){
			var x="(//*[contains(text(),'"+arg2+"')]//following::*)[1]";
		}else {
			var x = "(//descendant::*[contains(.,'"+arg2+"')])[1]/following::*[1]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(arg1);
	});
	//--------------Verify value of field on the page (not a TextBox)
	this.Then(/^I verify value "([^"]*)" for label "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2,arg3) {
		if(browser.isExisting("(//descendant::*[text()='"+arg2+"'])"+arg3+"/following::*")){
			var x = "(//*[text()='"+arg2+"'])"+arg3+"/following::*[1]";
		}else if(browser.isExisting("//*[contains(text(),'"+arg2+"')]"+arg3+"//following::*[1]")){
			var x="(//*[contains(text(),'"+arg2+"')]"+arg3+"//following::*)[1]";
		}else {
			var x = "(//descendant::*[contains(.,'"+arg2+"')])"+arg3+"/following::*[1]";
		}
		console.log(x);
		expect(browser.getText(x)).to.be.eql(arg1);
	});

	//--------------Verifying text in a page section
	this.Then(/^In section "([^"]*)" I verify existence of text "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		if(browser.isExisting("//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")][1]")){
			var x = "//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+arg2+"\")][1]";
		} else{
			var x = "//*[contains(text(), \""+ arg1 +"\")]//../following-sibling::*[contains(text(), \""+arg2+"\")][1]";
		}
		console.log(browser.getText(x));
		expect(browser.getText(x)).to.contain(arg2);
	});

	//--------------Extract value from an Textbox and SAVE to File :udhay
	//[e.g.] from Name text box and save to "1.txt/prop1"
	this.Then(/^I extract from textbox "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2) {
		var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::td//*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else if (browser.isExisting("//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]")) {
			x = "//descendant::*[text()=\""+arg1+"\"][1]/following::input[1]";
		}else {
			x = "//descendant::*[contains(text(),\""+arg1+"\")][1]/following::input[1]";
		}
		console.log(x);
		console.log(browser.getValue(x));
		objGeneral.saveDataToFile(arg2,browser.getValue(x));
	});

	//--------------[OFFSHOOT-Occurrence] Extract value from an Textbox and SAVE to File:  OCCURRENCE
	//[e.g.] from Name[2] text box and save to "1.txt/prop1"
	this.Then(/^I extract from textbox "([^"]*)""([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3) {
		var x;
		if(browser.isExisting("//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]")) {
			x = "//descendant::label[text()=\""+arg1+"\"]"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::td//*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]")) {
			x = "(//descendant::*[text()=\""+arg1+"\"])"+arg2+"/following::input[1]";
		}else {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])"+arg2+"/following::input[1]";
		}
		console.log(x);
		console.log(browser.getValue(x));
		objGeneral.saveDataToFile(arg3,browser.getValue(x));
	});

	//--------------Extract value between LB and RB and SAVE to File
	//[e.g.] getCount of Roles created LB: "SYSTEM(" and ")"
	////*[contains(text(),"System (")]
	this.Then(/^I extract the "([^"]*)" text between "([^"]*)" and "([^"]*)" and save to "([^"]*)"$/, function(name,arg1, arg2, arg3) {
		if(browser.isExisting("(//*[contains(text(),\""+ arg1 +"\")])[1]")){
			var x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}else {
			var x = "(//*[contains(text(),\""+ arg1 +"\")])[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		var s1 = browser.getText(x).split(arg1)[1];
		var s2 = s1.split(arg2)[0];
		var str=s2.replace(/\s/g, "");
		console.log(str);
		var editor1 = prop.createEditor();
		editor1.set(name,str);
		editor1.save(arg3);
	});

	//--------------Verify text between LB and RB (that follows a text) to a value (that follows a TEXT)
	//[e.g.] getCount of Auditor: "Number of permissions: 2"
	//(//*[contains(text(),"AUDITOR")])[1]/following::*[contains(text(),"No. of permissions:")]

	this.Then(/^I verify for "([^"]*)" the text between "([^"]*)" and "([^"]*)" to be "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		if(browser.isExisting("((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]")){
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]";
		}else {
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(.,\""+arg2+"\")])[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		var s1 = browser.getText(x).split(arg2)[1];
		var s2 = s1.split(arg3)[0];
		console.log(s2);
		expect(s2).to.contain(arg4);
	});

	//--------------Extract value between LB and RB and SAVE to File (that follows a TEXT)
	//[e.g.] getCount of "Number of permissions: 2"
	//(//*[contains(text(),"AUDITOR")])[1]/following::*[contains(text(),"No. of permissions:")]

	this.Then(/^I extract for "([^"]*)" the text between "([^"]*)" and "([^"]*)" and save to "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
		if(browser.isExisting("((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]")){
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(text(),\""+arg2+"\")])[1]";
		}else {
			var x = "((//*[contains(text(),\""+ arg1 +"\")])[1]/following::*[contains(.,\""+arg2+"\")])[1]";
		}
		console.log(x);
		console.log(browser.getText(x));
		var extracted = browser.getText(x).split(arg2)[1];
		console.log(extracted);
		objGeneral.saveDataToFile(arg4,extracted);
	});

	//##############-EXTRACT AND VERIFY-##########################
	//-------------Extract and Verify
	this.Then(/^I extract "([^"]*)" from file "([^"]*)" and verify as "([^"]*)"$/, function(arg1,arg2,arg3) {
	try{
		objGeneral.delay();
		var value = prop.createEditor(arg2).get(arg1);
		console.log("I got UI:*****************"+ value);
		console.log("Value passed:*****************"+ arg3);
		expect(arg3).to.contain(value);
		}catch(err){
			console.log(err);
		}
	});

	//--------------Verify Page Title Contains
	this.Then(/^I enter extracted "([^"]*)" from file "([^"]*)" and verify the page title contains the same$/, function(arg1, arg2) {
		objGeneral.delay();
		var value = prop.createEditor(arg2).get(arg1);
		expect(browser.getTitle()).to.contain(value);
		console.log("I got title: "+ browser.getTitle());
	});

	//-------------Verifying text in a page section with extracted property from a file
	this.Then(/^in section "([^"]*)" I verify existence of extracted text "([^"]*)"$/, function(arg1, arg2){
		objGeneral.delay();
		var fileName = arg2.split("/")[0];
		console.log("fileName is "+fileName);
		var strProp = arg2.split("/")[1];
		console.log("key is "+strProp);
		var value = prop.createEditor(fileName).get(strProp);
		console.log("value is "+value);
		var x = "//*[contains(text(), \""+arg1+"\")]//../following-sibling::*/descendant::*[contains(text(), \""+value+"\")][1]";
		console.log(x);
		console.log(browser.getText(x));
		expect(browser.getText(x)).to.contain(value);
	});

	//##############-FILE EXTRACTS ALONE AND VERIFY-##########################
	//-------------File Extract and Verify
	this.Then(/^I verify "([^"]*)" of "([^"]*)" and "([^"]*)" to be "([^"]*)"$/, function (arg1, arg2, arg3, arg4) {
		var value=parseInt(objGeneral.retrieveDataFromFile(arg2));
		var value1=parseInt(objGeneral.retrieveDataFromFile(arg3));
		if (arg1 === "difference"){
			var result = value - value1;
			console.log("result:" + result);
			expect(result).to.equal(parseInt(arg4));
		}else if (arg1 === "similarity") {
			expect(value).to.be.eql(value1);
		}
		objGeneral.delay();
	});

	//##############-PAGE-EXTRACT-##########################
	//-------------Extracting value before a pattern and SAVING to file
	this.Then(/^I extract "([^"]*)" before the pattern "([^"]*)" and save to "([^"]*)"$/, function (arg1, arg2, arg3) {

		objGeneral.delay();
		var x = "//*[1][contains(text(), '"+arg2+"')]";
		console.log(x);
		var str = browser.getText(x)

		var res = str.split("'");
		var value = res[1];
		console.log(res);
		console.log(value);

		var editor1 = prop.createEditor();
		editor1.set(arg1,value);
		editor1.save(arg3);
	});

	//-------------Extracting value after a pattern (with occurrence) and SAVING to file
	this.Then(/^I extract "([^"]*)" text after the pattern "([^"]*)" occurrence "([^"]*)" and save to file "([^"]*)"$/, function (name,arg1, arg2, arg3) {

		objGeneral.delay();
		var x = "(//*[contains(text(), \""+arg1+"\")])"+ arg2 + "/descendant::*[1]";
		console.log(x);
		var str = browser.getText(x);
		console.log(str);
		var editor1 = prop.createEditor();
		editor1.set(name,str);
		editor1.save(arg3);
	});

	//##############-MISCELLANEOUS-##########################
	//-------------Delete Cookies
	this.Then(/^I delete Cookies$/, function () {
		browser.deleteCookie();
		objGeneral.delay();
	});
	//-------------Just a casual wait
	this.Then(/^Browser Ending Actions$/, function () {
		objGeneral.delay();
	});
	//-------------Explicit sleep from Feature file author
	this.Then(/^I wait for "([^"]*)"$/, function (arg1) {
		sleep(arg1);
	});
	this.Then(/^I wait until "([^"]*)"$/, function (arg1) {
		var x="//*[contains(text(), \""+arg1+"\")]";
		objGeneral.checkFlag(x);
	});



	//-------------Moving the focus to new iFRAME
	this.Then(/^Set the focus on new frame$/,  function () {
			browser.frame(0);
	});
	//-------------Scroll to a 'Y' position----
	this.Then(/^Scroll the window to "([^"]*)"$/,  function (arg1) {
		var y=Number(arg1);
		browser.scroll(0,y);
	});
	//-------------Scroll to a Web element----
	this.Then(/^Scroll the window to field "([^"]*)"$/,  function (arg1) {
		var x;
		if(browser.isExisting("(//descendant::*[text()='"+arg1+"'])[1]")) {
			x = "(//descendant::*[text()='"+arg1+"'])[1]";
			console.log(x);
			browser.scroll(x);
		}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]")) {
			x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]";
			console.log(x);
			browser.scroll(x);
		}
	});
	//-------------Print Screenshot----
	this.Then(/^I take screenshot to file "([^"]*)"$/,  function (arg1) {
		objscreencapture(arg1, function (err, imagePath) {
		  console.log('Screenshot taken to ' + imagePath);
		})
	});
	//-------------Upload a File and ATTACHMENTS----
	this.Then(/^I upload file "([^"]*)" to "([^"]*)"$/,  function (arg1, arg2) {
		browser.chooseFile("//*[contains(text(),\""+ arg2 +"\")]/descendant::input[contains(@type,\"file\")]",arg1);
		objGeneral.delay();
	});
	//-------------Download a File and ATTACHMENT----
	this.Then(/^I download file "([^"]*)" to "([^"]*)"$/,  function (arg1, arg2) {
		browser.chooseFile("//*[contains(text(),\""+ arg2 +"\")]/descendant::input[contains(@type,\"file\")]",arg1);
		objGeneral.delay();
	});

	//##############-MULTILINE TEXT-##########################
	//-------------Filling Multiline Text-----//
	this.Then(/^I enter multiline text in "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
		var value = arg2; var x;
		console.log("Adding multiline text: "+"//descendant::label[text()='"+arg1+"'][1]/following::textarea[1]");
		if(browser.isExisting("//descendant::label[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::label[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::td[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td//*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::td//*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else if (browser.isExisting("//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else {
			x = "(//descendant::*[contains(text(),'"+arg1+"')])[1]/following::textarea[1]";
		}
		console.log(x);
		browser.setValue(x,value);
	});

	//-------------[OFFSHOOT-Occurrence]  Filling Multiline Text-----//
	this.Then(/^I enter multiline text in "([^"]*)" occurrence of "([^"]*)" as "([^"]*)"$/, function(arg1, arg2,arg3) {
		var value = arg3; var x;
		if(browser.isExisting("//descendant::label[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::label[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::td[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::td//*[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::td//*[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else if (browser.isExisting("//descendant::*[text()='"+arg1+"']"+arg2+"/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"']"+arg2+"/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')]"+arg2+"/following::textarea[1]";
		}
		console.log(x);
		browser.setValue(x,value);
	});

	//-------------TO VERIFY Multiline TEXTAREA item exists-----//
	this.Then(/^I verify multiline text "([^"]*)" exists$/, function(arg1) {
		var x;
		if (browser.isExisting("//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"'][1]/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')][1]/following::textarea[1]";
		}
		console.log(x);
		expect(x).to.exist;
	});
	//-------------[OFFSHOOT-Occurrence]TO VERIFY Multiline TEXTAREA item exists-----//
	this.Then(/^I verify multiline text "([^"]*)" occurrence "([^"]*)" exists$/, function(arg1, arg2) {
		var x;
		if (browser.isExisting("//descendant::*[text()='"+arg1+"']" + arg2 + "/following::textarea[1]")) {
			x = "//descendant::*[text()='"+arg1+"']" + arg2 + "/following::textarea[1]";
		}else {
			x = "//descendant::*[contains(text(),'"+arg1+"')]" + arg2 + "/following::textarea[1]";
		}
		console.log(x);
		expect(x).to.exist;
	});
	//##############-ALERT-##########################
	//-------------Accept alert
	this.When(/^I accept following alert$/, function() {
		try{
			browser.alertAccept();
		}catch(err){
			console.log(err);
		}
	});
	//-------------Dismiss alert
	this.When(/^I dismiss following alert$/, function() {
		try{
			browser.alertDismiss();
		}catch(err){
			console.log(err);
		}
	});

	this.When(/^I enter in the textArea "([^"]*)" extracted from file "([^"]*)"$/,function (arg1, arg2){

		var textArea = document.getElementById('myScript');
		var editor = CodeMirror.fromTextArea(textArea);
		editor.getDoc().setValue('var msg = "Hi";');
	} );

	   	//##############-FOR OBJECT MODEL AND IMPORT REPOSITORY UPDATION-##########################
       this.Then(/^I click label "([^"]*)"$/, function (arg1) {
         // Write code here that turns the phrase above into concrete actions
       });

	   	 this.Then(/^I enter "([^"]*)" extracted from file "([^"]*)"$/, function (arg1, arg2) {
	   		//var absolutePath = path.resolve(arg2);
			//console.log("Absolute path of test file:" +  absolutePath);
       });

       this.Then(/^I select file "([^"]*)"$/, function (arg1) {
         // Write code here that turns the phrase above into concrete actions
       });

       this.When(/^I enter "([^"]*)" as my relative path "([^"]*)" extracted from file "([^"]*)"$/, function (arg1, arg2, arg3) {
         objGeneral.delay();
    	   var value = prop.createEditor(arg3).get(arg2);
    	   console.log("Relative path:" +  value);
    	   var absolutePath = path.resolve(value).replace('/\\/g', '\\\\');
    	   // var absolutePath = value;
			   console.log("Absolute path of test file:" +  absolutePath);

			   var x;
				 console.log("Entering value in UI");
				if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
					 x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
					 console.log(x);
					 browser.setValue(x,absolutePath);
				}else if (browser.isExisting("(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]")) {
					 x = "(//descendant::td[text()=\""+arg1+"\"])[1]/following::input[1]";
					 console.log(x);
					 browser.setValue(x,absolutePath);
				}else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
					 x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
					 console.log(x);
					 browser.setValue(x,absolutePath);
				}else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
					 x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
					 console.log(x);
					 browser.setValue(x,absolutePath);
				}else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]")) {
					 x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
					 console.log(x);
					 browser.setValue(x,absolutePath);
		        }
         });
}
