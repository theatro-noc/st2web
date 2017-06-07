'use strict';

var template = require('./template.html');

module.exports = function st2CronConfig($stateProvider) {
  const baseState = {
    title: 'Timed Jobs',
  };

  $stateProvider
    .state('cron', Object.assign({}, baseState, {
      abstract: true,
      url: '/cron',
      icon: 'icon-play2',
      controller: 'st2CronCtrl',
      templateUrl: template,
      position: 4
    }))
    .state('cron.list', Object.assign({}, baseState, {
      url: ''
    }))
    .state('cron.new', Object.assign({}, baseState, {
      url: '/new'
    }))
    .state('cron.general', Object.assign({}, baseState, {
      url: '/{ref:[\\w.-]+}/general?edit'
    }))
    .state('cron.code', Object.assign({}, baseState, {
      url: '/{ref:[\\w.-]+}/code?edit'
    }));
};
