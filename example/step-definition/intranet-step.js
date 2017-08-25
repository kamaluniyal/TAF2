/*this file contain the actual mapping code w.r.to feature file. It will have actual code which will inturn iteract with 
library and page files to perform desired operation on the application. For sample ex see below*/

"use strict";
var webdriver = require('selenium-webdriver');
var assert = require('assert');
var config = require('config');
var Yadda = require('yadda');
var Home = require('../page/home-page.js');
var Home2 = require('../page/intranet-example-page.js');
var CPage = require('../page/client-page.js');
var funLib = require('../../lib/function-library.js');

const url = config.get('intranet.url');
var homePage,examplePage, clientPage, functionLibrary;
var logger = require('../log4js.js');
var log = logger.LOG;
module.exports = (function () {

    var dictionary = new Yadda.Dictionary()
        .define('LOCALE', /(fr|es|ie)/)
        .define('NUM', /(\d+)/);

    var library = new Yadda.localisation.English.library(dictionary)

        .given("User is on the Home Page", function () {
	       // log.info('Given User is on the Home Page');
            homePage = new Home(this.driver);
            functionLibrary = new funLib(this.driver);
            functionLibrary.fnOpenUrl(url);
            

        })
        .when("User clicks Adhesion Link", function () {
		   // log.info('When User clicks Adhesion Link');
            functionLibrary.fnClick(homePage.AdhesionLink);

        })
        .then("User verifies Adhesion client page and goes back", function () {
		   // log.info('Then User verifies Adhesion client page and goes back');
            clientPage = new CPage(this.driver)
            functionLibrary.fnVerifyElementExistenceWithText(clientPage.ClientHeader, 'Adhesion\nShow Debug Info');
            functionLibrary.fnGoBack();
        })

     .given("User is on TAF Example Page", function () {
	        //log.info('Given User is on the TAF Example Page');
            examplePage = new Home2(this.driver);
            functionLibrary = new funLib(this.driver);
            functionLibrary.fnOpenUrl(url);

        })

    .when("The hidden text is visible", function () {
	      //// log.info('Given User is on the TAF Example Page');
           functionLibrary.fnWaitTillElementVisible(examplePage.hiddenText,12000);
           functionLibrary.fnVerifyElementExistenceWithText(examplePage.hiddenText,"This text gets visible after 10 seconds of page load");
        })

    .then("User enter text in Text box", function () {
		   // log.info('When User uses send keys method on Text box');
            functionLibrary.fnClick(examplePage.textBox);
            functionLibrary.fnSendKeys(examplePage.textBox,"enter text here");
     })
    
      .then("User selects options from select menu", function () {
		   // log.info('When User selects Options from the select list');
            functionLibrary.fnClick(examplePage.selectlist);
            functionLibrary.fnSelectValueFromDropDown(examplePage.selectlist,"Options");           
    })


    .then("User select Mutual Funds and ETFs checkbox", function () {
		log.info('User select Mutual Funds and ETFs checkbox');
        functionLibrary.fnCheckCheckbox(examplePage.checkboxETFs);
        functionLibrary.fnCheckCheckbox(examplePage.checkboxMutualFunds);
        
     })
    
    .then("User uncheck ETFs checkbox", function () {
		log.info('User select Mutual Funds and ETFs checkbox');
        functionLibrary.fnUncheckCheckbox(examplePage.checkboxETFs);               
     })
  
    .then("User selects Options radio button", function () {
		   // log.info('User selects Options radio button');
            functionLibrary.fnSelectRadioButton(examplePage.radiobuttonOptions,"option3");
    })

    .then("User performs mouseover on hover text", function () {
		   // log.info('User performs mouseover on hover text');
            functionLibrary.fnMouseOver(examplePage.hoverElement);     
    })

    .then("User scrolls the page to bottom", function () {
		   // log.info('User scrolls the scrollable Div');
            functionLibrary.fnScrollPage("DOWN","500");
     })

    .then("User clicks on link to open new window and switch back to parent window", function () {
		   // log.info('User clicks on link to open new window');
           var windowHandle = this.driver.getWindowHandle();
           functionLibrary.fnClick(examplePage.linktoNewWindow);
           functionLibrary.fnSwitchToNewlyOpenedWindow();
           functionLibrary.fnClick(examplePage.textBox);
           functionLibrary.fnSendKeys(examplePage.textBox,"text in new window");           
           functionLibrary.fnSwitchToParentWindow(windowHandle);
           functionLibrary.fnClick(examplePage.textBox);
           functionLibrary.fnSendKeys(examplePage.textBox,"text in parent window");
           functionLibrary.fnSelectValueFromDropDown(examplePage.selectlist,"Mutual Funds");  
    })

    
    .then("User enters text in the text box inside iframe", function () {
		   // log.info('User enters text in the text box inside iframe');
           
        functionLibrary.fnSwitchToFrame(examplePage.frame1);
        functionLibrary.fnClick(examplePage.textBox);
        functionLibrary.fnSendKeys(examplePage.textBox,"enter text in text box inside frame");
                      
    })  

      .then("User switch to top frame and selects Mutual Funds", function () {
		   // log.info('User enters text in the text box inside iframe');           
        functionLibrary.fnSwitchToTopFrame();
        functionLibrary.fnSelectValueFromDropDown(examplePage.selectlist,"Mutual Funds");      
               
    }) 


    return library;
})();
