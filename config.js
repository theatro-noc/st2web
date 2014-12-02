'use strict';
angular.module('main')
  .constant('st2Config', {

    hosts: [{
      name: 'st2express',
      url: 'http://172.168.90.50:9101'
    },
    {
      name: 'Dev Env',
      url: '//172.168.50.50:9101'
    }]

  });
