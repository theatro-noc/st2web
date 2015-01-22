'use strict';
angular.module('main')
.constant('st2Config', {

  hosts: [{
    name: 'Dev Env',
    url: '//172.168.50.50:9101'
  }, {
    name: 'st2_deploy',
    url: '//172.168.90.51:9101'
  }, {
    name: 'Stage',
    url: '//st2stage201:9101'
  }
  ]

});
