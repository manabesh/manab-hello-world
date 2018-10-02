const expect = require('chai').expect;
var prop = require("../../node_modules/properties-parser/index.js");
var sleep = require('system-sleep');

//--------------Identify table with column name and Retrieve Table Indices (given column and row identifier) e.g. Status, AppNo = 1234
module.exports.retrieveTableIndicesWHColName_dm = function (arg4,arg1, arg2, arg3) {
	try{		 
		 var columnXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg1+"\")]/ancestor-or-self::th/preceding-sibling::th";	 
		 console.log("columnXpath"+columnXpath);
		 var columnIndex = Object.keys(browser.elements(columnXpath).value).length +1;
		 
		 var rowXpath = "(//*[text()=\""+arg4+"\"]/ancestor::table)//*[contains(text(),\""+arg2+"\")]/ancestor-or-self::th/preceding-sibling::th";
		 console.log("rowXpath"+rowXpath);
		 var rowIndex = Object.keys(browser.elements(rowXpath).value).length+1;
		 console.log("rowIndex :"+rowIndex);
		 
		 var rowElementValue = "(//*[text()=\""+arg4+"\"]/ancestor::table)//th["+rowIndex+"]/following::tr[contains(.,'"+arg3+"')][1]//td["+columnIndex+"]/preceding::tr"; 
		 console.log("rowElementValue :"+rowElementValue);
		 var x = Object.keys(browser.elements(rowElementValue).value).length-1; //--DM Specific (putting -1 since multiple rows are embedded in table
		 console.log("x :"+x);
		 
		 var matrix = [];
		 matrix.push([x,columnIndex]);
		 console.log("MATRIX ************"+matrix);
		 return matrix ; 
	}
	catch(err){
		console.log(err);
	}
};