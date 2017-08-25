/* jslint node: true */
/* global before, afterEach, after, featureFile, scenarios, steps 
This is driver script which drive our automation execution 
*/
"use strict";
var Yadda = require('yadda');
Yadda.plugins.mocha.StepLevelPlugin.init();

var library = require('./step-definition/intranet-step.js');
var webdriver = require('selenium-webdriver');
var config = require('config');
var fs = require('fs');
const gBrowser = config.get('browser');
var logger = require('./log4js.js'); //This is required to set the var to log configuration file where log configuration has been defined.
var log = logger.LOG; //This is how you can get hold of LOG static variable which you can use to log details.
var driver;
var features = new Yadda.FeatureFileSearch('example/features');

features.each(function(file) {
    featureFile(file, function(feature) {
        before(function(done) {
            log.info('Start of the automation test Execution');
       
              driver = new webdriver.Builder().usingServer().withCapabilities({'browserName': gBrowser}).build();
            
            driver.manage().timeouts().implicitlyWait(10000);
            done();
        });

        scenarios(feature.scenarios, function(scenario) {
            steps(scenario.steps, function(step, done) {
                executeInFlow(function() {
                    new Yadda.Yadda(library, { driver: driver }).yadda(step);
                }, done);
            });
        });

        afterEach(function() {
            takeScreenshotOnFailure(this.currentTest);
        });

        after(function(done) {
            log.info('End of the automation test Execution');
            driver.quit().then(done);
        });
    });
});

function executeInFlow(fn,done) {
    webdriver.promise.controlFlow().execute(fn).then(function() {
        done();
    }, done);
}

function takeScreenshotOnFailure(test) {
    if (test.status != 'passed') {
        var path = 'screenshots/' + test.title.replace(/\W+/g, '_').toLowerCase() + '.png';
        driver.takeScreenshot().then(function(data) {
            fs.writeFileSync(path, data, 'base64');
        });
    }
}
