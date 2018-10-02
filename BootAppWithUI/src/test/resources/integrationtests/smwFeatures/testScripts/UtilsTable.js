const expect = require('chai').expect;
var objGeneral = require('./UtilsGen.js');
var sleep = require('system-sleep');
var fs = require('fs');
var prop = require("../../node_modules/properties-parser/index.js");

module.exports = function() {
	
	//##################---------TABLE JUST ONE ON THE PAGE--------------########
	//-------------[TBL-CLK]Clicking on the cell of a table (it could be a link or any) for a given column of row=value
	this.Then(/^I click on table column "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg1, arg2, arg3){
		 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
		 var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]" ;
		 browser.click(x);
	});
	//-------------[TBL-CLK]Clicking on table cell "column number" of "row:col=value"
	this.Then(/^I click on table column number "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg1, arg2, arg3){
		 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
		 var x = "//tr["+indices[0][0]+"]//td" + arg1;
		 console.log(x);
		 browser.click(x);
	});
	//-------------[TBL-EXTR-FILE]Extracting from the cell of a table and save to file USING COL NAME
	this.Then(/^I retrieve "([^"]*)" of "([^"]*)" = "([^"]*)" and save to file "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
			 var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]" ;
			 console.log(arg4) ;
			 console.log(browser.getText(x));
			 objGeneral.saveDataToFile(arg4,browser.getText(x));
		}catch(err){
				console.log(err);
		}
	});
	//-------------[TBL-CLK-FROM-FILE]Clicking on the cell of a table extracted from properties file against a key
	this.Then(/^In Table I click on "([^"]*)" extracted "([^"]*)" from file "([^"]*)"$/, function(arg1, arg2, arg3){
		objGeneral.bigdelay();
	try{
		 var value = prop.createEditor(arg3).get(arg2);
		 var indices = objGeneral.retrieveTableIndices(arg2,arg1,value);
		 var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]";
		 browser.click(x);
	}catch(err){
		console.log(err);
	}
	});
	//-------------[TBL-CLK-IMG]Clicking Table Cell (Which is an image strictly (for instance, 'DELETE' and 'EDIT') for a given column of row=value)
	this.Then(/^I click on table image column "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg1, arg2, arg3){
		 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
		 var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]//img";
		 console.log(x);
		 browser.click(x);
	});
		//-------------[TBL-CLK-IMG][OFFSHOOT-OCCUR]Clicking Table Cell nth Occurrence (Which is an image strictly (for instance, 'DELETE' and 'EDIT') for a given column of row=value)
		this.Then(/^I click on table image column "([^"]*)" of "([^"]*)" = "([^"]*)" occurrence "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
			 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
			 var x = "(//tr["+indices[0][0]+"]//td["+indices[0][1]+"]//img)"+arg4 ;
			 console.log(x);
			 browser.click(x);
		});	

	//##################---------TABLE WITH COL NAME [MULTI TABLE ON PAGE]--------------############
	//-------------[TBL-wCOLNAM-CLK] Table Cell Click (using Column cue)
	this.Then(/^In Table with column name "([^"]*)" I click "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			var indices = objGeneral.retrieveTableIndicesWHColName(arg1, arg2, arg3, arg4)
			console.log("indices :"+indices);
			var x = "((//*[text()=\""+arg1+"\"]/ancestor::table))//tr[" + indices[0][0] +"]//td["+indices[0][1]+"]" ;
			console.log(x);
			browser.click(x);
		}catch(err){
			console.log(err);
		}
	});
	
	//-------------[TBL-wCOLNAM-RTRVE-FILE] --Table Extracting (Column cue) from the cell of a table and save to file
	this.Then(/^In Table with column name "([^"]*)" I retrieve "([^"]*)" of "([^"]*)" = "([^"]*)" and save to file "([^"]*)"$/, function(arg5, arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			console.log("In method");
			var indices = objGeneral.retrieveTableIndicesWHColName(arg5,arg1,arg2,arg3)
			console.log("indices :"+indices);
			var x = "((//*[text()=\""+arg5+"\"]/ancestor::table))//tr["+indices[0][0]+"]//td["+indices[0][1]+"]" ;
			console.log(x);
			console.log(browser.getText(x));
			console.log(arg4) ;
			objGeneral.saveDataToFile(arg4,browser.getText(x));
		}catch(err){
			console.log(err);
		}
	});
	
	//##################---------TABLE WITH COL NAME AND COL NUMBER [MULTI TABLE ON PAGE AND NO COL HEADER]--------------############
	//-------------[TBL-wCOLNAM-COLNO-CLK] Table Cell Click (using Column cue)
	this.Then(/^In Table with column name "([^"]*)" I click on column number "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg4,arg1, arg2, arg3){
		objGeneral.bigdelay();
	try{
		 var indices = objGeneral.retrieveTableIndicesWHColName(arg4,"DUMMY",arg2,arg3);
		 var x = "((//*[text()=\""+arg4+"\"]/ancestor::table))//tr["+indices[0][0]+"]//td["+arg1+"]";
		 console.log(x);
		 console.log(browser.getText(x));
		 browser.click(x);
	}catch(err){
		console.log(err);
	}
	});
	//-------------[TBL-wCOLNAM-COLNO-CLK-CKB] Table Cell Click CKB (using Column cue)
	this.Then(/^In Table with column name "([^"]*)" I "([^"]*)" the checkbox in column number "([^"]*)" of "([^"]*)" = "([^"]*)"$/, function(arg5,arg1, arg2, arg3, arg4){
		objGeneral.bigdelay();
	try{
		 console.log("LOGGING");
		 var indices = objGeneral.retrieveTableIndicesWHColName(arg5,"DUMMY",arg3,arg4);
		 var x = "(//*[text()=\""+arg5+"\"]/ancestor::table)//tr["+indices[0][0]+"]//td["+arg2+"]";
		 console.log(x);
		 var y = "(//*[text()=\""+arg5+"\"]/ancestor::table)//tr["+indices[0][0]+"]//td["+arg2+"]//*[@type = \"checkbox\"][1]";
		 console.log(y);
		 objGeneral.OperateCheckbox(y,arg1);			  
	}catch(err){
		console.log(err);
	}
	});	
	//-------------[TBL-COLNO-RTRVE-FILE] Table Cell Retrieve to a File (using Column Number)
	//Extracting from the cell of a table and save to file USING COL NUMBER
	this.Then(/^I retrieve column number "([^"]*)" of "([^"]*)" = "([^"]*)" and save to file "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
	objGeneral.delay();
	try{
		 var indices = objGeneral.retrieveTableIndices("DUMMY",arg2,arg3);
		 var x = "//tr["+indices[0][0]+"]//td[" + arg1 + "]";
		 console.log(x);
		 console.log(browser.getText(x));
		 objGeneral.saveDataToFile(arg4,browser.getText(x));
	}catch(err){
		console.log(err);
	}
	});

	//Setting value into a cell of a table USING COL NUMBER and ROW NUMBER
	this.Then(/^In Table with column name "([^"]*)" I enter "([^"]*)" in row number "([^"]*)" and column number "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
	objGeneral.delay();
	try{
		 var x = "(//*[text()=\""+arg1+"\"]/ancestor::table)//tr["+arg3+"]//td["+arg4+"]/input";
		 console.log(x);
		 browser.setValue(x,arg2);
		 objGeneral.delay(); 
	}catch(err){
		console.log(err);
	}
	});
	
	//##########################TABLE FUNCTIONS WITH COL AND ROW NUMBER (ENTER, SELECT, CHECKBOX, CLICK)
	//Selecting dropdown value into a cell of a table USING COL NUMBER and ROW NUMBER
	this.Then(/^In Table with column name "([^"]*)" I select "([^"]*)" in row number "([^"]*)" and column number "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			 var x = "(//*[text()=\""+arg1+"\"]/ancestor::table)//tr["+arg3+"]//td["+arg4+"]//select[1]";
			 console.log(x);
			 browser.selectByVisibleText(x,arg2);
			 objGeneral.delay();
		}catch(err){
			console.log(err);
		}
	});
	//Check / UnCheck / Verify Check / Verify Uncheck from Table(ColName) USING COL NUMBER and ROW NUMBER
	this.Then(/^In Table with column name "([^"]*)" I "([^"]*)" the checkbox in row number "([^"]*)" and column number "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			 var x = "(//*[text()=\""+arg1+"\"]/ancestor::table)//tr["+arg3+"]//td["+arg4+"]//*[@type = \"checkbox\"][1]";
			 console.log(x);
			 objGeneral.OperateCheckbox(x,arg2);
			 objGeneral.delay();
		}catch(err){
			console.log(err);
		}
	});
	//RETRIEVE Text from Table(ColName) USING COL NUMBER and ROW NUMBER
	this.Then(/^In Table with column name "([^"]*)" I retrieve from row number "([^"]*)" and column number "([^"]*)" and save to file "([^"]*)"$/, function(arg1, arg2, arg3,arg4){
		objGeneral.delay();
		try{
			 var x = "(//*[contains(text(),\""+arg1+"\")]/ancestor::table)//tr["+arg2+"]//td["+arg3+"]";
			 console.log(x);
			 console.log(browser.getText(x));
			 objGeneral.saveDataToFile(arg4,browser.getText(x));
			 objGeneral.delay();
		}catch(err){
			console.log(err);
		}
	});

	//-------------Verify ICON EXISTS on TABLE e.g. BELL icon in ACM
	this.Then(/^I verify "([^"]*)" of "([^"]*)" = "([^"]*)" icon "([^"]*)" exists$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		try{
			 var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
			 var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]//*[contains(@*,\""+arg4+"\")]" ;
			 console.log(x);
			 expect(browser.isExisting(x)).be.true;
		}catch(err){
				console.log(err);
		}
	});
	
	//-------------Verify TEXT EXISTS on TABLE e.g. P3 (text) in col <col> for <row>=<value>
	this.Then(/^I verify "([^"]*)" of "([^"]*)" = "([^"]*)" contains text "([^"]*)"$/, function(arg1, arg2, arg3, arg4){
		objGeneral.delay();
		var indices = objGeneral.retrieveTableIndices(arg1,arg2,arg3);
		var x = "//tr["+indices[0][0]+"]//td["+indices[0][1]+"]";
		console.log(x);
		console.log("****browser.getText(x)***"+browser.getText(x));
		expect(browser.getText(x)).to.contain(arg4);
	});
	
	//##################---------TABLE RETRIEVE WHOLE VALUES OF HTML TABLE TO A CSV--------------############
	this.Then(/^I retrieve values of the table and save to CSV file "([^"]*)"$/,{timeout: 300 * 1000},function(arg1){
		try{
			var rowXpath="//table//following::tr";
			var rowCount=Object.keys(browser.elements(rowXpath).value).length;
			var colXpath="//table//tr[1]/td";
			var colCount=Object.keys(browser.elements(colXpath).value).length;
			console.log("****rowCount" + rowCount + "****colCount"+colCount);
			for(var k=1;k<=colCount;k++){
				var getHeaderValue="//table//th["+k+"]";
				fs.appendFileSync(""+arg1+"",""+browser.getText(getHeaderValue)+",");
			}
			fs.appendFileSync(""+arg1+"","\n");
			for (var i=1;i<=rowCount;i++){
				for (var j=1;j<=colCount;j++){
					var x ="//table//tr["+i+"]/td["+j+"]";
					//console.log("***XPath*"+x);
					fs.appendFileSync(""+arg1+"",""+browser.getText(x)+",");
					//console.log("***browser.getText"+browser.getText(getvalue));
				}
				fs.appendFileSync(""+arg1+"","\n");
			}
		} catch(err){
			throw err;
		}
	});
}