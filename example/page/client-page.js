/* This page has all the object specific to a page for application on which you want to perform action . 
It will contain the unique locator of object via xpath,css etc

*/
var webdriver = require('selenium-webdriver');


var ClientPage = function (driver) {

    this.driver = driver;
    this.ClientHeader = webdriver.By.css('h1.h1');
};

module.exports = ClientPage; 