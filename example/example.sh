#!/bin/bash

# which chromedriver > /dev/null
# if [ $? -ne 0 ]; then
#     echo "Could not find chromedriver"
#     exit 1;
# fi

node_modules/.bin/mocha --reporter mochawesome example/test.js --timeout 50000