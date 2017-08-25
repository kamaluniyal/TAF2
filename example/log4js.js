'use strict';

const log4js = require('log4js');
var config = require('config');
const projName = config.get('projectName');
// log the cheese logger messages to a file, and the console ones as well.
log4js.configure({
  appenders: {
    projectLogs: { type: 'file', filename: './log/'+projName+'.log',maxLogSize:10 * 1024 * 1024 ,backups: 10},
    console: { type: 'console' }
  },
  categories: {
    project: { appenders: ['projectLogs'], level: 'ALL' },
    another: { appenders: ['console'], level: 'ALL' },
    default: { appenders: ['console', 'projectLogs'], level: 'ALL' }
  }
});
const logger = log4js.getLogger();
Object.defineProperty(exports, "LOG", {
                        value:logger,
});