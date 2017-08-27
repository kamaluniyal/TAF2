/* This page has all the object specific to a page for application on which you want to perform action . 
It will contain the unique locator of object via xpath,css etc

*/
var webdriver = require('selenium-webdriver');

var HomePage = function (driver) {
    this.driver = driver;
    this.textBox = webdriver.By.id('usr');
    this.selectlist = webdriver.By.id('select');
    this.checkboxETFs = webdriver.By.id('option1');
    this.checkboxMutualFunds = webdriver.By.id('option2');
    this.radiobuttonOptions = webdriver.By.xpath("(.//*[@id='option3'])[2]");
    this.hiddenText = webdriver.By.id('after-sometime');
    this.hoverElement=webdriver.By.id('hoverMe');  
    this.hoverElement=webdriver.By.id('scrollable-div');    
    this.linktoNewWindow=webdriver.By.id('link');
    this.frame1=webdriver.By.id('iframe');

    //this.checkBoxesLabel = webdriver.By.xpath(".//*[@id='main-panel']/div[2]/div/div[3]/div[1]/h3");
    this.checkBoxesLabel = webdriver.By.id("scrollable-div");
    this.noelement=webdriver.By.id('noid');
};


module.exports = HomePage; 