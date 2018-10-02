
module.exports = function() {
   this.Then(/^I toggle "([^"]*)" the button after label "([^"]*)"$/, function(arg1, arg2) {
		try{
			var x = "//*[contains(text(),'"+arg2+"')]/following::input[1]";
			
			var tex = JSON.stringify(browser.execute("return document.getElementsByTagName('input')['" + browser.getAttribute(x, 'id') + "'].checked"));
							
			if(arg1 == 'ON'){
				if(tex.includes("false")) browser.click(x);
				console.log("Dormant Code0");
			}
			else if(arg1 == 'OFF'){
				if(tex.includes("true")) browser.click(x);
				console.log("Dormant Code1");
			}				
		}catch(err){
			console.log("Alternative Path taken");
			var x1 = "//*[contains(text(),'"+arg2+"')]/following::input[1]/following::label[1]";
			if(arg1 == 'ON'){
				if(tex.includes("false")) browser.click(x1);
			}
			else if(arg1 == 'OFF'){
				if(tex.includes("true")) browser.click(x1);
			}
		}
	});
	// ------------Click button that follows after the label (e.g. MAKE PRIMARY)
	this.Then(/^I click the button "([^"]*)" that follows after the label "([^"]*)"$/, function(arg1, arg2) {
		try{
			var x = "//*[contains(text(),'"+arg2+"')]//following::input[contains(@value,'"+arg1+"')]";
			browser.click(x);
		} catch(err){
			try{
				var x = "//*[contains(.,'"+arg2+"')]//following::input[contains(@value,'"+arg1+"')]";
				console.log(err);
			} catch(err) {
				console.log("Already Selected");
			}
		}
	});
}
