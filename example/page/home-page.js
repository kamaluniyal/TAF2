/* This page has all the object specific to a page for application on which you want to perform action . 
It will contain the unique locator of object via xpath,css etc

*/
var webdriver = require('selenium-webdriver');


var HomePage = function (driver) {

    this.driver = driver;
    this.AdhesionLink = webdriver.By.linkText('Adhesion');
    this.BabsonCapitalLink = webdriver.By.linkText('Babson Capital');
    this.CapitalGroupLink = webdriver.By.linkText('Capital Group');
    this.NASDAQLink = webdriver.By.linkText('NASDAQ');
    this.SchwabLink = webdriver.By.linkText('Schwab');
};



module.exports = HomePage; 