var webdriver = require('selenium-webdriver');
// wrong path reference for logger
var logger = require('../example/log4js.js'); //This is required to set the var to log configuration file where log configuration has been defined.
var log = logger.LOG; //This is how you can get hold of LOG static variable which you can use to log details.

FunctionLibrary = function FunctionLibrary(driver) {
    this.driver = driver;
};


/*
 * # Function Name: fnOpenUrl()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will open the url in to browser.
 * 
 * # Input Parameters: String : Url of the application  
 */


FunctionLibrary.prototype.fnOpenUrl = function (url) {
    this.driver.get(url);
    return webdriver.promise.fulfilled(true);
};

/*
 * # Function Name: fnGenerateRandomAlphaNumericString()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will generate the random alphanumeric string of given size.
 * 
 * # Input Parameters: String : Int - Length of the required string
 */

FunctionLibrary.prototype.fnGenerateRandomAlphaNumericString = function (len) {
    var text = "";
    var alpha = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var n = alpha.length;

    for (var i = 0; i < len; i++) {
        text += alpha.charAt(Math.floor(Math.random() * alpha.length));
    }
    return text;
};


/*
 * # Function Name: fnUncheckCheckbox()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will unselect the checkbox.
 * 
 * # Input Parameters: Webelement : Element to be unchecked.
 */


