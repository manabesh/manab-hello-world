const expect = require('chai').expect;
var objGeneral_dm = require('./UtilsGen_DM.js');
var objGeneral = require('./UtilsGen.js');
var sleep = require('system-sleep');
var fs = require('fs');
var prop = require("../../node_modules/properties-parser/index.js");

module.exports = function() {
    
 //##############-TEXT FIELD-##########################
 //--------------Filling Field(adding)
this.Then(/^I append text "([^"]*)" as "([^"]*)"$/, function(arg1, arg2) {
    var value = arg2; var x;
    if(browser.isExisting("(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]")) {
        x = "(//descendant::label[text()=\""+arg1+"\"])[1]/following::input[1]";
        console.log(x);
        browser.addValue(x,value);
    }else if (browser.isExisting("(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
        x = "(//descendant::*[text()=\""+arg1+"\"])[1]/following::input[1]";
        console.log(x);
        browser.addValue(x,value);
    }else if (browser.isExisting("(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]")) {
        x = "(//descendant::td//*[text()=\""+arg1+"\"])[1]/following::input[1]";
        console.log(x);
        browser.addValue(x,value);
    }else if (browser.isExisting("(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]")) {
        x = "(//descendant::*[contains(text(),\""+arg1+"\")])[1]/following::input[1]";
        console.log(x);
        browser.addValue(x,value);
    }
});
    
//--------------Verify Image Button as Disabled -------------
this.Then(/^I verify image button "([^"]*)" as disabled$/, function(arg1) {            
    var x = "(//*[@title=\""+arg1+"\"])[1]//img[contains(@src,\"disabled\")]";
	console.log(x);
	browser.waitForExist(x, 10000);
	console.log('Element exists');
    expect(browser.isExisting(x)).be.true;
});
    //--------------[OFFSHOOT] Verify Image Button as Enabled -------------        
    this.Then(/^I verify image button "([^"]*)" as enabled$/, function(arg1) {                        
        var x = "(//*[@title=\""+arg1+"\"])[1]//img[contains(@src,\"disabled\")]";
		console.log(x);
        expect(browser.isExisting(x)).be.false;
    });

//--------------DM Table Clicking based on Column Number-------------
this.Then(/^In DM Table with column name "([^"]*)" I click on column number "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
    objGeneral.bigdelay();
    try{
         var indices = objGeneral_dm.retrieveTableIndicesWHColName_dm(arg1,"DUMMY",arg3,arg4);
         var x = "((//*[text()=\""+arg1+"\"]/ancestor::table))[2]//tr["+indices[0][0]+"]//td["+arg2+"]";
         console.log(x);
         console.log(browser.getText(x));
         browser.click(x);
    }catch(err){
        console.log(err);
    }
});

//--------------Verify Page Text and Asserting it to FALSE [Specific To DM]-------------
this.Then(/^I verify the page text to contain "([^"]*)" as false$/, function(arg1) {
    objGeneral.delay();
    var x = "(//*[contains(text(),\""+arg1+"\")])[1]";
    console.log(x);
    expect(browser.isExisting(x)).be.false;
});

//--------------CHECKBOX: Taking action on multiple checkbox with same label
this.When(/^I "([^"]*)" the checkbox present "([^"]*)" the "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2, arg3, arg4) {
    var x; var action = arg1;
    if(arg2 == 'after'){            
            x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/following::*[@type = 'checkbox']"+arg4;
        console.log(x);
        objGeneral.OperateCheckbox(x, action); 
    }else if(arg2 == 'before'){                
           x = "(//descendant::*[contains(text(),\""+arg3+"\")])[1]/preceding::*[@type = 'checkbox']"+arg4;
           console.log(x);
        objGeneral.OperateCheckbox(x, action);
    }
}); 
}
    