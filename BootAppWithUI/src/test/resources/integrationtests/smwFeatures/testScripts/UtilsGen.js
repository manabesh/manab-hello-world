const expect = require('chai').expect;
var prop = require("../../node_modules/properties-parser/index.js");
var sleep = require('system-sleep');
var objGeneral = require('./UtilsGen.js');

//--------------To Save Data to File
module.exports.saveDataToFile = function (arg1, arg2) {
	console.log('in Utils Gen');
	var fileName = arg1;
	if(arg1.split("/").length == 2){	
		fileName = arg1.split("/")[0];
		var strProp = arg1.split("/")[1];
	} else strProp = arg1;

	var editor;
	if (require("fs").existsSync(fileName))
		editor = prop.createEditor(fileName);
	else
		editor = prop.createEditor();
	editor.set(strProp,arg2);
	editor.save(fileName);
};
module.exports.checkFlag = 	function (arg1) {
		var result =arg1;
		if(!browser.isExisting(result)) {
			sleep(1000);
			objGeneral.checkFlag(result);
		} else {
		
		}
};
module.exports.timestamp = 	function (arg1) {
var unix = Math.round(+new Date()/1000);
console.log(unix);
return unix;
};
//--------------To Retrieve Data to File
module.exports.retrieveDataFromFile = function (arg1) {
		try{
			var fileName = arg1.split("/")[0];
			var strProp = arg1.split("/")[1];
			console.log("fielName / key is "+fileName+" / "+strProp);
			var value = prop.createEditor(fileName).get(strProp);
			console.log("value is "+value);
			return value;
		}catch(err){
			throw err;
		}
};

//--------------To Retrieve Table Indices (given column and row identifier) e.g. Status, AppNo = 1234
module.exports.retrieveTableIndices = function (arg1, arg2, arg3) {
	try{
		 var columnXpath = "(//table//*[contains(text(),'"+arg1+"')])[1]/ancestor-or-self::th/preceding-sibling::th";
		 var columnIndex = Object.keys(browser.elements(columnXpath).value).length +1;
		 console.log(columnIndex+"<=="+columnXpath);
		 
		 var rowXpath = "(//table//*[contains(text(),'"+arg2+"')])[1]/ancestor-or-self::th/preceding-sibling::th" ;
		 var rowIndex = Object.keys(browser.elements(rowXpath).value).length+1;
		 console.log(rowIndex+"<=="+rowXpath);
		 
		 var rowElementValue = "(//th["+rowIndex+"]/following::tr[contains(.,'"+arg3+"')])[1]//td["+columnIndex+"]/ancestor-or-self::tr/preceding-sibling::tr";
		 var x = Object.keys(browser.elements(rowElementValue).value).length+1;
		 console.log(x+"<=="+rowElementValue);
		 
		 var matrix = [];
		 matrix.push([x,columnIndex]);
		 console.log("MATRIX ************"+matrix);
		 return matrix ; 
	}
	catch(err){
		console.log(err);
	}
};

//--------------Identify table with column name and Retrieve Table Indices (given column and row identifier) e.g. Status, AppNo = 1234
module.exports.retrieveTableIndicesWHColName = function (arg4,arg1, arg2, arg3) {
	try{		 
		 var columnXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg1+"\")]/ancestor-or-self::th/preceding-sibling::th";	 
		 console.log("columnXpath"+columnXpath);
		 var columnIndex = Object.keys(browser.elements(columnXpath).value).length +1;
		 var rowXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg2+"\")]/ancestor-or-self::th/preceding-sibling::th";
		 console.log("rowXpath"+rowXpath);
		 var rowIndex = Object.keys(browser.elements(rowXpath).value).length+1;
		 var rowElementValue = "(//*[text()=\""+arg4+"\"]/ancestor::table)//th["+rowIndex+"]/following::tr[contains(.,'"+arg3+"')][1]//td["+columnIndex+"]/ancestor-or-self::tr/preceding-sibling::tr"; 
		 console.log("rowElementValue :"+rowElementValue);
		 var x = Object.keys(browser.elements(rowElementValue).value).length;
		 var matrix = [];
		 matrix.push([x,columnIndex]);
		 console.log("MATRIX ************"+matrix);
		 return matrix ; 
	}
	catch(err){
		console.log(err);
	}
};


//---------------To Operate on the checkbox
module.exports.OperateCheckbox = function (x, action) {	
	if(action=='check'){
		console.log("To Check");
		if(!browser.isSelected(x)) browser.click(x);
	}
	else if (action=='uncheck'){
		console.log("To Uncheck");
		if(browser.isSelected(x)) browser.click(x);
	}
	else if(action == 'verify check'){
		console.log("Verify Check");
		if (browser.isSelected(x))
			expect(true).to.be.true;
		else if (!browser.isSelected(x))
			expect(true).to.be.false;
	}
	else if (action == 'verify uncheck'){
		console.log("Verify Uncheck");
		if (browser.isSelected(x))
			expect(true).to.be.false;
		else if (!browser.isSelected(x))
			expect(true).to.be.true;		
	}
	else{
		console.log("The invalid action provided, Please provide below valid actions");
		expect(false).to.be.false;
	}
};

module.exports.delay = function (){
		sleep(10);
};
module.exports.bigdelay = function (){
		sleep(5*1000);
};