FunctionLibrary.prototype.fnUncheckCheckbox = function (element) {
    var d = webdriver.promise.defer();
    var elem = this.driver.findElement(element);

    elem.isSelected().then(function (boolValue) {
        if (boolValue) {
            elem.click().then(function () {
                elem.isSelected().then(function (boolCheck) {
                    if (boolCheck) {
                        log.info("Fail - Element has not been unchecked.");
                        d.fulfill(false);
                    } else {
                        log.info("Pass - Element has been unchecked successfully.");
                        d.fulfill(false);
                    }
                }, function (e) {
                    d.fulfill(false);
                    log.error(e.message)
                });
            }, function (e) {
                d.fulfill(false);
                log.error(e.message)
            });
        }
        else {
            log.info("Info-Element is already unchecked")
            d.fulfill(true);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnCheckCheckbox()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will select the checkbox.
 * 
 * # Input Parameters: Webelement : Element to be checked
 */

FunctionLibrary.prototype.fnCheckCheckbox = function (element) {
    var d = webdriver.promise.defer();
    var elem = this.driver.findElement(element);

    elem.isSelected().then(function (boolValue) {
        if (!boolValue) {
            elem.click().then(function () {
                elem.isSelected().then(function (boolCheck) {
                    if (boolCheck) {
                        log.info("Pass - Element has been checked successfully.")
                        d.fulfill(true);
                    } else {
                        log.info("Fail - Element has not been checked.")
                        d.fulfill(false);
                    }
                }, function (e) {
                    d.fulfill(false);
                    log.error(e.message)
                });
            }, function (e) {
                d.fulfill(false);
                log.error(e.message)
            });
        }
        else {
            log.info("Info-Element is already checked")
            d.fulfill(true);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnSwitchToParentWindow()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will switch to the main window.
 * 
 * # Input Parameters: String : Handler string of main window.
 */

FunctionLibrary.prototype.fnSwitchToParentWindow = function (parentWindow) {

    var d = webdriver.promise.defer();
    this.driver.switchTo().window(parentWindow).then(function () {
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnScrollPage()
 * 
 * # Author: Raj MOhan Singh
 * 
 * # Description: This function will scroll up /down the page by given pixels
 * 
 * # Input Parameters: String : Scroll type either Up or Down ,String : pixels
 */

FunctionLibrary.prototype.fnScrollPage = function (scrollCase, pixelToScroll) {
    var d = webdriver.promise.defer();
    log.info("In ScrollPage");
    switch (scrollCase.toUpperCase()) {
        case "DOWN":
            log.info("In Down")
            this.driver.executeScript("scrollBy(0," + pixelToScroll + ");");
            break;
        case "UP":
            log.info("In Up")
            this.driver.executeScript("scrollBy(0," + -pixelToScroll + ");");
            break;
    }
    d.fulfill(true);
    return d.promise;
};

/*
 * # Function Name: fnSelectRadioButton()
 * 
 * # Author: Raj MOhan Singh
 * 
 * # Description: This function will select the radiobutton.
 * 
 * # Input Parameters: WebElementList : raiogroup element ,String : Value of radiobutton to be selected.
 */

FunctionLibrary.prototype.fnSelectRadioButton = function (elementList, optionVal) {

    var d = webdriver.promise.defer();

    this.driver.findElements(elementList).then(function (radiosList) {

        for (var i = 0; i < radiosList.length; i++) {
            (function (index) {
                radiosList[index].getAttribute("value").then(function (val) {

                    if (val == optionVal) {
                        radiosList[index].click();
                        log.info("succefully selected the radio button")
                        d.fulfill(true);
                    }
                })
            })(i);

        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });

    return d.promise;
};


/*
 * # Function Name: fnVerifyDateFormatOfMMDDYYYY()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will verify the whether given date is in MM/DD/YYYY format or not.
 * 
 * # Input Parameters: WebElement : date element
 */

FunctionLibrary.prototype.fnVerifyDateFormatOfMMDDYYYY = function (element) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).getText().then(function (text) {
        // wrong logic . This will match 00 in month , 29 in feb , 0000 in year
        var regex = /^(0[0-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/([0-9][0-9][0-9][0-9])$/;

        if (regex.test(text)) {
            d.fulfill(true);
            log.info("Pass-Date format - MMDDYY has been verified successfully");
        } else {
            d.fulfill(false);
            log.error("Fail-Date format - MMDDYY has not been verified.");
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message);
    });
    return d.promise;
};

/*
 * # Function Name: fnVerifyDropdownOptions()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify all the options present in a dropdown.
 * 
 * # Input Parameters: WebElement : Date element <Date element>??
 */

FunctionLibrary.prototype.fnVerifyDropdownOptions = function (element, str) {
    var d = webdriver.promise.defer();
    var expectedText = str.split("@");

    this.driver.findElement(element).then(function (mySelect) {
        mySelect.findElements(webdriver.By.tagName("option")).then(function (option) {

            for (var j = 0; j < option.length; j++) {
                (function (index) {
                    option[index].getText().then(function (val) {
                        if (val === expectedText[index]) {
                            d.fulfill(true);
                            log.info("Pass-" + val + " option exists in the Dropdown");
                        } else {
                            d.fulfill(false);
                            log.error("Fail-" + val + " option doesnot exist in the Dropdown");
                        }
                    });
                })(j);
            }
        }, function (e) {
            d.fulfill(false);
            log.error(e.message);
        }), function (e) {
            d.fulfill(false);
            log.error(e.message);
        }
    });
    return d.promise;
};

/*
 * # Function Name: fnGetDataOfWebtable()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will retrive all the data of the webtable.
 * 
 * # Input Parameters: WebElement : webtable element
 */


FunctionLibrary.prototype.fnGetDataOfWebtable = function (element) {
    var values = [];
    var d = webdriver.promise.defer();

    this.driver.findElement(element).then(function (ele) {

        ele.findElements(webdriver.By.tagName("tr")).then(function (rows) {
            for (var rnum = 0; rnum < rows.length; rnum++) {
                (function (index) {
                    rows[index].findElements(webdriver.By.tagName("td")).then(function (columns) {
                        for (var cnum = 0; cnum < columns.length; cnum++) {
                            (function (loop) {
                                columns[loop].getText().then(function (val) {
                                    values.push(val);
                                })
                            })(cnum);
                        }
                        d.fulfill(true);
                    }, function (e) {
                        d.fulfill(false);
                        log.error(e.message)
                    });
                })(rnum);
            }
            d.fulfill(values);
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnGetListOfRowElementsForColumnFromWebtable()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will retrieve the elements from all rows in a particular column.
 * 
 * # Input Parameters: WebElement : webtable element,Int : Column Index
 */

FunctionLibrary.prototype.fnGetListOfRowElementsForColumnFromWebtable = function (element, colIndex) {
    var values = [];
    var d = webdriver.promise.defer();

    this.driver.findElement(element).then(function (ele) {

        ele.findElements(webdriver.By.tagName("tr")).then(function (rows) {
            for (var rnum = 0; rnum < rows.length; rnum++) {
                (function (index) {
                    rows[index].findElements(webdriver.By.tagName("td")).then(function (columns) {

                        columns[colIndex - 1].getText().then(function (val) {
                            values.push(val);
                        })
                    })
                })(rnum);
            }
            d.fulfill(values);
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });;
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnGetListOfColumnElementsForRowFromWebtable()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will retrieve the elements from all columns in a particular row.
 * 
 * # Input Parameters: WebElement : webtable element,Int : Row Index
 */

FunctionLibrary.prototype.fnGetListOfColumnElementsForRowFromWebtable = function (element, rowIndex) {
    var values = [];
    var d = webdriver.promise.defer();

    this.driver.findElement(element).then(function (ele) {

        ele.findElements(webdriver.By.tagName("tr")).then(function (rows) {

            rows[rowIndex - 1].findElements(webdriver.By.tagName("td")).then(function (columns) {

                for (var cnum = 0; cnum < columns.length; cnum++) {
                    (function (index) {

                        columns[index].getText().then(function (val) {
                            values.push(val);
                        })
                    })(cnum);
                }
                d.fulfill(values);
            }, function (e) {
                d.fulfill(false);
                log.error(e.message)
            });;
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnGetElementText()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will retrieve the text of the element.
 * 
 * # Input Parameters: WebElement : element
 */

FunctionLibrary.prototype.fnGetElementText = function (element) {

    var d = webdriver.promise.defer();
    this.driver.findElement(element).getText().then(function (text) {
        d.fulfill(text);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};


/*
 * # Function Name: fnSelectValueFromDropDown()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will select the value from the dropdown.
 * 
 * # Input Parameters: WebElement : element ,String: option value or text to be selected
 */

FunctionLibrary.prototype.fnSelectValueFromDropDown = function (element, text) {

    var d = webdriver.promise.defer();
    this.driver.findElement(element).then(function (mySelect) {
        mySelect.sendKeys(text).then(function () {
            d.fulfill(true);
        }, function (e) {
            d.fulfill(false);
            log.error(e.message);
        });
    });
    return d.promise;
};


/*
 * # Function Name: fnVerifyElementExistenceWithText()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify the element existence with its text.
 * 
 * # Input Parameters: WebElement : element ,String: element text
 */

FunctionLibrary.prototype.fnVerifyElementExistenceWithText = function (element, strText) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).getText().then(function (text) {
        if (text === strText) {           
            log.info("Element with text-" + text + " has been verified successfully.");
            d.fulfill(true);
        }
        else {
            log.info("Element with text-" + text + " has not been verified.");
            d.fulfill(false);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};


/*
 * # Function Name: fnVerifyElementExistenceWithPartialText()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will verify the element existence with its partial text.
 * 
 * # Input Parameters: WebElement : element ,String: element partial text
 */

FunctionLibrary.prototype.fnVerifyElementExistenceWithPartialText = function (element, strText) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).getText().then(function (text) {
        if (text.includes(strText)) {
            log.info("Element with text-" + text + " has been verified successfully.");
            d.fulfill(true);
        }
        else {
            log.error("Element with text-" + text + " has not been verified.");
            d.fulfill(false);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};


/*
 * # Function Name: fnVerifyElementExistence()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify the element existence.
 * 
 * # Input Parameters: WebElement : element ,String: element text
 */

FunctionLibrary.prototype.fnVerifyElementExistence = function (element, desc) {

    var d = webdriver.promise.defer();
    this.driver.findElement(element).isDisplayed().then(function (status) {
        if (status) {
            log.info("Pass - " + desc + "-exists on the page");
            d.fulfill(true);

        } else {
            log.error("Fail - " + desc + "- does not exist on the page");
            d.fulfill(false);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnVerifyStateOfWebelement()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify the state of the element .
 * 
 * # Input Parameters: WebElement : element ,String: state of element to be verified.
 */


FunctionLibrary.prototype.fnVerifyStateOfWebelement = function (element, state) {

    var d = webdriver.promise.defer();
    if (state === "Enable") {
        this.driver.findElement(element).getAttribute("class").then(function (status) {

            if (status.includes("disabled")) {
                log.error("Fail", "Element is not enabled.");
                d.fulfill(false);
            } else {
                log.info("Pass - Element is enabled");
                d.fulfill(true);
            }
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });
    }
    else if (state === "Disable") {
        this.driver.findElement(element).getAttribute("class").then(function (status) {

            if (status.includes("disabled")) {

                log.info("Pass", "Element is disabled.");
                d.fulfill(true);
            } else {
                log.error("Fail - Element is not disabled");
                d.fulfill(false);
            }
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });
    }
    return d.promise;
};

/*
 * # Function Name: fnClick()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will click on the element .
 * 
 * # Input Parameters: WebElement : element .
 */

FunctionLibrary.prototype.fnClick = function (element) {

    var d = webdriver.promise.defer();
    this.driver.findElement(element).click().then(function () {
        log.info("Element has been clicked successfully.")
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};


/*
 * # Function Name: fnSwitchToNewlyOpenedWindow()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will switch to the newly opened window.
 * 
 * # Input Parameters: NA
 */

FunctionLibrary.prototype.fnSwitchToNewlyOpenedWindow = function () {
    var d = webdriver.promise.defer();
    var driver = this.driver;
    driver.getAllWindowHandles().then(function (handles) {
        for (var i = 0; i < handles.length; i++) {
            driver.switchTo().window(handles[i]);
        }
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnSwitchToTopFrame()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will switch back to the top frame.
 * 
 * # Input Parameters: NA
 */

FunctionLibrary.prototype.fnSwitchToTopFrame = function () {
    var d = webdriver.promise.defer();
    this.driver.switchTo().defaultContent().then(function () {
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnSwitchToFrame()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will switch to the given frame.
 * 
 * # Input Parameters: Webelement : Frame element
 */

FunctionLibrary.prototype.fnSwitchToFrame = function (frame) {
    var d = webdriver.promise.defer();
    this.driver.switchTo().frame(this.driver.findElement(frame)).then(function () {
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnGetHeadersOfWebtable()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will retrieve the headers of the webtable.
 * 
 * # Input Parameters: WebElement : element , Int: Row index
 */

FunctionLibrary.prototype.fnGetHeadersOfWebtable = function (element, rowIndex) {
    var colValues = [];
    var d = webdriver.promise.defer();

    this.driver.findElement(element).then(function (ele) {
        ele.findElements(webdriver.By.tagName("tr")).then(function (rows) {

            rows[rowIndex - 1].findElements(webdriver.By.tagName("th")).then(function (column) {
                for (var cnum = 0; cnum < column.length; cnum++) {

                    (function (index) {
                        column[index].getText().then(function (val) {
                            //colValues[index] = val;
                            colValues.push(val);
                        });
                    })(cnum);
                }

                d.fulfill(colValues);
            }, function (e) {
                d.fulfill(false);
                log.error(e.message)
            });
        }, function (e) {
            d.fulfill(false);
            log.error(e.message)
        });

    });

    return d.promise;
};


/*
 * # Function Name: fnVerifyDataOfWebtable()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify the data of the webtable..
 * 
 * # Input Parameters: WebElement : WebTable , String : expected data of the table separated by @.
 */


FunctionLibrary.prototype.fnVerifyDataOfWebtable = function (element, str) {
    var d = webdriver.promise.defer();
    this.fnGetDataOfWebtable(element).then(function (actualText) {
        var expectedText = str.split("@");
        for (var j = 0; j < actualText.length(); j++) {
            if (actualText[j] === expectedText[j]) {
                d.fulfill(true);
                log.info("Pass-" + actualText[j] + " has been verified successfully");
            } else {
                d.fulfill(false);
                log.error("Fail-" + actualText[j] + " has not been verified");
            }
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message);
    });
    return d.promise;
};


/*
 * # Function Name: fnVerifyElementColor()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will verify the color of the element.
 * 
 * # Input Parameters: WebElement : element , String : expected RGB value of the color.
 */

FunctionLibrary.prototype.fnVerifyElementColor = function (element, colorCode) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).getCssValue("color").then(function (rgb) {
        if (rgb === colorCode) {
            d.fulfill(true);
            log.info("Pass- Actual color is same as expected color");
        } else {
            d.fulfill(false);
            log.error("Fail- Actual color is not same as expected color");
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message);
    });
    return d.promise;
};

/*
 * # Function Name: fnMouseOver()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will perform the mouse over operation on the element.
 * 
 * # Input Parameters: WebElement : element 
 */

FunctionLibrary.prototype.fnMouseOver = function (element) {
    var d = webdriver.promise.defer();
    log.info("In mouseover");
    new webdriver.ActionSequence(this.driver).
        mouseMove(this.driver.findElement(element)).
        perform();
    d.fulfill(true);
    return d.promise;
};

/*
 * # Function Name: fnDragAndDrop()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function willperfornm the drag & drop operation on the application.
 * 
 * # Input Parameters: WebElement : source element , WebElement :  destimation element
 */


FunctionLibrary.prototype.fnDragAndDrop = function (srcElement, destElement) {
    var d = webdriver.promise.defer();
    log.info("In DragAndDropMouseOver");
    new webdriver.ActionSequence(this.driver).
        dragAndDrop(this.driver.findElement(srcElement), this.driver.findElement(destElement)).
        perform();
    d.fulfill(true);
    return d.promise;
};

/*
 * # Function Name: fnWaitTillElementVisible()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will wait till the element gets visible.
 * 
 * # Input Parameters: WebElement : element ,int : Time (Miliiseconds)
 */


FunctionLibrary.prototype.fnWaitTillElementVisible = function (element, iTimeOut) {
    var d = webdriver.promise.defer();
    var until = webdriver.until;
    var timeout = iTimeOut || mochaTimeoutMS;
    this.driver.wait(until.elementIsVisible(this.driver.findElement(element)), timeout).then(function () {
        log.info("element found on screen");
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error("Error in fnWaitTillElementVisible and error is " + e.message);
    });
    return d.promise;
};

/*
 * # Function Name: fnSendKeys()
 * 
 * # Author: Sunny Jain
 * 
 * # Description: This function will enter the value in the textbox.
 * 
 * # Input Parameters: WebElement : element ,String : value to be entered.
 */

FunctionLibrary.prototype.fnSendKeys = function (element, text) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).sendKeys(text).then(function () {
        log.info(text + " has been entered successfully in the element.")
        d.fulfill(true);
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnVerificationOfElementAttributeValue()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will verify the value of the given attribute of the element.
 * 
 * # Input Parameters: WebElement : element ,String : attribute name ,String: attribute value. 
 */

FunctionLibrary.prototype.fnVerificationOfElementAttributeValue = function (element, attribute, strText) {
    var d = webdriver.promise.defer();
    this.driver.findElement(element).getAttribute(attribute).then(function (text) {
        if (text === strText) {
            log.info("Value of Element's attribute " + attribute + " has been verified successfully.");
            d.fulfill(true);
        }
        else {
            log.error("Element with attribute " + attribute + "- value has not been verified.");
            d.fulfill(false);
        }
    }, function (e) {
        d.fulfill(false);
        log.error(e.message)
    });
    return d.promise;
};

/*
 * # Function Name: fnGoBack()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will perform the back opertaion on webpage.
 * 
 * # Input Parameters: NA
 */

FunctionLibrary.prototype.fnGoBack = function() {
 
 return  this.driver.navigate().back();
}



/*
 * # Function Name: fnVerifyHeadersOfwebtable()
 * 
 * # Author: Raj Mohan Singh
 * 
 * # Description: This function will verify the headers of the webtable.
 * 
 * # Input Parameters: WebElement : Webtable element ,Int : Row Index ,String: Headers(Expected) of webtable separated by@.
 */

FunctionLibrary.prototype.fnVerifyHeadersOfwebtable = function (element, rowIndex, str) {
    var d = webdriver.promise.defer();
    this.fnGetHeadersOfWebtable(element, rowIndex).then(function (actualText) {
        var expectedText = str.split("@");
        for (j = 0; j < actualText.length; j++) {
            if (actualText[j] === expectedText[j]) {
                d.fulfill(true);
                log.info("Pass-" + actualText[j] + " column is present in the table");
            } else {
                d.fulfill(false);
                log.error("Fail-" + actualText[j] + " column is not present in the table");
            }
        }
    }, function (e) {
        d.fulfill(false);
        log.info(e.message);
    });
    return d.promise;
};


module.exports = FunctionLibrary; 