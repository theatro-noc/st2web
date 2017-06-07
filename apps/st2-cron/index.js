'use strict';

var mod = module.exports = angular.module('main.apps.st2Cron', [
]);

var controller = require('./cron.controller.js');
var config = require('./cron.config.js');
var run = require('./cron.run.js');

mod
  .config(config)
  .controller(controller.name, controller)
  .run(run)
  ;
